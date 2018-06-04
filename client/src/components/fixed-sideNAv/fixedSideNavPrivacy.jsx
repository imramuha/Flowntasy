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

class FixedSideNavPrivacy extends Component {

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
            <div className="sidenav">
                <a className="sideNavActive" onclick={this.activeClass('#privacy-policy')} className={(this.activeClass('#privacy-policy') ? 'sideNavActive' : 'sideNavNotActive')} href="./privacy-policy#privacy-policy">Privacy Policy</a>
                <a className="sideNavActive" onclick={this.activeClass('#personal-information')} className={(this.activeClass('#personal-information') ? 'sideNavActive' : 'sideNavNotActive')} href="./privacy-policy#personal-information">What is personal information?</a>
                <a className="sideNavActive" onclick={this.activeClass('#collect-use')} className={(this.activeClass('#collect-use') ? 'sideNavActive' : 'sideNavNotActive')} href="./privacy-policy#collect-use">What do we collect and why do we use it?</a>
                <a className="sideNavActive" onclick={this.activeClass('#birth-date')} className={(this.activeClass('#birth-date') ? 'sideNavActive' : 'sideNavNotActive')} href="./privacy-policy#birth-date">Why do you ask for my date of birth?</a>
                <a className="sideNavActive" onclick={this.activeClass('#collect-email')} className={(this.activeClass('#collect-email') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#collect-email">Why do we collect and use your email?</a>
                <a className="sideNavActive" onclick={this.activeClass('#user-see')} className={(this.activeClass('#user-see') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#user-see">What can other Flowntasy users see?</a>
                <a className="sideNavActive" onclick={this.activeClass('#share-information')} className={(this.activeClass('#share-information') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#share-information">How do we share your personal information?</a>
                <a className="sideNavActive" onclick={this.activeClass('#store-information')} className={(this.activeClass('#store-information') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#store-information">Where do we store your Personal Information?</a>
                <a className="sideNavActive" onclick={this.activeClass('#acces-information')} className={(this.activeClass('#acces-information') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#acces-information">Acces to your Personal Information</a>
                <a className="sideNavActive" onclick={this.activeClass('#protect-information')} className={(this.activeClass('#protect-information') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#protect-information">How does Flowntasy protect my Personal Information?</a>
                <a className="sideNavActive" onclick={this.activeClass('#future-information')} className={(this.activeClass('#future-information') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#future-information">What happens to your Personal Information when you leave Flowntasy?</a>
                <a className="sideNavActive" onclick={this.activeClass('#non-personal')} className={(this.activeClass('#non-personal') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#non-personal">Non-Personal Informaton</a>
                <a className="sideNavActive" onclick={this.activeClass('#changes')} className={(this.activeClass('#changes') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#changes">Changes</a>
                <a className="sideNavActive" onclick={this.activeClass('#contact-us')} className={(this.activeClass('#contact-us') ? 'sideNavActive' : 'sideNavNotActive')}href="./privacy-policy#contact-us">How to contact us?</a>
            </div>
        )
    }
}

export default (FixedSideNavPrivacy)