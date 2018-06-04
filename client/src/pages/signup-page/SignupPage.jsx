import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import SignUp from '../../components/sign-up/SignUp';
/*
Component styles
*/
import './SignupPage.css';

class SignupPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <div class="signContainer">
          <h1 className="signTitle">JOIN THE FLOW<span>_</span></h1>
          <SignUp />
        </div>
      </div>
    )
  }
}

export default (SignupPage);