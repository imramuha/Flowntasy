const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const auth = require('./providers/auth')();

/*
Controllers
*/
const authController = require('./controllers/authController');
const communityController = require('./controllers/communityController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const signupController = require('./controllers/signupController');
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');


/*
Routes
*/
/*
router.get('/blogs', blogController.get_blogs);
router.get('/blogs/:id', blogController.get_blog);*/
//router.get('/posts', auth.authenticateJwt(), postController.get_posts);// Securing the end-point to-do
router.get('/postCreate', postController.get_posts);
router.get('/postCreate/:postId', postController.get_post);
router.get('/backoffice/rolesTable', roleController.get_all_roles)
// router.post('/postCreate', postController.post_create_post); // send our created post
router.get('/posts/:postId/update', postController.post_update_get);
router.put('/posts/:postId', postController.post_update_put);
//router.post('/signup', authController.user_create_post);
//router.get('/signup/create', signupController.user_create_get);
router.post('/signup', signupController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

// AUTHENTICATED
// CREATE
router.get('/discover/create-post', postController.post_create_get); 
router.post('/discover/create-post', postController.post_create_post); // send our created post
router.get('/community/create-community', communityController.community_create_get); 
router.post('/community/create-community', communityController.community_create_post); // send our created post


// BACKOFFICE
// USERS
router.get('/backoffice/usersTable', userController.get_all_users)
router.delete('/backoffice/usersTable/:userId', userController.user_delete);
router.patch('/backoffice/usersTable/:userId/softdelete', userController.user_softdelete_patch);
router.patch('/backoffice/usersTable/:userId/softundelete', userController.user_softundelete_patch);


// POSTS
router.get('/backoffice/postsTable', postController.get_posts);
router.get('/backoffice/postsTable/:id', postController.post_create_get);
router.delete('/backoffice/postsTable/:postId', postController.post_delete_delete);
router.patch('/backoffice/postsTable/:postId/softdelete', postController.post_softdelete_patch);
router.patch('/backoffice/postsTable/:postId/softundelete', postController.post_softundelete_patch);

// COMMUNITIES
router.get('/backoffice/communitiesTable', communityController.get_communities);
router.delete('/backoffice/communitiesTable/:communityId', communityController.community_delete);
router.patch('/backoffice/communitiesTable/:communityId/softdelete', communityController.community_softdelete_patch);
router.patch('/backoffice/communitiesTable/:communityId/softundelete', communityController.community_softundelete_patch);
// router.get('/backoffice/postsTable/:id', postController.post_create_get);

// CATEGORIES
router.get('/backoffice/categoriesTable', categoryController.get_categories)
router.delete('/backoffice/categoriesTable/:categoryId', categoryController.category_delete);
router.patch('/backoffice/categoriesTable/:categoryId/softundelete', categoryController.category_softundelete_patch);
router.patch('/backoffice/categoriesTable/:categoryId/softdelete', categoryController.category_softdelete_patch);




module.exports = router;