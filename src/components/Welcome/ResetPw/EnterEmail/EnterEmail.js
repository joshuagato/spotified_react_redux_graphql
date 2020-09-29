import React from 'react';
import './EnterEmail.scss';
import FormControls from '../../../FormControls/FormControls';

const EnterEmail = props => {
  return (
    <div className="enter-email">
      <h2>Enter your email here.</h2>
      <p className="error-message">{props.message}</p>
      <form onSubmit={props.submitted}>
        <FormControls id="eml" type="email" title="email" plcHolder="e.g joshuagato37@gmail.com" 
          value={props.value} changed={props.changed} />
        
        <button type="submit">SEND RESET LINK</button>
      </form>
    </div>
  );
}

export default EnterEmail;
