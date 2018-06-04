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
    this.state = { message: 'You are currently not logged is' };
  }

  getUserStatusMessage = () => {
    if (localStorage.getItem('flowntasy_auth')) {
      this.setState({ message: JSON.parse(localStorage.getItem('flowntasy_auth'))['message'] });
    }
  }

  // get posts
  loadPosts = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable')
      .then( response => response.json())
      .then( item => this.setState({ posts: item })); 
  }

  // get users
  loadUsers = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/usersTable')
    .then( response => response.json())
    .then( item => this.setState({ users: item })); 
  }


  componentWillMount() {
    setTimeout(() => {
      this.getUserStatusMessage();
      this.loadUsers();
      this.loadPosts();
    }, 1)
  }

  getPostsAsJSX() {
    let containerElement = '';
    if(this.state.posts) {
      containerElement = this.state.posts.map( (post, index) => (
        <div className="posts">
            <div className="feedPost">
              <div className="feedPostDate">{post.created_at}</div>
              <div className="feedPostBody">
                <div className="feedPostImage"></div>
                <div className="feedPostText">
                  <div className="feedPostTitle">{post.title}</div>
                  <div className="feedPostUser"><td>{post._user.username}</td></div>
                  <div className="feedPostCategory">{post.categories.map((category) => category.category + '; ' )}</div>
                </div>
                <div className="feedPostIcons">
                  <div className="feedPostIcon">
                  <i className="fas fa-bars" />{Object.keys(post.liked_users).length}
                  <i className="fas fa-bars" />
                  <i className="fas fa-bars" />
                </div>

                </div>
              </div>
            </div>
          </div>
  
       ) )}
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
            <div className="profileImg"> <div className="userStatusMessage"><h3>{this.state.message}</h3></div>
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