const async = require('async');

const Community = require('../models/community');
const Post = require('../models/post');
const User = require('../models/user');
const Role = require('../models/role');
const Status = require('../models/status');
const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

exports.get_communities = function(req, res, next) {
  const query = Community.find().populate('_status').populate('__created_by').populate('_category');
  query.sort( { created_at: -1 } );
  query.exec((err, communities) => {
    if (err) return next(err);
    if (communities == null) {
      return errorHandler.handleAPIError(`Community not found!`, next);
    }
    //console.log(res.json(communities));
    return res.json(communities);
  });
}
/*
exports.get_blog = function(req, res, next) {
  const id = req.params.id;
  const query = Blog.findById(id).populate('posts');
  query.exec((err, blog) => {
    if (err) return next(err);
    if (blog == null) {
      return errorHandler.handleAPIError(`Community not found with id: ${id}`, next);
    }
    return res.json(blog);
  });
}
*/


/*
*  Create a Community
*/
exports.community_create_get = function(req, res, next) {
  async.parallel({
    categories: function(callback) {
      Category.find(callback).sort( { created_at: -1} );
    },
  }, function(err, results) {
    if (err) { return next(err); }
    res.json( { title: 'Create Community', categories: results.categories });
  });
}

exports.community_create_post = function(req, res, next) {
  console.log(req.body);
  console.log(req.body.categories)
  if(!req.body || !req.body.community || !req.body.description) {
    return errorHandler.handleAPIError(400, 'Category must have a title and description, next');
  }

  const community = new Community(req.body);
  community.save((err, community) => {
    if (err) return errorHandler.handleAPIError(500, `Could not save the new community`, next);
    res.status(201).json(community);
  });
}


/*
Soft-delete a Community
*/
exports.community_softdelete_patch = function(req, res, next) {
  const id = req.params.communityId;

  Community.findByIdAndUpdate(id, {
    deleted_at: Date.now()
  }, {new: true})
    .then(community => {
      if(!community) {
        return errorHandler.handleAPIError(404, `Community not found with id: ${id}`, next);
      }
      res.send(community);
    }).catch(err => {
      console.log(err);
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Community not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-delete Community with id: ${id}`, next);
    });
}

/*
Soft-undelete a Community
*/
exports.community_softundelete_patch = function(req, res, next) {
  const id = req.params.communityId;

  Community.findByIdAndUpdate(id, {
    deleted_at: null
  }, {new: true})
    .then(community => {
      if(!community) {
        return errorHandler.handleAPIError(404, `Community not found with id: ${id}`, next);
      }
      res.send(community);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return errorHandler.handleAPIError(404, `Community not found with id: ${id}`, next);            
      }
      return errorHandler.handleAPIError(500, `Could not soft-undelete Community with id: ${id}`, next);
    });
}

/*
* Delete a Community
*/
exports.community_delete = function(req, res, next) {
  const id = req.params.communityId;
  Community.findByIdAndRemove(id)
    .then(community => {
      if(!community) {
        return errorHandler.handleAPIError(404, `Community not found with id: ${id}`, next);
      }
      res.status(200).json({action: 'DELETE', message: `Community width id: ${id} deleted successfully!`});
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return errorHandler.handleAPIError(404, `Community not found with id: ${id}`, next);               
      }
      return errorHandler.handleAPIError(500, `Could not delete Community with id: ${id}`, next);
    });
}

