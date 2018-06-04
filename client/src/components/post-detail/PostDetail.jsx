import React, { Component } from 'react';

/*
Material UI
*/

class PostDetail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      post: undefined
    }
  }

  componentDidMount() {
    fetch(`https://flowntasy.herokuapp.com/api/v1/backoffice/postsTable/${this.props.postId}`)
      .then( response => response.json())
      .then( item => this.setState({ post: item })); 
      console.log(this.props.postId);
  }

  render() {
    if(this.state.post) {
      return (
        <div>
          POST
        </div>
      );
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }   
  }
}

export default PostDetail;