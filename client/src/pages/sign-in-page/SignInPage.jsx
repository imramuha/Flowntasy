import React, { Component } from 'react';

/*
Libraries
*/


/*
Material UI
*/


/*
Components
*/
import SignIn from '../../components/sign-in/SignIn';

/*
Component styles
*/
import './SignInPage.css';

class SignInPage extends Component {
  render() {
    return (
      <div class="signContainer">
          <h1 className="signTitle">Hi, so we meet again<span>_</span></h1>
              <SignIn />
      </div>           
    )
  }
}

export default (SignInPage);