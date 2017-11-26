import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addPostAction as addPostActionSubmit } from '../../AC';
import RenderField from '../RenderField';


const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length < 10) {
    errors.title = 'Must be 10 characters or more';
  }
  if (!values.subject) {
    errors.subject = 'Required';
  } else if (values.subject.length < 50) {
    errors.subject = 'Must be 50 characters or more';
  }
  return errors;
};
const formName = 'addPost';

class AddPost extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    error: PropTypes.string,
    addPostAction: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    uid: PropTypes.string,
  }

  static defaultProps = {
    error: undefined,
    uid: '',
  };

  render() {
    const {
      handleSubmit,
      addPostAction,
      submitting,
      pristine,
      error,
      submitSucceeded,
      uid,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(values => addPostAction({ ...values, form: formName, uid }))}>
        <div className="row justify-content-md-center">
          {
            submitSucceeded &&
            <div className="alert alert-success" role="alert">
              Ok!
            </div>
          }
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group has-danger col-12">
            <Field
              className="form-control"
              name="title"
              label="Title"
              component={RenderField}
              type="text"
              id="title-field"
            />
            <Field
              className="form-control"
              name="subject"
              label="Subject"
              component={RenderField}
              textarea
              rows="6"
              id="subject-field"
            />
          </div>
          <button
            className="btn btn-lg btn-primary col-3"
            disabled={pristine || submitting}
            type="submit"
          >Send
          </button>
        </div>
      </form>
    );
  }
}

const formConnect = reduxForm({ form: formName, validate })(AddPost);
const reduxConnect = connect(({ auth }) => {
  const uid = auth.get('userInfo').uid;
  return { uid };
}, { addPostAction: addPostActionSubmit })(formConnect);

export default reduxConnect;
