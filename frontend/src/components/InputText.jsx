import React from 'react';

const InputText = ({ label, name, value, onChange, required }) => (
  <div>
    <label htmlFor={name}>{label}{required && ' *'}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputText;