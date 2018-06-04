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
import './CommunitiesList.css';
const styles = {
  card: {
  },
  media: {
    height: 200,
  },
};

class CommunitiesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      communities: null
    }
  }

  componentWillMount() {
    this.loadCommunities();
  }

  loadCommunities = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/communitiesTable')
      .then(response => response.json())
      .then(item => this.setState({ communities: item }));
  }

  getCommunitiesAsJSX() {
    let containerElement = '';
    if (this.state.communities) {
      containerElement = this.state.communities.map(( community, index) => (
        <div className="listCommunity">
          <div className="listCommunityImg">
          </div>
          <div className="listPostContent CommunityList">
            <div className="feedPostTitle PostsList">{ community.community}</div>
            <div className="feedPostUser PostsList">{community._category.category}</div>
            <div className="feedPostTitle PostsList">{community.description}</div>
            <div className="feedPostTitle PostsList">
            <i className="fas fa-users"></i> {Object.keys(community.users_in).length}<br />
            </div>
          </div>
          <div><button className="communityJoinButton">JOIN</button></div>
        </div>

      ));
    }
    return containerElement;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="listsContainer">
        <div className="listHeader">


          <h1 className="feedTitle">There is no good place as home</h1>
          <div className="listsubHeader">


            <div className="listCategories" >
              <h1>CATEGORIES &#9660;</h1>
            </div>

            <div className="listsubCategories">
              <button className="listsubCategory">
                <h2>POPULAR 	&#9660;</h2>
              </button>
              <button className="listsubCategory">
                <h2>RISING 	&#9650;</h2>
              </button>
              <button className="listsubCategory">
                <h2>NEW 	&#9650;</h2>
              </button>
            </div>


          </div>


          <div className="listPostsContainer">
            {this.getCommunitiesAsJSX()}
          </div>
        </div>
      </div>
    )
  }
}


CommunitiesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommunitiesList);