const passport = require('passport');

const User = require('../models/user');
const errorHandler = require('../utilities/errorHandler');
const config = require('../../../config/config');

exports.user_create_post = function(req, res, next) {

  if(!req.body.email || !req.body.username || !req.body.localProvider.password) {
    return errorHandler.handleAPIError(400, `Everything must be filled in`, next);
  }
    
  // covnerts to lowercase 
  req.body.email = req.body.email.toLowerCase();
  req.body.username = req.body.username.toLowerCase();

  // checks wheter email/username already exists or not
  User.find({email: req.body.email}, (err, previousUsers) => {
    if (err) {
      return errorHandler.handleAPIError(400, `Error: server error.`, next);
    } else if (previousUsers.length > 0) {
      return errorHandler.handleAPIError(404, `Email already exists.`, next);
    }
  })

  User.find({username: req.body.username}, (err, previousUsers) => {
    if (err) {
      return errorHandler.handleAPIError(400, `Error: server error.`, next);
    } else if (previousUsers.length > 0) {
      return errorHandler.handleAPIError(404, `Username already exists.`, next);
    }
  })

    // Save the new user
    const user = new User(req.body);
    user.save((err, post) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
}