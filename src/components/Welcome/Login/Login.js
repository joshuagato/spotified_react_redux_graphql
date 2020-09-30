import React, { Component } from 'react';
import './Login.scss';

import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { findDOMNode } from 'react-dom';

import FormControls from '../../FormControls/FormControls';
import * as actions from '../../../store/actions/index';

class Login extends Component {

  state = {
    visible: false
  }

  loginHandler = event => {
    event.preventDefault();

    const email = this.refs.eml.value;
    const password = this.refs.pwd.value;
    this.props.onAuth(email, password);
  }

  switchToReset = () => {
    this.props.history.replace('/reset-pw');
  };

  togglePasswordView = () => {
    const password = this.refs.pwd;
    
    if (this.state.visible) {
      password.setAttribute("type", "password");
      this.setState({ visible: false });
    } else {
      password.setAttribute("type", "text");
      this.setState({ visible: true });
    }
  }
  
  render() {
    let redirect = null;
    if (this.props.isAuthenticated) redirect = <Redirect to={this.props.authRedirectPath} />;
    
    return (
      <div className="login">
        { redirect }
        
        <h2>Login to your account</h2>
        <form onSubmit={this.loginHandler}>
          <p className="error-message">{this.props.error}</p>

          <FormControls ref="eml" id="eml" name="email" title="email" plcHolder="e.g joshuagato37@gmail.com" 
            type="email" changed={this.changeHandler} />
          
          <FormControls ref="pwd" id="pwd" name="password" title="password" plcHolder="Your password" 
            type="password" changed={this.changeHandler} />
          
          <button type="button" onClick={this.togglePasswordView}><FontAwesomeIcon icon={faEye} /></button>
          
          <button type="submit">Login</button>
        </form>
        <p onClick={this.props.switchForm}>Don't have an account yet? Register here!</p>
        <br />
        <p onClick={this.switchToReset} className="passwd-reset">Forgotten your password?? Click here to reset!!!</p>
      </div>
    );
  }
}

const mapStateToProps = state =>  {
  return {
    // errors: state.auth.error,
    error: state.auth.error,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));