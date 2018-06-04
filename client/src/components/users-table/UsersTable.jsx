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

const USERACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

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

class UsersTable extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      users: null,
      userId: null,
      userAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }
  
  handleDialogOpen = (userId, userAction) => {
    let title = '';
    let message = '';

    switch(userAction) {
      case USERACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the user with id ${userId}?`;
        break;
      case USERACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the user with id ${userId}?`;
        break;
      case USERACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the user with id ${userId}?`;
        break;
    }

    this.setState({
      userId: userId,
      userAction: userAction,
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

    switch(this.state.userAction) {
      case USERACTIONSENUM.DELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/usersTable/${this.state.userId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case USERACTIONSENUM.SOFTDELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/usersTable/${this.state.userId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case USERACTIONSENUM.SOFTUNDELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/usersTable/${this.state.userId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.action && results.action == 'DELETE') {
          this.loadUsers();
        } else {
          const user = results;
          const i = this.state.users.findIndex((obj, index, array) => {
            return obj._id === user._id;
          });
          const users = this.state.users;
          users[i] = user;
  
          this.setState({
            users: users
          })
        }
        }
      );

    this.handleDialogClose();
    this.loadUsers();
  }

  componentWillMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/usersTable')
    .then( response => response.json())
    .then( item => this.setState({ users: item })); 
  }

  getUsersAsJSX() {
    let containerElement = '';
    console.log(this.state.users)
    if(this.state.users) {
      containerElement = this.state.users.map( (user, index) => (
        <TableRow key={user._id}>
          <td>{user.email}</td>
          <td>{user.username}</td>
          
          <td>{user._role.role}</td>
          <td>{user._status.status}</td>
          <td>{user.created_at}</td>
          <td>{user.deleted_at}</td>
          <td className='actionIcons'>
            <IconButton
              component={Link} to={'/backoffice/usersTable/' + user._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(user._id, (user.deleted_at)?USERACTIONSENUM.SOFTUNDELETE:USERACTIONSENUM.SOFTDELETE)} style={{ opacity: ((user.deleted_at)?0.3:1) }}>
              <IconDelete/>
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(user._id, USERACTIONSENUM.DELETE)}>
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
       <h1 class="backofficeHeading">USERS</h1> 
       <table className="tableBackoffice">
          <thead className="theadBackoffice">
            <tr className="trBackoffice">
              <td>Email</td>
              <td numeric>Username</td>
              <td numeric>Role</td>
              <td numeric>Status</td>
              <td numeric>Created at</td>
              <td numeric>Deleted at</td>
              <td numeric>Actions</td>
            </tr>
          </thead>
          <tbody className="tbodyBackoffice">
          {this.getUsersAsJSX()}
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

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);