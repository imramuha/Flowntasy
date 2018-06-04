import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/

/*
Component styles
*/
import './FeedPage.css';

class feedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'You are currently not logged is',
      username: '',
    };
  }

  // status msg if auth is user or admin
  getUserStatusMessage = () => {
    if (localStorage.getItem('flowntasy_auth')) {
      this.setState({ message: JSON.parse(localStorage.getItem('flowntasy_auth'))['message'] })
      this.setState({ username: JSON.parse(localStorage.getItem('flowntasy_auth'))['user']['username'] });;
    }
  }

  // get posts
  loadPosts = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable')
      .then(response => response.json())
      .then(item => this.setState({ posts: item }));
  }


  componentWillMount() {
    setTimeout(() => {
      this.getUserStatusMessage();
      this.loadPosts();
    }, 1)
  }

  getPostsAsJSX() {
    let containerElement = '';
    if (this.state.posts) {
      containerElement = this.state.posts.map((post, index) => (
        <div className="posts">
          <div className="feedPost">
            <div className="feedPostDate">{/*(new Date(post.created_at.toLocaleDateString).toLocaleDateString("en-US"))*/post.created_at}</div>
            <div className="feedPostBody">
              <div className="feedPostImage"></div>
              <div className="feedPostText">
                <div className="feedPostTitle">{post.title}</div>
                <div className="feedPostUser">made by {post._user.username}</div>
                <div className="feedPostCategory">{post.categories.map((category) => category.category + '; ')}</div>
              </div>
              <div className="feedPostIcons">
                <div className="feedPostIcon">
                  <i class="fas fa-heart"></i>{Object.keys(post.liked_users).length}
                  <i class="fas fa-eye"></i>
                  <i class="fas fa-bookmark"></i>
                </div>

              </div>
            </div>
          </div>
        </div>

      ))
    }
    return containerElement;
  }


  render() {

    /* */
    /* */
    console.log(this.state.users);
    console.log(this.state.posts);
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
          <button className="feedButton">FEED</button>
          <button className="feedButton">FOLLOWING</button>
          <button className="feedButton">COMMUNITIES</button>

          <div>
            {this.getPostsAsJSX()}
          </div>

        </div>
      </div>
    )
  }
}

export default (feedPage);