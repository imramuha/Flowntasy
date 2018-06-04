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
import Backoffice from '../../components/backoffice/Backoffice';
import './BackofficePage.css';

class BackofficePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h2 className='backofficeHeading backofficePage'>BACKOFFICE</h2>
        <Backoffice />
      </div>
    )
  }
}

export default (BackofficePage);