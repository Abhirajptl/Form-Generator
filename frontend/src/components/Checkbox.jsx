import React from 'react';

const Checkbox = ({ label, name, checked, onChange }) => (
  <div>
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={name}>{label}</label>
  </div>
);

export default Checkbox;