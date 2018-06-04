import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import logoWhite from '../public/logoWhite.png';

/*
Libraries
*/
import { HashLink as Link } from 'react-router-hash-link';
import { NavHashLink as NavLink } from 'react-router-hash-link';

/*
State management
*/
import { connect } from 'react-redux';
import { toggleOffcanvas } from '../../actions/offcanvasActions';

/*
Material UI
*/


import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconMenu from '@material-ui/icons/Menu';
import IconAccountCircle from '@material-ui/icons/AccountCircle';

/*
Component styles
*/
import './fixedSideNav.css';
import './fixedSideNav.test.js';

const styles = {

};

class FixedSideNavTerms extends Component {

    //dirty way otherwise routers interrupt
    activeClass(path){
        if (window.location.hash == path) {
            return true
          } else {
            return false
        }
    }  

    render() {       
        return (
            <div class="sidenav">
            <a className="sideNavActive" onclick={this.activeClass('#terms-of')} className={(this.activeClass('#terms-of') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#terms-of">Terms of Service</a>
            <a className="sideNavActive" onclick={this.activeClass('#age-13')} className={(this.activeClass('#age-13') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#age-13">You Need href be 13 </a>
            <a className="sideNavActive" onclick={this.activeClass('#need-account')} className={(this.activeClass('#need-account') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#need-account">You Need an Account</a>
            <a className="sideNavActive" onclick={this.activeClass('#content-yours')} className={(this.activeClass('#content-yours') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#content-yours">Your Content is Yours</a>
            <a className="sideNavActive" onclick={this.activeClass('#our-rights')} className={(this.activeClass('#our-rights') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#our-rights">Our Rights in the Services</a>
            <a className="sideNavActive" onclick={this.activeClass('#deal-copyright')} className={(this.activeClass('#deal-copyright') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#deal-copyright">How We Deal with Copyright Issues</a>
            <a className="sideNavActive" onclick={this.activeClass('#do-dont')} className={(this.activeClass('#do-dont') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#do-dont">Things You Should and Shouldn’t Do</a>
            <a className="sideNavActive" onclick={this.activeClass('#delete-account')} className={(this.activeClass('#delete-account') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#delete-account">Deleting Your Account</a>
            <a className="sideNavActive" onclick={this.activeClass('#disclaimers')} className={(this.activeClass('#disclaimers') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#disclaimers">Disclaimers, Limitations of Liability and Indemnification</a>
            <a className="sideNavActive" onclick={this.activeClass('#serving-ads')} className={(this.activeClass('#serving-ads') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#serving-ads">Serving Ads</a>
            <a className="sideNavActive" onclick={this.activeClass('#general-terms')} className={(this.activeClass('#general-terms') ? 'sideNavActive' : 'sideNavNotActive')}  href="./terms-of-service#general-terms">General Terms</a>
            </div>
        )
    }
}

export default (FixedSideNavTerms)