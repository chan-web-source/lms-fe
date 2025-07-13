import { UserManagementDashboardIcon } from '~/assets/icons';
import PageHeader from '~/components/page-header';
import { UserList } from './components';

const UserManagement = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="User Management" icon={<UserManagementDashboardIcon />} />
      <UserList />
    </div>
  );
};

export default UserManagement;
