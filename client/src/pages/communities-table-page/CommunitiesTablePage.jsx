import React, { Component } from 'react';

/*
Libraries
*/


/*
Material UI
*/


/*
Components
*/
import CommunitiesTable from '../../components/communities-table/CommunitiesTable';

/*
Component styles

import './PostsTablePage.css';*/

class CommunitiesTablePage extends Component {
  render() {
    return (
      <div>

              <CommunitiesTable />

      </div>
    )
  }
}

export default (CommunitiesTablePage);