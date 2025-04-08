import React from 'react';

const Preview = ({ formData }) => (
  <div>
    <h2>Review Your Information</h2>
    <pre>{JSON.stringify(formData, null, 2)}</pre>
  </div>
);



export default Preview;