import { USER_CREATED, USER_CREATION_ERROR } from '../constants';

const initialState = {
  newUserCreated: false,
  newUser: undefined,
  error: undefined
}

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case USER_CREATED:
      return Object.assign({}, state, {
        newUserCreated: true,
        newUser: action.payload
      });
    case USER_CREATION_ERROR:
      return Object.assign({}, state, {
        newUserCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default signupReducer;