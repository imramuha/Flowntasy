import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import Profile from '../../components/profile/Profile';

/*
Component styles
*/

  class ProfilePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loggedUserId:  ''
      }
    }
  
    getUserId() {
      if (JSON.parse(localStorage.getItem('flowntasy_auth'))) {
        const userId = JSON.parse(localStorage.getItem('flowntasy_auth'));
        return userId['user']['id'];
      }
    }
  
    componentDidMount() {
      const userId = this.getUserId();
      this.state = {
        loggedUserId: userId
      }
    }
  
  render() {
  
    return (
      <div>
        <div className="c-max">
          <Profile userId={this.state.loggedUserId} />
        </div>
      </div>
    )
  }
  }



export default (ProfilePage);