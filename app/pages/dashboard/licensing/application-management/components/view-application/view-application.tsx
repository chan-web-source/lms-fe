import { useEffect, useState } from 'react';
import PageHeader from '~/components/page-header';
import Screening from './components/screening';

import { BackIcon, HeaderUnitIcon } from '~/assets/icons';
import { type ViewApplicationDetail, type Step } from '../../types/api';
import { useNavigate, useParams } from 'react-router';
import DataHeaderSection from './components/data-header-section';
import { useGetOneApplicationDraft } from '../../hooks/use-get-one-applocation-draft';
import Cookies from 'js-cookie';
import { encryptHelper } from '~/lib/encrypt-helper';
import { useGetOneApplicationLogs } from '../../hooks/user-get-one-application-logs';

import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '~/providers/AuthProvider';

const steps = [
  { id: 1, title: 'Submission' },
  { id: 2, title: 'Screening' },
  { id: 3, title: 'Review' },
  { id: 4, title: 'Decision' },
  { id: 5, title: 'Final Processing' },
  { id: 6, title: 'Closed' },
];

const ViewApplication = () => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState<Step | undefined>();
  const { user } = useAuth();
  const accessViewApplicationDetail = user?.role_ids?.includes(1) || user?.role_ids?.includes(7);
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const decryptApplicationId = encryptHelper.decrypt(
    Cookies.get('auth_token') ?? '',
    applicationId ?? '',
  );

  const { data: applicationDetail } = useGetOneApplicationDraft(decryptApplicationId, {
    refetchOnMount: true,
    staleTime: 0,
    cacheTime: 0,
  });
  const { data: applicationDetailLogs } = useGetOneApplicationLogs(decryptApplicationId, {
    refetchOnMount: true,
    staleTime: 0,
    cacheTime: 0,
  });


  useEffect(() => {
    if (decryptApplicationId && accessViewApplicationDetail) {
      // TODO: fix below as it's not refetching when use invalidateQueries & not refetchOnMount, staleTime, cacheTime
      // queryClient.invalidateQueries({
      //   queryKey: ['application-draft', decryptApplicationId],
      //   refetchType: 'all',
      //   exact: true
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [`/license-applications/${decryptApplicationId}/logs`],
      //   refetchType: 'all',
      //   exact: true
      // });

      if (
        applicationDetail?.application_type?.toLowerCase() === 'application for grant' ||
        applicationDetail?.application_type?.toLowerCase() === 'application for renewal'
      ) {
        setCurrentStep(steps[1]);
      }
    }
  }, [decryptApplicationId, applicationDetail, steps, applicationDetailLogs]);



  return (
    accessViewApplicationDetail ? (
      <div className="flex flex-col gap-5">
        <PageHeader title={['Application', 'View Application']} icon={<HeaderUnitIcon />} />
        <div className="bg-(--color-white) p-5 rounded-t-3xl">
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <button
              onClick={() => {
                queryClient.invalidateQueries({ queryKey: ['license-applications'] });
                navigate('/licensing/application-management');
              }}
              className="flex items-center text-[22px] font-medium text-red gap-1.5"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <BackIcon /> Back
            </button>
          </div>
          <DataHeaderSection data={applicationDetail} currentStep={currentStep} steps={steps} />
          {currentStep?.title === 'Screening' && (
            <Screening
              data={applicationDetail as unknown as ViewApplicationDetail}
              applicationLogData={applicationDetailLogs?.data ?? []}
            />
          )}
        </div>
      </div>
    ) : (
      <div className='p-3'>
        <h1>You are not authorized to view this application.</h1>
      </div>
    )
  );
};

export default ViewApplication;
