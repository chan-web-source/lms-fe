import { Check, ChevronRight } from 'lucide-react';
import { cn } from '~/lib/utils';

// components/application-stepper.tsx
interface Step {
  id: number;
  title: string;
}

interface GrantApplicationStepperProps {
  steps: Step[];
  currentStep: number;
}

const GrantApplicationStepper = ({ steps, currentStep }: GrantApplicationStepperProps) => {
  return (
    <div className="flex items-center justify-between  rounded-t-2xl gap-[10px]">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex-1 flex items-center gap-[10px]">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full 
                ${isCompleted ? 'bg-[#2A7C50] text-white' : ''}
                ${isActive ? 'bg-white border-white text-red-700' : ''}
                ${!isCompleted && !isActive ? ' text-white bg-[#FFFFFF4D]' : ''}
              `}
            >
              {isCompleted ? <Check /> : <span className="text-[20px] font-medium">{step.id}</span>}
            </div>
            {!isLast && (
              <ChevronRight
                className={cn('text-[#FFFFFF4D] ', (isActive || isCompleted) && 'text-white')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GrantApplicationStepper;
