import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { replace } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RenderField from '../RenderField';
import { submitSignIn } from '../../AC';

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
  return errors;
};

function SignIn(props) {
  const { handleSubmit, submitting, pristine, error, submitSucceeded, submitSignInAction } = props;
  return (
    <form onSubmit={handleSubmit(submitSignInAction)}>
      <div className="row justify-content-md-center">
        <div className="form-group col-12">
          <h1>Please sign in </h1>
        </div>
        <div className="form-group has-danger col-12">
          {error && <div className="alert alert-danger">{error}</div>}
          {
            submitSucceeded &&
            <div className="alert alert-success" role="alert">Ok!</div>
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
        </div>
        <button
          className="btn btn-lg btn-primary col-3"
          disabled={pristine || submitting}
          type="submit"
        >Sign in
        </button>
      </div>
    </form>
  );
}

SignIn.defaultProps = {
  error: undefined,
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  error: PropTypes.string,
  submitSignInAction: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
};

export default reduxForm({ form: 'signin', validate }, dispatch => ({
  redirect: () => dispatch(replace('/')),
}))(connect(null, { submitSignInAction: submitSignIn })(SignIn));
