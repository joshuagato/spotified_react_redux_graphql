import React, { Component } from 'react';
import './Settings.scss';

import  { withRouter } from 'react-router-dom';

class Settings extends Component {

  loadUpdateDetailsPage = () => {
    this.props.history.push('/music-home?update-details');
  }

  logoutHandler = () => {
    this.props.history.replace('/logout');
  }

  render() {
    return (
      <div className="settings">
          <p className="name">{this.props.name.firstname + ' ' + this.props.name.lastname}</p>
          <section className="buttons">
            <button onClick={this.loadUpdateDetailsPage}>USER DETAILS</button>
            <button onClick={this.logoutHandler}>LOGOUT</button>
          </section>
      </div>
    );
  }
}

export default withRouter(Settings);
