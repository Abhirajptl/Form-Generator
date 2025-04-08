import React from 'react';

const RepeatableField = ({ label, name, fields, value, onChange }) => {
  const handleAdd = () => {
    onChange([...value, {}], name);
  };

  const handleRemove = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue, name);
  };

  const handleInnerChange = (index, innerName, innerValue) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [innerName]: innerValue };
    onChange(newValue, name);
  };

  return (
    <div>
      <label>{label}</label>
      {value.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === 'text' && (
                <label htmlFor={`${name}-${index}-${field.name}`}>{field.label}{field.required && ' *'}</label>
              )}
              {field.type === 'number' && (
                <label htmlFor={`${name}-${index}-${field.name}`}>{field.label}{field.required && ' *'}</label>
              )}
              <input
                type={field.type}
                id={`${name}-${index}-${field.name}`}
                name={field.name}
                value={item[field.name] || ''}
                onChange={(e) => handleInnerChange(index, e.target.name, e.target.value)}
                required={field.required}
              />
            </div>
          ))}
          <button type="button" onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>Add {label}</button>
    </div>
  );
};

export default RepeatableField;