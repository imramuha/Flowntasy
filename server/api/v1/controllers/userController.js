const passport = require('passport');


/* 
MODELS
*/
const Community = require('../models/community');
const Post = require('../models/post');
const User = require('../models/user');
const Role = require('../models/role');
const Status = require('../models/status');

const errorHandler = require('../utilities/errorHandler');
const tokenUtils = require('../utilities/token');
const config = require('../../../config/config');

/*
Get all USERS
*/
exports.get_all_users = function(req, res, next) {
  const query = User.find().populate('_status').populate('_role').populate('communities');
  console.log("test")
  query.sort( { created_at: -1 } );
  console.log("test2")
  query.exec((err, users) => {
    if (err)  return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving Users', next);
    if (!users) {
      return errorHandler.handleAPIError(404, `Users not found`, next);
    }
    console.log(users);
    return res.json(users);
}
  )
}


/*
Soft-delete a user
*/
exports.user_softdelete_patch = function(req, res, next) {
  const id = req.params.userId;

  User.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(user => {
      if(!user) {
        return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);
      }
      res.send(user);
    }).catch(err => {
      console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `user not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete User with id: ${id}`, next);
    });
}

/*
Soft-undelete a user
*/
exports.user_softundelete_patch = function(req, res, next) {
  const id = req.params.userId;

  User.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(user => {
      if(!user) {
        return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);
      }
      res.send(user);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete User with id: ${id}`, next);
    });
}

/*
Delete a User
*/
exports.user_delete = function(req, res, next) {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .then(user => {
      if(!user) {
        return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `User width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete User with id: ${id}`, next);
    });
}