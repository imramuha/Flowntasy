import { COMMUNITY_CREATION_ERROR, COMMUNITY_CREATED } from '../constants';

export function createCommunity({ community, description, categories, user}, history) {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem('flowntasy_auth'));

      const postData = new Blob([JSON.stringify({community: community, description: description, _category: categories, __created_by: user.user['id']}, null, 2)], {type : 'application/json'});

      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };

      // console.log(title)
      // console.log(categories);

      const response = await fetch('/api/v1/community/create-community', options);
      const responseJson = await response.json();

      console.log('It was a succes');

      dispatch({ 
        type: COMMUNITY_CREATED,
        payload: responseJson
      });

    } catch(error) {
      dispatch({
        type: COMMUNITY_CREATION_ERROR,
        payload: {
          message: 'There was an error while creating your community.',
          exception: error
        }
      });
    }
  };
}