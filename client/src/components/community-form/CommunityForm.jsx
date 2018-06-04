import React, { Component } from 'react';
import PropTypes from 'prop-types';



/*
Libraries
*/
import { Field, reduxForm, FieldArray } from 'redux-form';

/*
State management
*/
import { connect } from 'react-redux';
import { createCommunity } from '../../actions/communityActions';

/*
Material UI
*/
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form'
import {
  Checkbox,
  RadioGroup,
  TextField,
  SelectField,
  Select,
  Switch,
} from 'redux-form-material-ui'

/*
Styles
*/
import './CommunityForm.css';

/*
Configuration
*/
import config from '../../config';

/*
Validation
*/
const validate = values => {
  const errors = {}
  const requiredFields = [
    'community',
    'description',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}


class CommunityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  submit = (values) => {

    this.props.createCommunity(values, this.props.history);
  }

  componentDidMount = () => {
    this.fetchCommunityCreateGet();
  }

  fetchCommunityCreateGet = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/community/create-community', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(results =>
        this.setState({
          categories: results.categories
        })
      );
  }

  fetchCommunityUpdateGet = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/community/create-community', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(community =>
        this.setState({
          categories: community.categories
        })
      );
  }



  getCategoriesAsJSX = () => {
    let categoryElements = '';
    if (this.state.categories) {
      categoryElements = this.state.categories.map(
        (element) => {
          return (
            <option value={element._id}>{element.category}</option>
          );
        }
      )
    };
    return categoryElements;
  }

  errorMessage() {
    if (this.props.error) {
      return (
        <div className="info-red">
          {this.props.error.message}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="createFormContainer">
        <div className="createFormHeading">
          <h1>CREATE A PLACE TO CALL HOME<span>_</span></h1>
        </div>
        <div className="createForm">
          <form onSubmit={handleSubmit(this.submit)}>

            <Field name="community"
              label="COMMUNITY"
              component={TextField}
              fullWidth={true}
              className="inputFields"
            />


            <Field name="description"
              label="DESCRIPTION"
              component={TextField}
              fullWidth={true}
              multiline={true}
              rows={2}
              rowsMax={4}
              className="inputFields"
            />

            <label for="CATEGORY">CATEGORY</label>
            <Field label="CATEGORY" className="inputFields" component="select" name='categories' placeholder="Select a category" >
              <option disabled selected > CATEGORY </option>
              {this.getCategoriesAsJSX()}
            </Field>


            <Button className="submitButton" type="submit" variant="raised" fullWidth={true}>
              FLOW
              </Button>

          </form>

          <div>
            {this.errorMessage()}

          </div>
        </div>
      </div>


    );
  }
}

CommunityForm.propTypes = {
  communityCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    communityCreationError: state.community.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCommunity: (values, history) => dispatch(createCommunity(values, history)),
  };
};

const reduxFormCommunityForm = reduxForm({
  form: 'communityCreate', // //////////////////////
  validate
})(CommunityForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormCommunityForm);