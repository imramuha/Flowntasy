import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import PostsList from '../../components/posts-list/PostsList';

/*
Component styles
*/
import './PostsPage.css';

class PostsPage extends Component {

  render() {
    return (
      <div>

              <PostsList />

      </div>
    )
  }
}

export default (PostsPage);