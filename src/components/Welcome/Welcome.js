import React, { Component } from 'react';
import './Welcome.scss';
import Login from './Login/Login';
import Register from './Register/Register';

class Welcome extends Component {

  state = {
    registered: true
  }

  formSwitchHandler = () => {
    this.setState((prevState) => {
        return { registered: !prevState.registered };
    });
  }

  render() {
    let form = this.state.registered ? <Login switchForm={this.formSwitchHandler} /> : <Register switchForm={this.formSwitchHandler} />

    return (
      <div className="welcome">
        { form }
      </div>
    );
  }
}

export default Welcome;
