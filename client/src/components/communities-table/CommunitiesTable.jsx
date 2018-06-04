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
import {TableRow } from 'material-ui/Table';
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

const COMMUNITYACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

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

class CommunitiesTable extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      communities: null,
      communityId: null,
      communityAction: null,
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    }
  }

  handleDialogOpen = (communityId, communityAction) => {
    let title = '';
    let message = '';

    switch(communityAction) {
      case COMMUNITYACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the community with id ${communityId}?`;
        break;
      case COMMUNITYACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the community with id ${communityId}?`;
        break;
      case COMMUNITYACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the community with id ${communityId}?`;
        break;
    }

    this.setState({
      communityId: communityId,
      communityAction: communityAction,
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

    switch(this.state.communityAction) {
      case COMMUNITYACTIONSENUM.DELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/communitiesTable/${this.state.communityId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case COMMUNITYACTIONSENUM.SOFTDELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/communitiesTable/${this.state.communityId}/softdelete`;
        options = {
          method: 'PATCH'
        }
        break;
      case COMMUNITYACTIONSENUM.SOFTUNDELETE:
        url = `https://flowntasy.herokuapp.com/api/v1/backoffice/communitiesTable/${this.state.communityId}/softundelete`;
        options = {
          method: 'PATCH'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.action && results.action == 'DELETE') {
          this.loadCommunities();
        } else {
          const community = results;
          const i = this.state.communities.findIndex((obj, index, array) => {
            return obj._id === community._id;
          });
          const communities = this.state.communities;
          communities[i] = community;
  
          this.setState({
            communities: communities
          })
        }
        }
      );

    this.handleDialogClose();
    this.loadCommunities();
  }

  componentWillMount() {
    this.loadCommunities();
  }

  loadCommunities = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/backoffice/communitiesTable')
      .then( response => response.json())
      .then( item => this.setState({ communities: item })); 
  }

  getCommunitiesAsJSX() {
    let containerElement = '';
    if(this.state.communities) {
      containerElement = this.state.communities.map( (community, index) => (
        <TableRow key={community._id}>
          <td>{community.community}</td>
          <td>{community.description}</td>
          <td>{community._category.category}</td>
          <td>{community.updated_at}</td>  
          <td>{community.__created_by.username}</td>
          <td>{Object.keys(community.users_in).length}</td>
          <td className='actionIcons'>
            <IconButton
              component={Link} to={'/backoffice/communitiesTable/' + community._id}>
              <IconCreate />
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(community._id, (community.deleted_at)?COMMUNITYACTIONSENUM.SOFTUNDELETE:COMMUNITYACTIONSENUM.SOFTDELETE)} style={{ opacity: ((community.deleted_at)?0.3:1) }}>
              <IconDelete/>
            </IconButton>
            <IconButton
              onClick={() => this.handleDialogOpen(community._id, COMMUNITYACTIONSENUM.DELETE)}>
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
      <a href='/backoffice'><i className="fas fa-arrow-alt-circle-left backofficeHeading Icon"></i></a>
       <h1 className="backofficeHeading">COMMUNITIES</h1>
        <table className="tableBackoffice">
          <thead className="theadBackoffice">
            <tr className="trBackoffice">
              <td>Community</td>
              <td numeric>Description</td>
              <td numeric>Category</td>
              <td numeric>Updated_at</td>
              <td numeric>Created_by</td>
              <td numeric>Members</td>
              <td numeric>Actions</td>
            </tr>
          </thead>
          <tbody className="tbodyBackoffice">
          {this.getCommunitiesAsJSX()}
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

CommunitiesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommunitiesTable);