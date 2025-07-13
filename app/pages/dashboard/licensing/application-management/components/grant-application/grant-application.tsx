import { HeaderUnitIcon } from '~/assets/icons';
import PageHeader from '~/components/page-header';

import ConsultationWithScpng from './consultation-with-scpng';
import { useForm } from 'react-hook-form';
import {
  consultationWithScpngSchema,
  typeOfApplicationSchema,
} from '../../schema/create-application';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import GrantApplicationStepper from './grant-application-stepper';
import TypeOfApplication from './type-of-application';
import Cookies from 'js-cookie';
import { useGetOneApplicationDraft } from '../../hooks/use-get-one-applocation-draft';
import { ForCorporation } from './for-corporation';
import PrescribedApplication from './prescribed-application-fee';
import LicenseApplication from './declaration-license-application';
import { ForCapitalMarket } from './for-capital-maket';
import { ForIndividual } from './for-individual';
import { useGetIndividualApplication } from './hooks/use-get-one-individual-application';

const steps = [
  { id: 1, title: 'Consultation' },
  { id: 2, title: 'Declaration' },
  { id: 3, title: 'Corporation' },
  { id: 4, title: 'Supporting Docs' },
  { id: 5, title: 'Review & Submit' },
];

const GrantApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const individualId = Cookies.get('individual_id');
  useGetIndividualApplication(individualId || undefined);
  const draftId = Cookies.get('application_draft');
  const { data: draft } = useGetOneApplicationDraft(draftId);
  const [appliciantType, setApplicantType] = useState(draft?.applicant_type || undefined);

  const consultWithScpngForm = useForm<z.infer<typeof consultationWithScpngSchema>>({
    resolver: zodResolver(consultationWithScpngSchema),
    values: {
      consultationDate: draft?.consultation_date ?? '',
      physicalSubmissionDate: draft?.physical_submission_date ?? '',
      expressOfInterest: draft?.expression_of_interest_document?.split('/')?.pop() ?? '',
      expressOfInterestUploadedAt: draft?.expression_of_interest_document_uploaded_at ?? '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (draft) {
      consultWithScpngForm.reset({
        consultationDate: draft.consultation_date ?? '',
        physicalSubmissionDate: draft.physical_submission_date ?? '',
        expressOfInterest: draft.expression_of_interest_document ?? '',
        expressOfInterestUploadedAt: draft.expression_of_interest_document_uploaded_at ?? '',
      });
      setApplicantType(draft.applicant_type ?? '');
    }
  }, [consultWithScpngForm, draft]);

  const typeOfApplicationForm = useForm<z.infer<typeof typeOfApplicationSchema>>({
    resolver: zodResolver(typeOfApplicationSchema),
    values: {
      applicationType: draft?.applicant_type ?? '',
      regulatedActivity: draft?.regulated_activity ?? '',
    },
    mode: 'onChange',
  });

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev < 5 ? ((prev + 1) as typeof currentStep) : prev));

  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as typeof currentStep) : prev));

  return (
    <div>
      <PageHeader
        title="Application / Application for Grant"
        icon={<HeaderUnitIcon svgProps={{ className: 'size-8' }} />}
        action={<GrantApplicationStepper steps={steps} currentStep={currentStep} />}
      />

      <div className="bg-white p-5 rounded-t-3xl mt-5">
        {currentStep === 1 && (
          <ConsultationWithScpng form={consultWithScpngForm} onNext={goToNextStep} />
        )}
        {currentStep === 2 && (
          <TypeOfApplication
            form={typeOfApplicationForm}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            setApplicantType={setApplicantType}
          />
        )}
        {currentStep === 3 && appliciantType === 'Corporation' && (
          <ForCorporation onBack={goToPreviousStep} onNext={goToNextStep} />
        )}
        {currentStep === 3 && appliciantType === 'Capital Market Representative License' && (
          <ForCapitalMarket onBack={goToPreviousStep} onNext={goToNextStep} />
        )}
        {currentStep === 3 && appliciantType === 'Individual' && (
          <ForIndividual onBack={goToPreviousStep} onNext={goToNextStep} />
        )}
        {currentStep === 4 && (
          <PrescribedApplication onBack={goToPreviousStep} onNext={goToNextStep} />
        )}
        {currentStep === 5 && (
          <LicenseApplication onBack={goToPreviousStep} onNext={goToNextStep} />
        )}
      </div>
    </div>
  );
};

export default GrantApplication;
