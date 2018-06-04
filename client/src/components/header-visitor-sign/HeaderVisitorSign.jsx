import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import {Link} from 'react-router-dom';

/*
State management
*/
import { connect } from 'react-redux';
import { toggleOffcanvas } from '../../actions/offcanvasActions';

/*
*
*/
import {signOutAction} from '../../actions/authActions'

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {
  TextField,
} from 'redux-form-material-ui'

import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconMenu from '@material-ui/icons/Menu';
import IconAccountCircle from '@material-ui/icons/AccountCircle';

/*
Component styles
*/
import './HeaderVisitorSign.css';

const styles = {
};

class HeaderVisitorSign extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
} 
   // Links for USER/DISCOVER/COMMUNITY
   navigationLinks() {
    if (this.props.authenticated) {
      const authenticatedLinks =  [
        <a component={Link} href="/feed" >FEED</a>,
        <a component={Link} href="/profile"  >PROFILE</a>,
        <a component={Link} href="/home"  >HOME</a>,
        <a component={Link} href="/about-us"  >ABOUT US</a>,
        <a component={Link} href="/terms-of-service"  >TERMS & SERVICE</a>,
        <a component={Link} href="/privacy-policy" >PRIVACY POLICY</a>,
        <a component={Link} href="/backoffice"  >BACKOFFICE</a>,
        <a onClick={signOutAction} component={Link} href="/home">SIGN OUT</a>,

        // if role is admin show all -> if role is not admin but user is authenticated -> remove backoffice
      ]; if (this.props.role !=='5b0621fa6044ae5350afd7fc') {
        authenticatedLinks.splice(6, 1);
        return authenticatedLinks;
      } else if (this.props.role === '5b0621fa6044ae5350afd7fc') {
        return authenticatedLinks;
      }
    }

      const unauthenticatedLinks = [
      <a component={Link} href="/home" >HOME</a>,
      <a component={Link} href="/about-us" >ABOUT US</a>,
      <a component={Link} href="/terms-of-service" >TERMS & SERVICE</a>,
      <a component={Link} href="/privacy-policy">PRIVACY POLICY</a>,
      <a component={Link} href="/signin">LOGIN</a>,
      <a component={Link} href="/signup" >REGISTER</a>,
    ];
    return unauthenticatedLinks;
  }
  render() {
    const links = this.navigationLinks()
    return (
      <div className="navigationVisitorSignContainer">
      <div className="logoIcon"><img className="logoFlowntasy" alt="Flowntasy logo" src={require("../../logoWhite.png")}/><div className="flowntasyName">FLOWNTASY</div></div>
          <div className="dropdownSign">
            <button className="dropbuttonSign homePage">MORE  &#9660;</button>
            <div className="dropdownSign-content">
              {links.map(links => <div> {links} </div>)}
            </div>
          </div> 
      </div>  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    role: state.auth.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderVisitorSign)