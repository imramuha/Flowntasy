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
exports.get_all_roles = function(req, res, next) {
  const query = Role.find().populate('users');
  query.exec((err, roles) => {
    if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving posts', next);
    if (!roles) {
      return errorHandler.handleAPIError(404, `Posts not found`, next);
    }
    console.log(res.json(roles));
    return res.json(roles);
}
  )
}