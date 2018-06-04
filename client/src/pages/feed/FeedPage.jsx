import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/

/*
Component styles
*/
import './FeedPage.css';

class feedPage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'You are currently not logged is' };
  }

  getUserStatusMessage = () => {
    if (localStorage.getItem('flowntasy_auth')) {
      this.setState({ message: JSON.parse(localStorage.getItem('flowntasy_auth'))['message'] });
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.getUserStatusMessage();
    }, 1)
  }


  render() {
    /* */
    /* */

    return (
      <div className="profile">
        <div className="feedProfile">
          <div className="feedImg">
            <div className="coverImg">
            </div>
            <div className="profileImg">
            </div>
          </div>
          <div className="profileStats"></div>
          <div className="profileStats"></div>
          <div className="profileStats"></div>
        </div>
        <div className="feedContent">
          <button className="feedButton">FEED</button>
          <button className="feedButton">FOLLOWING</button>
          <button className="feedButton">COMMUNITIES</button>
    
          <div className="posts">
            <div className="feedPost">
              <div className="feedPostDate">20 hours ago</div>
              <div className="feedPostBody">
                <div className="feedPostImage"></div>
                <div className="feedPostText">
                  <div className="feedPostTitle">A VERY NICE STORY</div>
                  <div className="feedPostUser">USERNAME</div>
                </div>
                <div className="feedPostIcons">
                  <div className="feedPostIcon">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>

                </div>


              </div>
            </div>
          </div>
          <div className="posts">
            <div className="feedPost">
              <div className="feedPostDate">20 hours ago</div>
              <div className="feedPostBody">
                <div className="feedPostImage"></div>
                <div className="feedPostText">
                  <div className="feedPostTitle">A VERY NICE STORY</div>
                  <div className="feedPostUser">USERNAME</div>
                </div>
                <div className="feedPostIcons">
                  <div className="feedPostIcon">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>

                </div>


              </div>
            </div>
          </div>
          <div className="posts">
            <div className="feedPost">
              <div className="feedPostDate">20 hours ago</div>
              <div className="feedPostBody">
                <div className="feedPostImage"></div>
                <div className="feedPostText">
                  <div className="feedPostTitle">A VERY NICE STORY</div>
                  <div className="feedPostUser">USERNAME</div>
                </div>
                <div className="feedPostIcons">
                  <div className="feedPostIcon">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>

                </div>


              </div>
            </div>
          </div>

          <div className="posts">
            <div className="feedPost">
              <div className="feedPostDate">20 hours ago</div>
              <div className="feedPostBody">
                <div className="feedPostImage"></div>
                <div className="feedPostText">
                  <div className="feedPostTitle">A VERY NICE STORY</div>
                  <div className="feedPostUser">USERNAME</div>
                </div>
                <div className="feedPostIcons">
                  <div className="feedPostIcon">
                    <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                  <i className="fas fa-bars" />hello
                </div>

                </div>


              </div>
            </div>
          </div>

          



          <h2>FEED</h2>
          <h2>FEED</h2> <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2> <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>
          <h2>FEED</h2>

          <div className="userStatusMessage"><h3>{this.state.message}</h3></div>
        </div>
      </div>
    )
  }
}

export default (feedPage);