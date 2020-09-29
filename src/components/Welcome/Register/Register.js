import React, { Component } from 'react';
import './Register.scss';
import { connect } from 'react-redux';

import FormControls from '../../FormControls/FormControls';
import * as actions from '../../../store/actions/index';
// import { registerUser } from '../../../store/actions/index';

class Register extends Component {
  state = {
    userInput: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  };

  registerHandler = event => {
    event.preventDefault();

    const firstname = this.refs.fn.value;
    const lastname = this.refs.ln.value;
    const email1 = this.refs.eml1.value;
    // const email2 = this.refs.eml2.value;
    const password1 = this.refs.pwd1.value;
    // const password2 = this.refs.pwd2.value;  //I shall use these for validation
    
    const userInput = {
      firstname: firstname,
      lastname: lastname,
      email: email1,
      password: password1
    };

    this.props.onRegister(userInput);
  }

  render() {
    return (
      <div className="register">
        <h2>Create your your account</h2>
        <form onSubmit={this.registerHandler}>
          <FormControls ref="fn" id="fname" name="firstname" title="First Name" 
            plcHolder="e.g Joshua" changed={this.changeHandler} />

          <FormControls ref="ln" id="lname" name="lastname" title="Last Name" 
            plcHolder="e.g Gato" changed={this.changeHandler} />
          
          <FormControls ref="eml1" id="email" name="email" title="Email" 
            plcHolder="e.g joshuagato37@gmail.com" changed={this.changeHandler} />

          <FormControls ref="eml2" id="email2" name="email" title="Confirm Email" 
            plcHolder="e.g joshuagato37@gmail.com" changed={this.changeHandler} />

          <FormControls ref="pwd1" id="pwd1" name="password" title="Password" 
            plcHolder="e.g Your password" changed={this.changeHandler} />

          <FormControls ref="pwd2" id="pwd2" name="password" title="Confirm Password" 
            plcHolder="e.g Your password Confirmation" changed={this.changeHandler} />

          <button type="submit">Register</button>
        </form>
        <p onClick={this.props.switchForm}>Already have an account? Log in here!!</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.regis.details,
    errors: state.regis.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: userInput => dispatch(actions.registerUser(userInput))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);