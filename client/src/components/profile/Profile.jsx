import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

/*
Styles
*/
const styles = {
  card: {
  },
  media: {
    height: 200,
  },
};

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: 'You are currently not logged is',
      username: '',
    }
  }

  // status msg if auth is user or admin
  getUserStatusMessage = () => {
    if (localStorage.getItem('flowntasy_auth')) {
      this.setState({ message: JSON.parse(localStorage.getItem('flowntasy_auth'))['message'] })
      this.setState({ username: JSON.parse(localStorage.getItem('flowntasy_auth'))['user']['username'] });;
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.getUserStatusMessage();
    }, 1)
  }

  render() {
    return (
    <div className="profile">
        <div className="feedProfile">
          <div className="feedImg">
            <div className="coverImg">
            </div>
            <div className="profileImg"> <div className="userStatusMessageFeed"><h3>{this.state.message}{this.state.username}</h3></div>
            </div>
          </div>
          <div className="profileStats">FLOWS</div>
          <div className="profileStats">FOLLOWERS</div>
          <div className="profileStats">FOLLOWING</div>
        </div>
        <div className="feedContent">
          <button className="feedButton">SETTINGS</button>
          <button className="feedButton">MY HISTORY</button>
          <button className="feedButton">MESSAGES</button>

        </div>
      </div>
    )
    }
  
  }


Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);