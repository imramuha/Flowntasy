import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import offcanvasReducer from './offcanvasReducer';
import postReducer from './postReducer';
import communityReducer from './communityReducer';
import signupReducer from './signupReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  offcanvas: offcanvasReducer,
  post: postReducer,
  signup: signupReducer,
  community: communityReducer,
});