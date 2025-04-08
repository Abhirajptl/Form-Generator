import React from 'react';
import InputText from './InputText';
import RadioGroup from './RadioGroup';
import SelectDropdown from './SelectDropdown';
import Checkbox from './Checkbox';
import RepeatableField from './RepeatableField';

const FormStep = ({ step, formData, onInputChange }) => {
  return (
    <div>
      <h2>{step.title}</h2>
      {step.fields.map((field) => (
        <div key={field.name} style={{ marginBottom: '20px' }}>
          {field.type === 'text' && (
            <InputText {...field} value={formData[field.name] || ''} onChange={(e) => onInputChange(e.target.value, field.name)} />
          )}
          {field.type === 'radio' && (
            <RadioGroup {...field} value={formData[field.name] || ''} onChange={(e) => onInputChange(e.target.value, field.name)} />
          )}
          {field.type === 'select' && (
            <SelectDropdown {...field} value={formData[field.name] || ''} onChange={(e) => onInputChange(e.target.value, field.name)} />
          )}
          {field.type === 'checkbox' && (
            <Checkbox {...field} checked={formData[field.name] || false} onChange={(e) => onInputChange(e.target.checked, field.name)} />
          )}
          {field.type === 'repeatable' && (
            <RepeatableField
              {...field}
              value={formData[field.name] || []}
              onChange={onInputChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormStep;