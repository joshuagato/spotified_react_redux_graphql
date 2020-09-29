import React from 'react';

const FormControls = React.forwardRef((props, ref) => {
  const { id, name, type, title, plcHolder, value, changed } = props;

  return (
    <div>
      <label htmlFor={id}>{title.charAt(0).toUpperCase() + title.slice(1)}</label>
      <input ref={ref} id={id} name={name} type={type} placeholder={plcHolder} value={value} onChange={changed} required />
    </div>
  );
});

export default FormControls;
