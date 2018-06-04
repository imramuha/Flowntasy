import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import CommunitiesList from '../../components/communities-list/CommunitiesList';

/*
Component styles
*/
import './CommunitiesPage.css';

class CommunitiesPage extends Component {


  render() {
    return (
      <div>

              <CommunitiesList />

      </div>
    )
  }
}

export default (CommunitiesPage);