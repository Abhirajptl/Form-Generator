import React from 'react';

const RadioGroup = ({ label, name, options, value, onChange, required }) => (
  <div>
    <label>{label}{required && ' *'}</label>
    <div>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={`${name}-${option}`}
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            required={required}
          />
          <label htmlFor={`${name}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  </div>
);

export default RadioGroup;