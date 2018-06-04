import { AUTHENTICATED, AUTHENTICATED_ADMIN, AUTHENTICATION_ERROR, UNAUTHENTICATED } from '../constants';

export function signInActionLocalStrategy({ email, password }, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({ email: email, password: password }, null, 2)], { type: 'application/json' });
      const options = {
        method: 'POST',
        body: postData,
        mode: 'cors',
        cache: 'default'
      };


      const response = await fetch('https://flowntasy.herokuapp.com/api/v1/auth/local', options);
      // console.log(response);
      const responseJson = await response.json();

      // checks the API response
      // if user banned -> unauthenticate it and store a message into the localstorage
      if (response.ok && responseJson['status'] == 'BANNED') {
        dispatch({
          type: UNAUTHENTICATED,
          payload: responseJson
        });
        localStorage.setItem('flowntasy_auth', JSON.stringify(responseJson));
      } else if (response.ok) {
        dispatch({
          type: AUTHENTICATED,
          role: responseJson['user']['_role'],
          payload: responseJson
        });
        localStorage.setItem('flowntasy_auth', JSON.stringify(responseJson));
        // if error safe also in LS
      } else if (!response.ok) {
        return localStorage.setItem('flowntasy_auth_error', JSON.stringify(responseJson));
      }

    } catch (error) {
      console.log('caught an error');
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid username or password.'
      });
    }
  };
}

export function signInActionFacebookStrategy(accessToken, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({ access_token: accessToken }, null, 2)], { type: 'application/json' });
      const options = {
        method: 'POST',
        body: postData,
        mode: 'cors',
        cache: 'default'
      };
      const response = await fetch('/api/v1/auth/facebook', options);
      const responseJson = await response.json();

      dispatch({
        type: AUTHENTICATED,
        payload: responseJson
      });
      localStorage.setItem('flowntasy_auth', JSON.stringify(responseJson));

    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid access token'
      });
    }
  };
}

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}

// removes auth statuses
export function authStatusClear() {
  localStorage.removeItem('flowntasy_auth_error');
  localStorage.removeItem('flowntasy_signUp');

  // checks if user is banned -> removes its auth from LS as well
  if (JSON.parse(localStorage.getItem('flowntasy_auth'))) {
    const userStatus = JSON.parse(localStorage.getItem('flowntasy_auth'));
    if (userStatus['status'] == 'BANNED') {
      localStorage.removeItem('flowntasy_auth');
    }
  }
}

// shwos error after login/sign up based on the message/error we get from our api
export function getError() {
  if (localStorage.getItem('flowntasy_auth_error')) {
    const signInError = JSON.parse(localStorage.getItem('flowntasy_auth_error'));
    const signInErrorMessage = signInError['message'];
    return signInErrorMessage;
  } else if (localStorage.getItem('flowntasy_signUp')) {
    const signUpError = JSON.parse(localStorage.getItem('flowntasy_signUp'));
    const signUpErrorMessage = signUpError['message'];
    return signUpErrorMessage;
  } else if (localStorage.getItem('flowntasy_auth') && !JSON.parse(localStorage.getItem('flowntasy_auth'))['token']) {
    const banMessage = "Your account is disabled, please get in touch."
    return banMessage;
  } else {
    const errorMessage = "Something went wrong, please try again."
    return errorMessage;
  }
}