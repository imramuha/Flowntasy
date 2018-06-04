console.log('This script populates some test posts to your database. Specified database as argument - e.g.: seeder mongodb://your_username:your_password@your_dabase_url');

/*
Cool programe
*/

/*
Libraries
*/
const async = require('async');
const mongoose = require('mongoose');
const faker = require('faker');

/*
Models
*/
const Community = require('../models/community');
const Category = require('../models/category');
const Post = require('../models/post');
const User = require('../models/user');
const Role = require('../models/role');
const Status = require('../models/status');


// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}

/*
Faker
*/
faker.local = 'nl';

/*
Mongoose
*/
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
Variables
*/
let communities = [];
let categories = [];
let posts = [];
let users = [];
let roles = [];
let statuses = [];

//ROLES
function roleCreate(roleName, cb){
  const roleDetail = {role: roleName};
  const role = new Role(roleDetail);

  role.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Role: ' + role);
    roles.push(role);
    cb(null, role);
  });
};

function createRoles(cb) {
  async.parallel([
    function(callback) {
      roleCreate("User", callback);
    },
    function(callback) {
      roleCreate("Admin", callback);
    },
  ],
  cb);
}

//STATUS
function statusCreate(statusName, cb){
  const statusDetail = {status: statusName};
  const status = new Status(statusDetail);

  status.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New status: ' + status);
    statuses.push(status);
    cb(null, status);
  });
};

function createStatus(cb) {
  async.parallel([
    function(callback) {
      statusCreate("Active", callback);
    },
    function(callback) {
      statusCreate("Deactive", callback);
    },
  ],
  cb);
}



//USERS
function userCreate(email, password, username, cb){
  const userDetail = { email: email, username: username, localProvider: {password: password}};
  const user = new User(userDetail);

  user.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  });
};

function createUsers(cb) {
  async.parallel([
    function(callback) {
      userCreate("test_test@yahoo.de", "6316156", "Imosh", callback);
    },
    function(callback) {
      userCreate("im_1996@yahoo.de", "507233", "Myugi",  callback);
    },
    function(callback) {
      userCreate("im_1988@yahoo.de", "6633553", "Asiryu", callback);
    },
  ],
  cb);
}

//COMMUNITY
function communityCreate(community, description, categories, users, cb) {
  const communityDetail = { community: community, description: description, categories: categories, users: users };
  const communityWhole = new Community(communityDetail);

  communityWhole.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Community: ' + communityWhole);
    communities.push(communityWhole);
    cb(null, communityWhole);
  });
}

function createCommunities(cb) {
  async.parallel([
    function(callback) {
      communityCreate(faker.lorem.sentence(), faker.lorem.paragraph(), getRandomCategory(), getRandomPosts(), callback);
    },
  ],
  cb);
}

function categoryCreate(categoryName, cb) {
  const categoryDetail = { category: categoryName };
  const category = new Category(categoryDetail);

  category.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.parallel([
    function(callback) {
      categoryCreate(faker.lorem.word(), callback);
    },
    function(callback) {
      categoryCreate(faker.lorem.word(), callback);
    },
    function(callback) {
      categoryCreate(faker.lorem.word(), callback);
    },
    function(callback) {
      categoryCreate(faker.lorem.word(), callback);
    },
  ],
  cb);
}

function postCreate(title, description, body, thumbnailUrl, categoryId, cb) {
  const postDetail = { title: title, description: description, body: body, thumbnailUrl: thumbnailUrl, _category: categoryId };
  const post = new Post(postDetail);

  post.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Post: ' + post);
    posts.push(post)
    cb(null, post)
  });
}

function createPosts(cb) {
  async.parallel([
    function(callback) {
      postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
    },
    function(callback) {
      postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
    },
    function(callback) {
      postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
    },
    function(callback) {
      postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
    },
    function(callback) {
      postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
    },
    function(callback) {
      postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.text(), faker.image.imageUrl(), getRandomCategory(), callback);
    },
  ],
  cb);
}

function getRandomCategory() {
  if (categories && categories.length > 0) {
    const category = categories[Math.round(Math.random()*(categories.length-1))];
    return category;
  }
  return null;
}

function getRandomPosts() {
  if (posts && posts.length > 0) {
    const nPosts = Math.round(Math.random()*(posts.length-1));
    const cPosts = posts.slice(0, posts.length);
    while(cPosts.length > nPosts) {
      cPosts.splice(Math.round(Math.random()*(posts.length-1)), 1);
    }
    return cPosts;
  }
  return null;
}

/*
Asynchronous series
*/
async.series([
  // DON'T touch the following 2
  //createRoles,
  //createStatus,
  //createCategories,
  //createCommunities,
  //createPosts,
  //createUsers

],
function(err, results) {
  if (err) {
    console.log(`FINAL ERR: ${err}`);
  }
  mongoose.connection.close();
});