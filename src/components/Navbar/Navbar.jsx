import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavbarForm from './NavbarForm';

function Navbar(props) {
  const { uid, email, loaded } = props;
  return (
    <div className="container">
      <div className="row">
        <ul className="nav nav-pills col">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addpost">Add post</NavLink>
          </li>
        </ul>
        {!uid && loaded &&
        <ul className="nav nav-pills col justify-content-end">
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">SignUp</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signin">SignIn</NavLink>
          </li>
        </ul>
        }
        <NavbarForm uid={uid} email={email} />
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  uid: '',
  email: '',
};

Navbar.propTypes = {
  loaded: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  email: PropTypes.string,
};

export default connect((state) => {
  const { auth } = state;
  return { uid: auth.userInfo.uid, email: auth.userInfo.email, loaded: auth.loaded };
}, null, null, { pure: false })(Navbar);
