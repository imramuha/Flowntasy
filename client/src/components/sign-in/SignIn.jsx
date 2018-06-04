import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Field, reduxForm } from 'redux-form';
import FacebookLogin from 'react-facebook-login';

/*
State management
*/
import { connect } from 'react-redux';
import { signInActionFacebookStrategy, signInActionLocalStrategy, authStatusClear } from '../../actions/authActions';
import { getError } from '../../actions/authActions';
/*
Material UI
*/
import Button from 'material-ui/Button';
import {
  Checkbox,
  RadioGroup,
  Select,
  TextField,
  Switch,
} from 'redux-form-material-ui'

/*
Component styles
*/
import './SignIn.scss';
import './SignIn.css';

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
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

class SignIn extends Component {
  constructor() {
    super();
    this.state = {message: ''};
  }

  // on submit we also check our localstorage for errors -> if an error is found we change our message state
  submit = (values) => {
    this.props.signIn(values, this.props.history);
    authStatusClear();
    setTimeout(() => {
      this.setState({message: getError()});
    }, 2000);
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

  facebookResponse = (response) => {
    this.props.signInFacebook(response.accessToken, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div  className="wrap">          
        <div  className="content-left">
          <div  className="content-info">
            <h2>Changes in the current</h2>            
            <h3>Communities are here</h3>
            <p>You can now join create, join or visit communities. Communities makes it possible to connect with people from around the world and share your experiences.</p>                
            <h3>Sign In with</h3>
            <div  className="socialLinks">
              <a appId={config.FACEBOOK_APP_ID} autoLoad={false} fields="name,email,picture" callback={this.facebookResponse}><i  className="fab fa-facebook-f"></i></a>
              <a href="#"><i  className="fab fa-twitter"></i></a>
              <a href="#"><i  className="fab fa-whatsapp"></i></a>
              <a href="#"><i  className="fab fa-reddit-alien"></i></a>
              <a href="#"><i  className="fab fa-instagram" aria-hidden="true"></i></a>
              <a href="#"><i  className="fab fa-dribbble" aria-hidden="true"></i></a>
            </div>
              <p>Don't have an account? <a href="#"> Sign Up</a></p>
          </div>
        </div>
        <div  className="content-main">
          <div  className="inputSide">
            <h2>We have been waiting for you</h2>

            <form onSubmit={ handleSubmit(this.submit)} className="formSign" >

              <Field name="email" component={TextField} type="email" placeholder="Email" fullWidth={true} className="inputField"> </Field>
              <Field name="password" component={TextField} type="password" placeholder="Password" fullWidth={true} className="inputField"></Field>
              <div className="errorMessage"><h3>{this.state.message}</h3></div>
              <input className="submitButtonSignIn" type="submit" variant="raised" color="primary" fullWidth={true} value="sign in"></input>

            </form>
            <div className="row">
              <div className="col-12">
                {this.errorMessage}
            </div>
          </div>
        </div>        
      </div>          
    </div>
    );  
  }
}

SignIn.propTypes = {
  authError: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (values, history) => dispatch(signInActionLocalStrategy(values, history)),
    signInFacebook: (accessToken, history) => dispatch(signInActionFacebookStrategy(accessToken, history)),
  };
};

const reduxFormSignIn = reduxForm({
  form: 'signIn',
  validate
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignIn);