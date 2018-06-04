import React, { Component } from 'react';

/*
* Libraries
*/
import { Link } from 'react-router-dom';

/*
Component styles
*/
import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="homePage">
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>     
          <div class="frame">
            <div className="scanlines"></div>
            <div class="backgroundImg"></div>
            <video className="backgroundVideo" src={require("../../assets/videos/backgroundVid.mp4")} autoPlay='true' preload="true" loop="true"></video>
            <div className="homePageContent">
              <h1 className="homePageTitle" >FLOWNTASY<span>_</span></h1>
              <h3>Whatever is on your mind, <i>just let it flow</i>. <br />There is always someone that'll love it on Flowntasy.<br /></h3>
              <h3><small>And when you're done creating, you can enjoy other people's flows.</small></h3>
              <Link to='/signin'><button className="loginButton">SIGNIN</button></Link>
              <Link to='/signup'><button className="registerButton">REGISTER</button></Link>
              <h2>NO MORE SUBREDDITS NEEDED!</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default (HomePage);