const async = require('async');

const Community = require('../models/community');
const Post = require('../models/post');
const User = require('../models/user');
const Role = require('../models/role');
const Status = require('../models/status');
const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

exports.get_categories = function(req, res, next) {
  const query = Category.find()
  query.sort( { created_at: -1 } );
  query.exec((err, categories) => {
    if (err) return next(err);
    if (categories == null) {
      return errorHandler.handleAPIError(`Categories not found!`, next);
    }
    return res.json(categories);
  });
}

exports.get_category = function(req, res, next) {
  const id = req.params.id;
  const query = Category.findById(id).populate('posts');
  query.exec((err, category) => {
    if (err) return next(err);
    if (category == null) {
      return errorHandler.handleAPIError(`Category not found with id: ${id}`, next);
    }
    return res.json(category);
  });
}


/*
Soft-delete a Category
*/
exports.category_softdelete_patch = function(req, res, next) {
  const id = req.params.categoryId;

  Category.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.send(category);
    }).catch(err => {
      console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete Category with id: ${id}`, next);
    });
}

/*
Soft-undelete a category
*/
exports.category_softundelete_patch = function(req, res, next) {
  const id = req.params.categoryId;

  Category.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.send(category);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete Category with id: ${id}`, next);
    });
}

/*
* Delete a Category
*/
exports.category_delete = function(req, res, next) {
  const id = req.params.categoryId;
  Category.findByIdAndRemove(id)
    .then(category => {
      if(!category) {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `Category width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `Category not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete Category with id: ${id}`, next);
    });
}