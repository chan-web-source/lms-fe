import PageHeader from '~/components/page-header';
import LogManagement from '~/assets/icons/log-management-dashboard';
import LogList from './components/log-list';

const logManagement = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Log Management"
        icon={<LogManagement svgProps={{ className: 'size-8' }} />}
      />
      <LogList />
    </div>
  );
};

export default logManagement;
