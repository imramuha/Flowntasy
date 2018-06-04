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
import { createPost } from '../../actions/postActions';

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
import './PostForm.css';

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
    'title',
    'description',
    'body',
    'categories',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  return errors;
}


class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  submit = (values) => {

    this.props.createPost(values, this.props.history);
  }

  componentDidMount = () => {
    this.fetchPostCreateGet();
  }

  fetchPostCreateGet = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/discover/create-post', {
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

  fetchPostUpdateGet = () => {
    fetch('https://flowntasy.herokuapp.com/api/v1/discover/create-post', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(post =>
        this.setState({
          categories: post.categories
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
          <h1>POST YOUR FLOW<span>_</span></h1>
        </div>
        <div className="createForm">
          <form onSubmit={handleSubmit(this.submit)}>

            <Field name="title"
              label="TITLE"
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


            <Field name="body"
              label="BODY"
              component={TextField}
              type="text"
              multiline={true}
              fullWidth={true}
              rows={3}
              rowsMax={6}
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

PostForm.propTypes = {
  postCreationError: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    postCreationError: state.post.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (values, history) => dispatch(createPost(values, history)),
  };
};

const reduxFormPostForm = reduxForm({
  form: 'postCreate', // //////////////////////
  validate
})(PostForm);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormPostForm);