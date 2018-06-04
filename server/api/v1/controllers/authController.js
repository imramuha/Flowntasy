const passport = require('passport');

const User = require('../models/user');
const errorHandler = require('../utilities/errorHandler');
const tokenUtils = require('../utilities/token');
const config = require('../../../config/config');


exports.user_auth_local_post = function(req, res, next) {
  passport.authenticate('local', config.jwtSession, function(err, user, info) {
    if (err) { return next(err); }
    // console.log(user);
    if (!user) { 
      return res.status(401).json({
        'message': 'Username or password incorrect'
      }); 
  }

    req.auth = {
      id: user.id
    };
    // token~
    const token = tokenUtils.createToken(req.auth);
console.log(user._role);
    function getMessageStatus () {
    // checks role -> specific message
    if(user._role == '5b0621fa6044ae5350afd7fb') {
      return 'USER: '
    } else if (user._role == '5b0621fa6044ae5350afd7fc') {
      return 'ADMIN: '
    } else {
      return 'User: ';
    }
  }
  const messageStatus = getMessageStatus();
  //console.log(messageStatus);

    // send data based on user status. -> 5b0622a10f5d83691073a511 = active - 5b0622a10f5d83691073a512 deactive.
      if (user._status == '5b0622a10f5d83691073a511') {
        console.log(user)
        console.log(user._id)
        console.log(user.username)
        res.status(200).json({
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            _role: user._role,
            _status: user._status,
          },
          token: `${token}`,
          strategy: 'local',
          message: messageStatus,
        });
       //  console.log(user._status);
      } else if (user._status == '5b0622a10f5d83691073a512') {
        res.status(200).json({
          user: {
            email: user.email,
          },
          message: 'Your account has been disabled, please get in touch.',
          status: 'BANNED'
        });
      }
      
  })(req, res, next);
}

exports.user_auth_facebook_post = function(req, res, next) {
  passport.authenticate('facebook-token', config.jwtSession, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      return errorHandler.handleAPIError(404, `Email or password incorrect.`, next)
    }
    req.auth = {
      id: user.id
    };
    const token = tokenUtils.createToken(req.auth);
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token: `${token}`,
      strategy: 'facebook-token',
      Message: 'Your login was succesful!'
    });
  })(req, res, next);
}
