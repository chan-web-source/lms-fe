import { useState } from 'react';
import { LoginForm, MultiFactor, VerificationCode } from './components';

const Login = () => {
  const [step, setStep] = useState(1);

  const goToNextStep = () => setStep((prev) => (prev < 3 ? ((prev + 1) as typeof step) : prev));

  // const goToPreviousStep = () =>
  //   setStep((prev) => (prev > 1 ? ((prev - 1) as typeof step) : prev));

  return (
    <div className="bg-white">
      {step === 1 && <LoginForm onNext={goToNextStep} />}
      {step === 2 && <MultiFactor onNext={goToNextStep} />}
      {step === 3 && (
        <VerificationCode
          onBack={() => setStep(2)}
          goFirst={() => {
            setStep(1);
          }}
        />
      )}
    </div>
  );
};

export default Login;
