/* import React, { Component } from 'react';
import PropTypes from 'prop-types';


import PropTypes from 'prop-types';

class LoadFile extends Component {
    constructor(props) {
      super(props);
  
      this.state = { selectedFile: null
  
      }
    }


fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
}

uploadHandler = () => { 
  console.log(this.state.selectedFile)
}

  
    render() {
      <form className={classes.rootForm} >
          <h4>DESIGN GUIDE</h4>
          <input type="file" name="DESIGN GUIDE"></input>
          <input type="submit"><button onClick={this.uploadHandler}></button></input>
        </form>
    }
};
    
    
export default (LoadFile); */