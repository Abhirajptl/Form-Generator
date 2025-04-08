import React, { useState, useEffect } from 'react';
import FormStep from './components/FormStep';
import StepNavigation from './components/StepNavigation';
import Preview from './components/Preview';
import formSchema from './formSchema.json'; // Assuming your JSON is here

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const totalSteps = formSchema.fields ? formSchema.fields.length + 1 : 1; // +1 for preview
  const currentStepData = formSchema.fields ? formSchema.fields[currentStep] : null;
  const [canNext, setCanNext] = useState(true);

  console.log("Loaded formSchema:", formSchema); // Inspect the loaded schema
  console.log("Current Step Index:", currentStep);
  console.log("Current Step Data:", currentStepData);

  useEffect(() => {
    if (currentStepData) {
      const requiredFields = currentStepData.fields ?
        currentStepData.fields.filter(field => field.required).map(field => field.name) :
        formSchema.fields[currentStep]?.required ? [formSchema.fields[currentStep].name] : [];

      const isStepValid = requiredFields.every(fieldName => {
        const value = formData[fieldName];
        return value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0);
      });
      setCanNext(isStepValid);
    } else if (currentStep === totalSteps - 1) {
      setCanNext(true); // Allow navigation to preview
    } else {
      setCanNext(true); // If currentStepData is null, allow navigation for debugging
    }
  }, [currentStep, formData, currentStepData, formSchema.fields]);

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (canNext) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:5000/api/submit', { // Adjust URL if your backend is on a different port/host
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Form submitted successfully!'); 
        
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit form.'); 
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting.');
    }
  };


  if (!formSchema || !formSchema.fields) {
    return <div>Error: Invalid form schema. Please check your formSchema.json file.</div>;
  }

  if (currentStep < totalSteps - 1) {
    return (
      <div>
        <h1>{formSchema.title}</h1>
        {currentStepData && (
          <FormStep step={currentStepData} formData={formData} onInputChange={handleInputChange} />
        )}
        <StepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canNext={canNext}
        />
      </div>
    );
  } else if (currentStep === totalSteps - 1) {
    return (
      <div>
        <h1>Review Your Information</h1>
        <Preview formData={formData} />
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }

  return <div>Loading...</div>;
}

export default App;