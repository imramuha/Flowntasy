import { COMMUNITY_CREATED, COMMUNITY_CREATION_ERROR } from '../constants';

const initialState = {
  newCommunityCreated: false,
  newCommunity: undefined,
  error: undefined
}

function communityReducer(state = initialState, action) {
  switch (action.type) {
    case COMMUNITY_CREATED:
      return Object.assign({}, state, {
        newCommunityCreated: true,
        newCommunity: action.payload
      });
    case COMMUNITY_CREATION_ERROR:
      return Object.assign({}, state, {
        newCommunityCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default communityReducer;