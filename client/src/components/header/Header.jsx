import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Link } from 'react-router-dom';

/*
State management
*/
import { connect } from 'react-redux';
import { toggleOffcanvas } from '../../actions/offcanvasActions';
import { signOutAction } from '../../actions/authActions'

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
import './Header.css';
const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      mobileNavVisible: false
    }
  }

    handleResize() {
      this.setState({windowWidth: window.innerWidth});
    }
    
    componentDidMount() {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize.bind(this));
    } 

    renderMobileNav() {
      if(this.state.mobileNavVisible) {
        return this.burgermenuLinks();
      }
    }

    handleNavClick() {
      if(!this.state.mobileNavVisible) {
        this.setState({mobileNavVisible: true});
      } else {
        this.setState({mobileNavVisible: false});
      }
    }

    renderNavigation() {
      if(this.state.windowWidth <= 500) {
        return [
          <div>
          <button onClick={this.handleNavClick.bind(this) } className="dropbuttonBurger">
           <i className="fas fa-bars"></i>
          <div className="dropdownSign-content"> {this.renderMobileNav()} </div>
          </button>
          </div>
        ];
      } 
      }

  
     
  burgermenuLinks() {
    if (this.props.authenticated) {
      const burgermenuLinks = [
        <a component={Link} href="/feed" >FEED</a>,
        <a component={Link} href="/profile"  >PROFILE</a>,
        <a component={Link} href="/home"  >HOME</a>,
        <a component={Link} href="/discover/posts">STORIES</a>,
        <a component={Link} href="/discover/create-post">CREATE STORY</a>,
        <a component={Link} href="/community/communities" >COMMUNITIES</a>,
        <a component={Link} href="/community/create-community">CREATE COMMUNITY</a>,
        <a component={Link} href="/about-us"  >ABOUT US</a>,
        <a component={Link} href="/terms-of-service"  >TERMS & SERVICE</a>,
        <a component={Link} href="/privacy-policy" >PRIVACY POLICY</a>,
        <a component={Link} href="/backoffice"  >BACKOFFICE</a>,
        <a onClick={signOutAction} component={Link} href="/home">SIGN OUT</a>,

        // if role is admin show all -> if role is not admin but user is authenticated -> remove backoffice
      ]; if (this.props.role != '5b0621fa6044ae5350afd7fc') {
        burgermenuLinks.splice(6, 1);
        return burgermenuLinks;
      } else if (this.props.role === '5b0621fa6044ae5350afd7fc') {
        return burgermenuLinks;
      }
    }
  }

  // Links for USER/DISCOVER/COMMUNITY
  navigationLinks() {
    if (this.props.authenticated) {
      const authenticatedLinks = [
        <a component={Link} href="/feed" >FEED</a>,
        <a component={Link} href="/profile"  >PROFILE</a>,
        <a component={Link} href="/home"  >HOME</a>,
        <a component={Link} href="/about-us"  >ABOUT US</a>,
        <a component={Link} href="/terms-of-service"  >TERMS & SERVICE</a>,
        <a component={Link} href="/privacy-policy" >PRIVACY POLICY</a>,
        <a component={Link} href="/backoffice"  >BACKOFFICE</a>,
        <a onClick={signOutAction} component={Link} href="/home">SIGN OUT</a>,

        // if role is admin show all -> if role is not admin but user is authenticated -> remove backoffice
      ]; if (this.props.role != '5b0621fa6044ae5350afd7fc') {
        authenticatedLinks.splice(6, 1);
        return authenticatedLinks;
      } else if (this.props.role === '5b0621fa6044ae5350afd7fc') {
        return authenticatedLinks;
      }
    }
  }


  discoverLinks() {
    if (this.props.authenticated) {
      const discoverLinks = [
        <a component={Link} href="/discover/posts">Discover stories</a>,
        <a component={Link} href="/discover/create-post">Create one yourself</a>,
      ]
      return discoverLinks;
    }
  }

  communityLinks() {
    if (this.props.authenticated) {
      const communityLinks = [
        <a component={Link} href="/community/communities" >Find a community</a>,
        <a component={Link} href="/community/create-community">Create a community</a>,
      ]
      return communityLinks;
    }
  }


  render() {
    const links = this.navigationLinks()
    const discoverLinks = this.discoverLinks()
    const communityLinks = this.communityLinks()
    const burgermenuLinks = this.burgermenuLinks()

    return (
      <div className="navigationContainer ">
        <div className="navigation header">

        <div className="dropdownSign">
      {this.renderNavigation()}
    </div>

          <div className="dropdownSign hide">
            <a className="dropbuttonSign header" style={{ textDecoration: 'none' }} href="/feed">FEED</a>
          </div>

          <div className="dropdownSign hide">
            <button className="dropbuttonSign header" >
              DISCOVER &#9660;
            <div className="dropdownSign-content header">
                { discoverLinks.map( discoverLinks => <div> { discoverLinks} </div>)}
              </div>
            </button>
          </div>

          <div className="dropdownSign hide">
            <button className="dropbuttonSign header" >
              COMMUNITIES &#9660;
            <div className="dropdownSign-content header">
                {communityLinks.map(communityLinks => <div> {communityLinks} </div>)}
              </div>
            </button>
          </div>


          <img className='logo'  alt="Flowntasy logo" src={require("../../logoWhite.png")} />

          <div variant="title" color="inherit" className="title" >
           <a href='discover/create-post'  > <button  className="flowButton">FLOW</button></a>
          </div>


          <div className="dropdownSign hide">
            <button className="dropbuttonSign header" >
              <i class="fas fa-user-circle" /> &#9660;
              <div className="dropdownSign-content header user">
                {links.map(links => <div> {links} </div>)}
              </div>
            </button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Header);