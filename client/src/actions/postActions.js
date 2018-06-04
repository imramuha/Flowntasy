import { POST_CREATION_ERROR, POST_CREATED } from '../constants';

export function createPost({ title, description, body, categories, user}, history) {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem('flowntasy_auth'));
      const useri = user.user['id'];

      const postData = new Blob([JSON.stringify({title: title, description: description, body: body, categories: categories, _user: user.user['id']}, null, 2)], {type : 'application/json'});

      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };

      // console.log(title)
      // console.log(categories);

      const response = await fetch('/api/v1/discover/create-post', options);
      const responseJson = await response.json();

      // console.log(responseJson);

      dispatch({ 
        type: POST_CREATED,
        payload: responseJson
      });

    } catch(error) {
      dispatch({
        type: POST_CREATION_ERROR,
        payload: {
          message: 'An error occured during the creation of your post. Please try again later.',
          exception: error
        }
      });
    }
  };
}