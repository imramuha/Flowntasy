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
import CategoriesTable from '../../components/categories-table/CategoriesTable';

/*
Component styles

import './PostsTablePage.css';*/

class CategoriesTablePage extends Component {
  render() {
    return (
      <div>
        <CategoriesTable />
      </div>
    )
  }
}

export default (CategoriesTablePage);