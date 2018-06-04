import React, { Component } from 'react';

/*
Libraries
*/
import queryString from 'query-string';

/*
Material UI
*/


/*
Components
*/
import PostForm from '../../components/post-form/PostForm';
import Header from '../../components/header/Header';

/*
Component styles
*/
import './PostCreatePage.css';

class PostCreatePage extends Component {
  constructor(props) {
    super(props);

    const parsed = queryString.parse(this.props.location.search);
    const id = parsed.id;

    this.state = {
      boSelectedPostId:  id
    }
  }

  render() {
    return (
      <div class="backgroundCreateForm">
        <Header />
              <PostForm postId={ this.state.boSelectedPostId } />
      </div>
    )
  }
}

export default (PostCreatePage);