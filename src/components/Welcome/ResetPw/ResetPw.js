import React, { Component } from 'react';
import './ResetPw.scss';
import axios from 'axios';

import EnterEmail from './EnterEmail/EnterEmail';
import EnterPassword from './EnterPassword/EnterPassword';

class ResetPw extends Component {

  state = {
    email: '',
    pwdInput: {
      token: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    message: '',
    done: false,
    // error: '',
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ done: true, pwdInput: { ...this.state.pwdInput, token: this.props.match.params.id } });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email ||
      prevState.pwdInput.token !== this.state.pwdInput.token ||
      prevState.pwdInput.newPassword !== this.state.pwdInput.newPassword ||
      prevState.pwdInput.confirmNewPassword !== this.state.pwdInput.confirmNewPassword)
    {
      this.setState({ email: this.state.email, pwdInput: { ...this.state.pwdInput } })
    }
  }

  emailInputChangedHandler = event => {
      this.setState({ email: event.target.value });
  }
  passwordChangeHandler = event => {
      this.setState({ pwdInput: { ...this.state.pwdInput, [event.target.name]: event.target.value } });
  };

  sendResetToken = event => {
    event.preventDefault();

    const email = this.state.email;

    const graphqlQuery = {
      query: `
        mutation ResetRequest($email: String!) {
            passwordResetRequest(userEmail: $email)
        }
      `,
      variables: { email: email }
    };

    axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery)
    .then(response => {
      // console.log(response.data);
      // const message = 'Reset link sent to your email. Please click on it to reset your password.';
      this.setState({ email: '', message: response.data.errors[0].message });
    })
    .catch(error => {
      this.setState({ message: error.response.data.errors[0].message });
    });
  };
  resetPassword = event => {
    event.preventDefault();
    const state = this.state.pwdInput;

    const graphqlQuery = {
      query: `
        mutation ExecuteResetRequest($token: String!, $newPassword: String!, $confirmPassword: String!) {
          passwordResetExecute(pwdInput: { token: $token, newPassword: $newPassword, confirmNewPassword: $confirmPassword })
        }
      `,
      variables: { token: state.token, newPassword: state.newPassword, confirmPassword: state.confirmNewPassword }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery)
    .then(response => {
      // console.log(response.data);
      this.setState({ pwdInput: { ...this.state.pwdInput, token: '', newPassword: '', confirmNewPassword: '' } })
    })
    .catch(error => {
      // console.log(error.response);
      this.setState({ message: error.response.data.errors[0].message });
    });
  };

  render() {
    return (
      <div className="reset-pw">
        { this.state.done ? 
          <EnterPassword submitted={this.resetPassword} 
            changed={this.passwordChangeHandler} value={this.state.pwdInput} /> : 
          <EnterEmail submitted={this.sendResetToken} message={this.state.message}
            changed={this.emailInputChangedHandler} value={this.state.email} /> 
        }
      </div>
    );
  }
}

export default ResetPw;
