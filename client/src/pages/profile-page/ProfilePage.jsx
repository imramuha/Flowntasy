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
  }


  render() {
    console.log(this.props)
    return (
      <div>
        <div className="c-max">
              <Profile userId={ this.props.match.params.id }/>
        </div>
      </div>
    )
  }
}

export default (ProfilePage);