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
import './PostsList.css';
const styles = {
  card: {
  },
  media: {
    height: 200,
  },
};

class PostsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: null
    }
  }

  // get posts
  loadPosts = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable')
      .then(response => response.json())
      .then(item => this.setState({ posts: item }));
  }


  componentWillMount() {
    this.loadPosts();
  }

  getPostsAsJSX() {
    let containerElement = '';
    if (this.state.posts) {
      containerElement = this.state.posts.map((post, index) => (
        <div className="listPost">
          <div className="listPostImg">
          </div>
          <div className="listPostContent">
            <div className="feedPostTitle PostsList">{post.title}</div>
            <div className="feedPostUser PostsList">made by {post._user.username}</div>
            <div className="listPostIcons PostsList">
  
                <i class="fas fa-heart"></i>{Object.keys(post.liked_users).length}
                <i class="fas fa-eye"></i>
                <i class="fas fa-bookmark"></i>
            
            </div>
            <div className="feedPostUser PostsList" >{post.description}</div>
          </div>
        </div>
      ))
    }
    return containerElement;
  }



  render() {
    const { classes } = this.props;

      return (
        <div className="listsContainer">
          <div className="listHeader">


            <h1 className="feedTitle">Experience the flow of other people</h1>
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
              {this.getPostsAsJSX()}


            </div>


          </div>
          </div>

      )
      }
}

PostsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsList);