import React from 'react';
import './Input.scss';

const Input = (props) => (
  <input className="update-input" name={props.name} type={props.type} placeholder={props.pholder} 
    onChange={props.changed} value={props.value} required />
);

export default Input;
