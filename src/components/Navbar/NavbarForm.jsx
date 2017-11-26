import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitSignOut, changeUserState } from '../../AC';

class NavbarForm extends Component {
  static defaultProps = {
    error: undefined,
    uid: '',
    email: '',
  };

  static propTypes= {
    changeUserState: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    submitSignOutAction: PropTypes.func.isRequired,
    uid: PropTypes.string,
    email: PropTypes.string,
  }

  componentDidMount() {
    this.props.changeUserState();
  }

  getLogoutButton = () => {
    const {
      submitting,
      uid,
      email,
    } = this.props;
    if (!uid) return null;
    return (
      <div>
        <span className="mr-2 text-primary">{email}</span>
        <button
          className="btn btn-danger"
          disabled={submitting}
          type="submit"
        >LogOut
        </button>
      </div>
    );
  }

  render() {
    const {
      error,
      submitSignOutAction,
      handleSubmit,
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(submitSignOutAction)}>
          {error && <div className="alert alert-danger">{error}</div>}
          {this.getLogoutButton()}
        </form>
      </div>
    );
  }
}

export default connect(null, { submitSignOutAction: submitSignOut, changeUserState })(reduxForm({ form: 'signout' })(NavbarForm));
