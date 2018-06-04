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


  render() {
    return (
      <div className="container">
        <h2 className='backofficeHeading backofficePage'>BACKOFFICE</h2>
        <Backoffice />
        {/* <LoadFile /> */}
      </div>
    )
  }
}

export default (BackofficePage);