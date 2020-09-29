import React, { Component } from 'react';
import './UpdateDetails.scss';
import { connect } from 'react-redux';

import Form from './Form/Form';
import Input from './Input/Input';
import * as actions from '../../../../store/actions/index';

export class UpdateDetails extends Component {

  state = {
    detailForm: {
      id: this.props.userId,
      firstname: this.props.userData.firstname,
      lastname: this.props.userData.lastname,
      email: this.props.userData.email
    },        
    passwordForm: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  detailsChangeInputHandler = event => {
    const updatedState = { ...this.state.detailForm };
    updatedState[event.target.name] = event.target.value
    
    this.setState({ detailForm: updatedState });
  };
  pwdChangeInputHandler = event => {
    const updatedState = { ...this.state.passwordForm };
    updatedState[event.target.name] = event.target.value;

    this.setState({ passwordForm: updatedState });
  };
    

  detailsChangeHandler = event => {
    event.preventDefault();

    this.props.onUpdateDetails(this.state.detailForm, this.props.token);
  }
  passwordUpdateHandler = event => {
    event.preventDefault();
    
    this.props.onUpdatePassword(this.state.passwordForm, this.props.token);
  };

  // WE GOTTA TO FIX THIS BUF OF NOT UPDATING IN REALTIME || WE'VE FIXED IT NOW
  componentDidMount() {
    this.props.onFetchUserDetails(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData.firstname !== this.props.userData.firstname || 
      prevProps.userData.lastname !== this.props.userData.lastname ||
      prevProps.userData.email !== this.props.userData.email) {
      
      this.props.onFetchUserDetails(this.props.userId);
    }
  }

  render() {
    return (
      <div className="update-details-container">
        <Form name="details" pholder="Email address" btnName="save" submitted={this.detailsChangeHandler}>
          <Input type="text" pholder="First name" changed={this.detailsChangeInputHandler} 
            value={this.state.detailForm.firstname} name="firstname" />
          
          <Input type="text" pholder="Last name" changed={this.detailsChangeInputHandler} 
            value={this.state.detailForm.lastname} name="lastname" />

          <Input type="email" pholder="Email address" changed={this.detailsChangeInputHandler} 
            value={this.state.detailForm.email} name="email" />
        </Form>

        <Form name="password" pholder="Current Password" btnName="save" submitted={this.passwordUpdateHandler}>
          <Input type="password" pholder="Current Password" changed={this.pwdChangeInputHandler} 
            value={this.state.passwordForm.currentPassword} name="currentPassword" />

          <Input type="password" pholder="New Password" changed={(event) => this.pwdChangeInputHandler(event)} 
            value={this.state.passwordForm.newPassword} name="newPassword" />

          <Input type="password" pholder="Confirm New Password" changed={(event) => this.pwdChangeInputHandler(event)}
            value={this.state.passwordForm.confirmPassword} name="confirmPassword" />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    userData: state.userDet.userDataForAll
      // userData: state.userDet.userDataForUpdateDetail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePassword: (inputData, token) => dispatch(actions.updatePassword(inputData, token)),
    onUpdateDetails: (inputData, token) => dispatch(actions.updateDetails(inputData, token)),
    onFetchUserDetails: userId => dispatch(actions.fetchUserForUpdateDetails(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDetails);
