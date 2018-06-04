import React, { Component } from 'react';

/*
Libraries
*/


/*
Material UI
*/


/*
Components
*/
import PostsTable from '../../components/posts-table/PostsTable';

/*
Component styles
*/
import './PostsTablePage.css';

class PostsTablePage extends Component {
  render() {
    return (
      <div>
        <PostsTable />
      </div>
    )
  }
}

export default (PostsTablePage);