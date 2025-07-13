import { HeaderUnitIcon } from '~/assets/icons';
import PageHeader from '~/components/page-header';
import { ApplicationList } from './components';

const ApplicationManagement = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Application"
        icon={<HeaderUnitIcon svgProps={{ className: 'size-8' }} />}
      />
      <ApplicationList />
    </div>
  );
};

export default ApplicationManagement;
