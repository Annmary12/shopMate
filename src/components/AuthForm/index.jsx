
import React, { Component } from 'react';

// third party libraries
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import FacebookLogin from 'react-facebook-login';

// components
import InputBox from '../InputBox';
import Button from '../Button';
import CheckBox from '../CheckBox';

// validation schema
import { SignUpSchema, LoginSchema } from '../../utils/validationSchemas/auth';

import { registerUser, login, loginWithFacebook } from 'store/modules/auth'

// style
import './AuthForm.scss';


export class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true
    }
  }

  /**
   *  Gets the submit button text
   *
   * @returns {string}
   */
  SubmitButtonText = () => {
    switch (this.props.formType) {
      case 'signup':
        return 'Sign Up';
      case 'login':
        return 'Sign In';
      case 'forgotPassword':
        return 'Send Password Reset Link';
      default:
        return 'Sign Up';
    }
  }

  /**
   * Checks if is a signup form
   *
   * @returns {boolean}
   */
  isSignUp = () => this.props.formType === 'signup';

  /**
   * Checks if is a login form
   *
   * @returns {boolean}
   */
  isLogin = () => this.props.formType === 'login';

  /**
   * checks if is a password reset form
   *
   * @returns {boolean}
   */
  isPasswordReset = () => (this.props.formType === 'forgotPassword');

  responseFacebook = (response) => {
    if (response.accessToken) {
      this.props.loginWithFacebook(response.accessToken, this.props.closeModal);
    }
  }

  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit,
      formType
    } = this.props;

    return (
      <div className="auth-form">
        { this.props.hasError &&
          <div className="error-message">
              {this.props.hasError}
          </div>
        }
        <h1>{ formType == 'login' ? 'Sign In' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="form">
          {
            this.isSignUp() &&
            <InputBox
              type="text"
              name="name"
              placeholder="Name"
              inputType="blocked"
              {...this.props}
            />
          }
          <InputBox
            type="email"
            name="email"
            placeholder="Email"
            inputType="blocked"
            {...this.props}
          />

          <InputBox
            type="password"
            name="password"
            inputType="blocked"
            placeholder="Password"
            {...this.props}
          />

          {
            this.isLogin() &&
            <div className="remember-me mbxs">
              <CheckBox
                name="rememberMe"
                {...this.props}
              /> <label htmlFor="remember">Remember</label>
            </div>
          }
          <Button
            classes="btn__primary"
            type="submit"
            size="medium"
            name={isSubmitting ? 'loading..' : this.SubmitButtonText()}
            disabled={isSubmitting}
          />
          {
            this.isLogin() &&
              <div className="facebook-login">
                <span>or</span>
                <FacebookLogin
                  appId="352854622106208"
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  icon="fa-facebook"
                />
              </div>
         }

          {
            this.isLogin() &&
            <div className="footer">
              <label htmlFor="forgotPassword">Forgot password</label>
              <label htmlFor="account" onClick={this.props.onChangeFormState('isRegister')}>Have an account</label>
            </div>
          }

          {
            this.isSignUp() && 
            <div className="signup-footer">
              <p>
                Already a member? <span onClick={this.props.onChangeFormState('isLogin')}>Sign in</span>
              </p>
            </div>
          }
        </form>

      </div>
    );
  }
}

const MyEnhancedAuthForm  = {
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    rememberMe: ''
  }),

  validationSchema: props => props.formType === 'signup' ? SignUpSchema : LoginSchema,

  handleSubmit: (values, { setSubmitting, props }) => {
     props.formType === 'signup'
      ? props.registerUser(values, props.closeModal)
      : props.login(values,  props.closeModal);
      setSubmitting(false);
  },
}

AuthForm.propTypes = {
  formType: PropTypes.string,
  values: PropTypes.objectOf(PropTypes.string),
  touched: PropTypes.objectOf(PropTypes.bool),
  errors: PropTypes.objectOf(PropTypes.string),
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeFormState: PropTypes.func
};

AuthForm.defaultProps = {
  formType: '',
  values: {},
  touched: {},
  errors: {},
  isSubmitting: false
};

export const mapStateToProps = state => {
  return {
    hasError: state.auth.error,
    isLoading: state.auth.isLoading,
    authUser: state.auth.data
  }
};

export const mapDispatchToProps = dispatch => ({
  registerUser: (userDetails, closeModal) => dispatch(registerUser(userDetails, closeModal)),
  login: (userDetails, closeModal) => dispatch(login(userDetails, closeModal)),
  loginWithFacebook: (accessToken, closeModal) => dispatch(loginWithFacebook(accessToken, closeModal)),
})

export default withRouter(compose(connect(mapStateToProps, mapDispatchToProps), withFormik(MyEnhancedAuthForm))(AuthForm));