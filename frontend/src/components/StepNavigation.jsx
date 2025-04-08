import React from 'react';

const StepNavigation = ({ currentStep, totalSteps, onNext, onPrevious, canNext }) => (
  <div style={{ marginTop: '20px' }}>
    {currentStep > 0 && <button onClick={onPrevious}>Previous</button>}
    {currentStep < totalSteps - 1 && (
      <button onClick={onNext} disabled={!canNext}>
        Next
      </button>
    )}
    {currentStep === totalSteps - 1 && <button onClick={() => console.log('Submit')}>Submit</button>}
    <p>Step {currentStep + 1} of {totalSteps}</p>
  </div>
);

export default StepNavigation;