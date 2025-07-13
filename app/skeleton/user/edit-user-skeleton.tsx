import PageHeader from '~/components/page-header';
import { Skeleton } from '~/components/ui/skeleton';

const EditUserSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        gradientColor="linear-gradient(to right, rgb(142, 77, 16) 0.38%, rgb(142 77 16 / 84%) 99.97%)"
        icon={<Skeleton className="h-10 w-10 rounded-full" />}
        title={''}
      />
      <div className="bg-white p-5 rounded-t-3xl space-y-6">
        {/* Back button skeleton */}
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-7 w-20" />
        </div>
        {/* Profile skeleton */}
        <div className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-3 mb-8">
          <div className="flex items-center gap-6">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </div>
        </div>

        {/* User Details Sections Skeleton */}
        {Array(6)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex border-b border-gray-200 py-4">
              <div className="flex w-1/2 items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />

                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-4 w-48 rounded-md" />
                </div>
              </div>
              <div className="w-1/2 flex items-center justify-start">
                <Skeleton className="h-5 w-48 rounded-md" />
              </div>
            </div>
          ))}

        {/* Account Security Section Skeleton */}
        <Skeleton className="mt-8 h-6 w-40 rounded-md" />
        {Array(3)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex border-b border-gray-200 py-4">
              <div className="flex w-1/2 items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-5 w-32 rounded-md" />
              </div>
              <div className="w-1/2 flex items-center justify-start">
                <Skeleton className="h-5 w-48 rounded-md" />
              </div>
            </div>
          ))}

        {/* Buttons Skeleton */}
        <div className="flex justify-end mt-8 gap-4">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default EditUserSkeleton;
