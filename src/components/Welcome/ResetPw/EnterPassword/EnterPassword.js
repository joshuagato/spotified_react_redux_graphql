import React from 'react';
import './EnterPassword.scss';
import FormControls from '../../../FormControls/FormControls';

const EnterPassword = props => (
  <div className="enter-password">
    <h2>Reset your password here.</h2>

    <form onSubmit={props.submitted}>
      <FormControls id="pwd" type="password" title="Enter Password" plcHolder="Your New Password" 
        value={props.value.newPassword} name="newPassword" changed={props.changed} />
      <FormControls id="pwd2" type="password" title="Confirm Password" plcHolder="Confirm New Password" 
        value={props.value.confirmNewPassword} name="confirmNewPassword" changed={props.changed} />

      <button type="submit">RESET PASSWORD</button>
    </form>
  </div>
);

export default EnterPassword;
