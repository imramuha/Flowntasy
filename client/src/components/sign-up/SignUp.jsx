import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Field, reduxForm } from 'redux-form';

/*
State management
*/
import { connect } from 'react-redux';
// import { signUp } from '../../actions/signupActions';
import { signUpActionLocalStrategy } from '../../actions/signupActions';
import { authStatusClear } from '../../actions/authActions';
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
Style
*/
import './SignUp.css';
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
    'username',
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

class SignUp extends Component {
  constructor() {
    super();
    this.state = {message: ''};
  }

  // on submit we also check our localstorage for errors -> if an error is found we change our message state
  submit = (values) => {
    this.props.signUp(values, this.props.history);
    this.setState({message: getError()});
    authStatusClear();
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
/*
  componentDidMount = () => {
    this.fetchUserCreateGet();
  }

  fetchUserCreateGet = () => {
    fetch('/api/v1/signup/create', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json())
  }
*/
/*
  facebookResponse = (response) => {
    this.props.signUpFacebook(response.accessToken, this.props.history);
  };*/

  render() {
    const { handleSubmit } = this.props;
    return (
        <div class="wrap">          
          <div class="content-left">
            <div class="content-info">
              <h2>FLOWNTASY</h2>            
              <h3>Just let it flow &#128394;</h3>
              <p>Everything you think turns into an on-the-go experience. The <i>flowntasy</i> is a one-of-a-kind adventure in creation and discovery.</p>                
              <h3>Sign Up with</h3>
              <div class="socialLinks">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-whatsapp"></i></a>
                <a href="#"><i class="fab fa-reddit-alien"></i></a>
                <a href="#"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                <a href="#"><i class="fab fa-dribbble" aria-hidden="true"></i></a>
              </div>
                <p>Already have an account?  <a href="#"> Sign In</a></p>
            </div>
          </div>

          <div class="content-main">
            <div class="inputSide">
              <h2>The current is waiting for you</h2>

              <form onSubmit={ handleSubmit(this.submit) } className="formSign">

                <Field name="email" component={TextField} type="email" placeholder="Email" fullWidth={true} className="inputField"> </Field>
                <Field name="username" component={TextField}  type="username"  placeholder="Username" fullWidth={true}  className="inputField"></Field>
                <Field name="password" component={TextField} type="password" placeholder="Password" fullWidth={true} className="inputField"></Field>
                <div className="errorMessage"><h3>{this.state.message}</h3></div>
                <input className="submitButton" onClick={getError} type="submit" variant="raised" color="primary" fullWidth={true} value="join"></input>

              </form>
              <div className="row">
                <div className="col-12">
                  {this.errorMessage()}
                </div>
              </div>
            </div>
          </div>          
        </div>
    );  
  }
}

SignUp.propTypes = {
  userCreationError: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    userCreationError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (values, history) => dispatch(signUpActionLocalStrategy(values, history)),
  };
};

const reduxFormSignUp = reduxForm({
  form: 'signUp',
  validate
})(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignUp);