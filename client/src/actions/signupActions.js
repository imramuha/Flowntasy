import { USER_CREATION_ERROR, USER_CREATED } from '../constants';

export function signUpActionLocalStrategy({ email, username, password }, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({email: email, username: username, localProvider: {password: password}}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };

      const response = await fetch('/api/v1/signup', options);
      const responseJson = await response.json();

      
      dispatch({ 
        type: USER_CREATED,
        payload: responseJson
      });
      localStorage.setItem('flowntasy_signUp', JSON.stringify(responseJson));

    } catch(error) {
      dispatch({
        type: USER_CREATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}