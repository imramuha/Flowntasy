import { AUTHENTICATED, AUTHENTICATED_ADMIN, AUTHENTICATION_ERROR, UNAUTHENTICATED } from '../constants';

const initialState = {
  authenticated: false,
  role: null,
  auth: undefined,
  error: undefined
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, {
        authenticated: true,
        role: action.role,
        auth: action.payload
      });
    case UNAUTHENTICATED:
      return Object.assign({}, state, {
        authenticated: false,
        role: null,
        auth: null
      });
    case AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        role: null,
        error: action.payload
      });
    default:
      return state;
  }
}

export default authReducer;