import ArrowStep from '@/assets/images/Arrow.png';
import StepSuccess from '@/assets/images/Step Success.png';
import { formatDate } from '~/lib/utils';
import type { ApplicationDraft, Step } from '../../../types/api';

interface DataHeaderSectionProps {
  data?: ApplicationDraft;
  currentStep: Step | undefined;
  steps: Step[];
}

const DataHeaderSection = ({ data, currentStep, steps }: DataHeaderSectionProps) => {
  // bg color for days remaining
  let daysRemainingColor = 'bg-gray-200 text-gray-700';
  if (data?.days_remaining && data.days_remaining < 5)
    daysRemainingColor = 'bg-[#ffc7c7] text-gray-700';
  else if (data?.days_remaining && data.days_remaining <= 10)
    daysRemainingColor = 'bg-[#ffe5cc] text-gray-700';
  const inTabletRange = typeof window !== "undefined" && window.innerWidth >= 720 && window.innerWidth < 1280;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-[28px] font-semibold text-gray-900 mr-5">{data?.application_id} </h2>
        <span className="px-3 py-1 text-sm font-normal bg-white border border-gray-700 rounded-full text-gray-700">
          {data?.application_status || '-'}
        </span>
        <span
          className={`px-3 py-1 text-sm font-normal text-grey-50 rounded-full ${daysRemainingColor}`}
        >
          {data?.days_remaining ?? '-'} Days Remaining
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex items-center ">
          <div className="text-gray-900 font-medium text-[18px] responsive-title-field">
            Application Type
          </div>
          <span className="text-gray-500 font-normal text-[17px] ">
            {data?.application_type || '-'}
          </span>
        </div>
        <div className="flex items-center">
          <div className="text-gray-900 font-medium 
              text-[18px]  w-full
             responsive-title-field break-words"
          >
            Responsible Assignee
          </div>
          <span className="text-gray-500 font-normal text-[17px] flex-1">
            {data?.responsible_assignee_name || '-'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium 
              text-[18px]  w-full
             responsive-title-field break-words">Applicant Type</span>
          <span className="text-gray-500 font-normal text-[17px]">
            {data?.applicant_type || '-'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium 
              text-[18px]  w-full
             responsive-title-field break-words">Responsible Unit</span>
          <span className="text-gray-500 font-normal text-[17px]">
            {data?.responsible_division_unit || '-'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium 
              text-[18px]  w-full
             responsive-title-field break-words">Regulated Activity</span>
          <span className="text-gray-500 font-normal text-[17px]">
            {data?.regulated_activity || '-'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium 
              text-[18px]  w-full
             responsive-title-field break-words">
            Application Last Changed
          </span>
          <span className="text-gray-500 font-normal text-[17px]">
            {data?.updated_at ? formatDate(data.updated_at, 'datetime-dash') : '-'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium 
              text-[18px]  w-full 
             responsive-title-field break-words">Corporation Name</span>
          <span className="text-gray-500 font-normal text-[17px]">
            {data?.corporation_name || '-'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-900 font-medium 
              text-[18px]  w-full
             responsive-title-field break-words">Application Creation</span>
          <span className="text-gray-500 font-normal text-[17px]">
            {data?.created_at ? formatDate(data.created_at, 'datetime-dash') : '-'}
          </span>
        </div>
      </div>

      {/* progress bar */}
      <div className=" border border-gray-200 border-[1.5px] rounded-md mt-8 mb-4 p-0 relative">
        {/* border line */}
        {currentStep?.id &&
          (
            <ProgressBarActiveLine currentStep={currentStep} steps={steps} inTabletRange={inTabletRange} />
          )}

        {/* step component */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 w-full 
          view-application-steps"
        // style={{ gridTemplateColumns: steps.length <= 6 ? `repeat(${steps.length}, 1fr)` : undefined }}
        >
          {steps.map((item, index) => {
            // Find if this step is completed (exists in steps array and has lower id than current)
            const isCompleted = currentStep?.id !== undefined && item.id < currentStep.id;
            // Check if this is the current active step
            const isActive = currentStep?.id === item.id;
            // Check if this step is pending (higher id than current)
            const isPending = currentStep?.id !== undefined && item.id > currentStep.id;

            return (
              <div
                key={item.id}
                className=" p-2 ml-5 items-center gap-2 rounded-md text-start relative flex poinyr p-4  lg:py-2 xl:py-4 px-1 
                step-grid "
              // style={{ padding: index === 0 ? "0px 2px" : "2px" }}
              >
                {/* Show success icon for completed steps */}
                {isCompleted && <img src={StepSuccess} className="w-10 h-10" alt="" />}

                {/* Show numbered circle for active and pending steps */}
                {(isActive || isPending) && (
                  <span
                    className={`inline-flex items-center justify-center border-[2px] w-10 h-10 mr-1 text-sm font-semibold rounded-full 
                        ${isActive
                        ? 'text-red-600 border border-red-600'
                        : 'text-[#dfdfdf] border border-gray-[#dfdfdf]'
                      }`}
                  >
                    {String(item.id).padStart(2, '0')}
                  </span>
                )}

                {/* Step title with dynamic styling */}
                <span
                  className={`
                    ${isActive && 'text-red-600 font-semibold'}
                    ${isPending && 'text-[#bec1cb] font-medium'}
                    ${isCompleted && 'text-black font-normals'}
                    `}
                >
                  {item.title}
                </span>

                {((!inTabletRange && index < steps.length - 1) || (inTabletRange && index != 2 && index < steps.length - 1)) && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <img src={ArrowStep} alt="Arrow" />
                  </div>
                )}

                <div className="flex-1"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


const ProgressBarActiveLine = ({ currentStep, steps, inTabletRange }: { currentStep: Step, steps: Step[], inTabletRange: boolean }) => {

  if (inTabletRange) {
    return (<div
      className="absolute transform bg-red-600 h-1 w-full"
      style={{
        width: `calc(${100 / 3}%)`,
        left: `calc(${((currentStep.id - 1) % 3) * (100 / 3)}%  - 3px)`,
        bottom: currentStep.id <= 3 ? 'calc(100% / 2)' : '-1px',
        padding: 0,
        margin: 0,
      }}
    ></div>)
  }

  return (
    <div
      className="absolute transform bg-red-600 h-1 w-full"
      style={{
        width: inTabletRange ? `calc(${100 / steps.length}%)` : `calc(${100 / steps.length}%)`,
        left: inTabletRange ? `calc(${((currentStep.id - 1) * 100) / steps.length}% - 3.5px)` : `calc(${((currentStep.id - 1) * 100) / steps.length}% - 3.5px)`,
        bottom: '-1px',
        padding: 0,
        margin: 0,
      }}
    ></div>)
}

export default DataHeaderSection;
