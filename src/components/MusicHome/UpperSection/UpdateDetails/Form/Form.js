import React from 'react';
import './Form.scss';

const Form = props => (
  <form className="update-details" onSubmit={props.submitted}>
    <h1>{props.name}</h1>
    {props.children}
    <button>{props.btnName}</button>
  </form>
);

export default Form;
