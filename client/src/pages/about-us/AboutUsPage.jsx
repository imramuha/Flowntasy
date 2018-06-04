import React, { Component } from 'react';

/*
* Libraries
*/
import { HashLink as Link } from 'react-router-hash-link';

/*
Component styles
*/
import './AboutUsPage.css';

class AboutUsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="aboutUsPage">

      {/* Header */}
        <div className="aboutHeaderContainer">
          <div className="aboutHeaderText aboutContainer">
            <h1>FLOWNTASY<span>_</span></h1>
            <h3> <i>JUST LET IT FLOW</i> </h3>
            <Link className="joinUs" smooth to="#aboutIntroContainer">Find Out More</Link>
          </div>
        </div>

      {/* intro */}
      
        <div className="aboutIntroContainer"  id="aboutIntroContainer">
          <div className="aboutIntroText aboutContainer">
            <h2>WELCOME TO THE FLOWNTASYLAND</h2>
            <h3> It is nice seeing a community where million of people and thousands of interests collide in a beautiful flow of thoughts,
            conversations, reading and writing culture. With communities on rise, you don't just read or write stories on our platform,
            you're a part of the flow. From manga to poetries and stories to <i>recipes(not really but it sounded cool)</i>, if you can imagine it, it's probably flowing on this platform right now. </h3>
          </div>
        </div>
       

      {/* Services */}
      <div className="aboutServicesContainer" id="aboutServicesContainer">
        <div className="aboutServicesText">
        <div>
            <h3><i>SERVICES</i></h3>
            <h1> What We Offer</h1>
        </div>

          <div className="aboutServicesBoxes">

            <div className="aboutServicesBox">
              <span className="aboutServicesBoxIcon">
                <i className="fas fa-mobile-alt" />
              </span>
              <h2><strong>APPLICATION</strong></h2>
              <h4>Easy to use hybrid application for different platforms to fulfill desires, everywhere and anytime.</h4>
            </div>
            <div className="aboutServicesBox">
              <span className="aboutServicesBoxIcon">
                <i className="fab fa-pagelines" />
              </span>
              <h2><strong>COMMUNITY</strong></h2>
              <h4>A powerful community to connect with people from around the world, waiting to be devoured by your flow, or discover the flow of others.</h4>
            </div><div className="aboutServicesBox">
              <span className="aboutServicesBoxIcon">
                <i className="fas fa-eye" />
              </span>
              <h2><strong>PRIVACY & SECURITY</strong></h2>
              <h4>Protect your security from the evil lurking beneath the internet and keep the watchers at bay to maintain your privacy.</h4>
            </div><div className="aboutServicesBox">
              <span className="aboutServicesBoxIcon">
                <i className="fas fa-anchor" />
              </span>
              <h2><strong>HOME</strong></h2>
              <h4>A place to settle and free your mind, AKA:<br /> <i>A current to join and flow your mind.</i></h4>
            </div>
          </div>
        </div>  
      </div>





      {/* about */}
      <div className="aboutAboutContainer">
        <div className="filter"></div>
        <div className="aboutAboutText aboutContainer">
          <h2>Storytelling Redefined</h2>
          <h4>Everything you think turns into an on-the-go experience. The flowntasy is a one-of-a-kind adventure in creation and discovery.
           <br /> Today, the global Flowntasy community is made up of more than 10 thousand people. We might be based Ghent, Belgium, but Flowntasy has no bonderies when it comes to borders, interests, and language.</h4>
        </div>
      </div>


      <div className="aboutProjectsContainer">
        <div className="aboutProjectsText">
            <h3>Posts</h3>
            <h2>Recent stories</h2>  
        </div>
      </div>
  
      <div className="aboutContactContainer">
        <div className="aboutContactText">
        <div className="aboutContactBox a">
          <h2>CONTACT</h2>
          <h4>&#x2302; <strong>ADRES</strong> <span> Gezondheidstraat 248, 9000 Ghent</span> </h4>
          <h4>&#9742; <strong>PHONE</strong> <span> 09 245 55 65 55 </span></h4>
          <h4>&#9993; <strong>EMAIL</strong> <span>flowntasy@business.com</span> </h4>
        </div>
        <div className="aboutContactBox b">
        <h2>UI STYLE GUIDE</h2>
        <h4>For people that would like to know our styles</h4>
        <div className="downloadButton">
          <Link className="joinUs" to="#download">Download .PDF</Link>
          </div>
        </div>
        </div>
      </div>
    
      <div className="aboutFooterContainer">
        <div className="aboutFooterText aboutContainer">
          <ul>
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
              <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li >
              <a href="#">
              <i className="fab fa-reddit-alien"></i>
              </a>
            </li>
          </ul>
          <p className="text-muted small mb-0">Copyright © Flowntasy 2018</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <a className="scroll-to-top rounded js-scroll-trigger" href="#page-top">
        <i className="fa fa-angle-up" />
    </a>
    </div>
    )
  }
}


export default (AboutUsPage);