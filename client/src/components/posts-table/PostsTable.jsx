import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Link } from 'react-router-dom';
import Enum from "es6-enum";

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconCreate from '@material-ui/icons/Create';
import IconDelete from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';

import './PostsTable.css';

const POSTACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

/*
Styles
*/
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
  },
});

class PostsTable extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      posts: null,
      postId: null,
      postAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }

  handleDialogOpen = (postId, postAction) => {
    let title = '';
    let message = '';

    switch(postAction) {
      case POSTACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the post with id ${postId}?`;
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the post with id ${postId}?`;
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the post with id ${postId}?`;
        break;
    }

    this.setState({
      postId: postId,
      postAction: postAction,
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch(this.state.postAction) {
      case POSTACTIONSENUM.DELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable/${this.state.postId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case POSTACTIONSENUM.SOFTDELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable/${this.state.postId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case POSTACTIONSENUM.SOFTUNDELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable/${this.state.postId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.action && results.action == 'DELETE') {
          this.loadPosts();
        } else {
          const post = results;
          const i = this.state.posts.findIndex((obj, index, array) => {
            return obj._id === post._id;
          });
          const posts = this.state.posts;
          posts[i] = post;
  
          this.setState({
            posts: posts
          })
        }
        }
      );

    this.handleDialogClose();
    this.loadPosts();
  }

  componentWillMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable')
      .then( response => response.json())
      .then( item => this.setState({ posts: item })); 
  }

  getPostsAsJSX() {
    let containerElement = '';
    if(this.state.posts) {
      containerElement = this.state.posts.map( (post, index) => (
        <TableRow key={post._id}>
          <td>{post.title}</td>
          <td>{post.description}</td>
          <td>{post.body}</td>

          <td>{post.categories.map((category) => category.category + '; ' )}</td>
          {console.log(post._user.username === undefined ? 'hello' : post._user.username)}
          <td>{post._user.username}</td>
          <td>{post.created_at}</td>
          <td>{Object.keys(post.liked_users).length}</td>
          <td className='actionIcons'>
            <IconButton
              component={Link} to={'/backoffice/postsTable/' + post._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(post._id, (post.deleted_at)?POSTACTIONSENUM.SOFTUNDELETE:POSTACTIONSENUM.SOFTDELETE)} style={{ opacity: ((post.deleted_at)?0.3:1) }}>
              <IconDelete/>
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(post._id, POSTACTIONSENUM.DELETE)}>
              <IconDeleteForever />
            </IconButton>
          </td>
        </TableRow>));
    }
    return containerElement;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="backoffice">
       <a href='/backoffice'><i class="fas fa-arrow-alt-circle-left backofficeHeading Icon"></i></a>
        <h1 class="backofficeHeading">POSTS</h1>
        <table className="tableBackoffice">
          <thead className="theadBackoffice">
            <tr className="trBackoffice">
              <td>Title</td>
              <td numeric>Description</td>
              <td numeric>Body</td>
              <td numeric>Categories</td>
              <td numeric>Created by</td>
              <td numeric>Created</td>
              <td numeric>Likes</td>
              <td numeric>Actions</td>
            </tr>
          </thead>
          <tbody className="tbodyBackoffice">
          {this.getPostsAsJSX()}
          </tbody>
        </table>
        <Dialog
          fullScreen={false}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleDialogSubmit()} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )  
  }
}

PostsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsTable);