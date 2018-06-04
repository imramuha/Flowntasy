import React, { Component } from 'react';

/*
Libraries
*/
import queryString from 'query-string';

/*
Material UI
*/


/*
Components
*/
import CommunityForm from '../../components/community-form/CommunityForm';
import Header from '../../components/header/Header';

/*
Component styles
*/
import './CommunityCreatePage.css';

class CommunityCreatePage extends Component {
  constructor(props) {
    super(props);

    const parsed = queryString.parse(this.props.location.search);
    const id = parsed.id;

    this.state = {
      boSelectedCommunityId:  id
    }
  }

  render() {
    return (
      <div className="backgroundCreateForm">
        <Header />
              <CommunityForm communityId={ this.state.boSelectedCommunityId } />
      </div>
    )
  }
}

export default (CommunityCreatePage);