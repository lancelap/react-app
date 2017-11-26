import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RenderField from '../RenderField';
import { submit as submitAction } from '../../AC';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more';
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Required';
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'You entered two different passwords. Please try again.';
  }
  return errors;
};

class SignUp extends Component {
  static defaultProps = {
    error: '',
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    error: PropTypes.string,
    submit: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
  };

  render() {
    const { handleSubmit, submitting, pristine, error, submitSucceeded, submit } = this.props;

    return (
      <form className="" onSubmit={handleSubmit(submit)}>
        <div className="row justify-content-md-center">
          <div className="form-group col-12">
            <h1>Please sign up </h1>
          </div>
          <div className="form-group has-danger col-12">
            {error && <div className="alert alert-danger">{error}</div>}
            {
              submitSucceeded &&
              <div className="alert alert-success" role="alert">
                SignUp
              </div>
            }
            <Field
              className="form-control"
              name="email"
              label="Email"
              component={RenderField}
              type="text"
              id="email-field"
            />
            <Field
              className="form-control"
              name="password"
              label="Password"
              component={RenderField}
              type="password"
              id="password-field"
            />
            <Field
              className="form-control"
              name="passwordConfirmation"
              label="Password Confirmation"
              component={RenderField}
              type="password"
              id="password-confirmation"
            />
          </div>
          <button
            className="btn btn-lg btn-primary col-3"
            disabled={pristine || submitting}
            type="submit"
          >Sign up
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: 'signup', validate })(connect((state) => {
  const { auth } = state;
  return { auth };
}, { submit: submitAction })(SignUp));
