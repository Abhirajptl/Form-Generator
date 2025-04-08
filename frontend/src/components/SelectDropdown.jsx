import React from 'react';

const SelectDropdown = ({ label, name, options, value, onChange, required }) => (
  <div>
    <label htmlFor={name}>{label}{required && ' *'}</label>
    <select id={name} name={name} value={value} onChange={onChange} required={required}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default SelectDropdown;