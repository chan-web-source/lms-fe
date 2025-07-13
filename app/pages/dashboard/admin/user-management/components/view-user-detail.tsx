import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  AccountStatusIcon,
  BackIcon,
  EditChangeDateIcon,
  EditCreateDateIcon,
  EditDivisionIcon,
  EditMultiAuthIcon,
  EditPasswordIcon,
  EditPreferLoginMethodIcon,
  EditUnitIcon,
  EmailIcon,
  FileIcon,
  PhoneIcon,
  RoleIcon,
  UserManagementDashboardIcon,
  PdfIcon,
} from '~/assets/icons';
import PageHeader from '~/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { encryptHelper } from '~/lib/encrypt-helper';
import { useGetOneUser } from '../hooks/use-get-one-user';
import Cookies from 'js-cookie';
import type { UserManagementData } from '~/types/management';
import { useGetRoles } from '../hooks/use-get-roles';
import { Button } from '~/components/ui/button';
import ResendLoginCred from './resend-login-cred';
import { toast } from 'react-toastify';
import { formatDate } from '~/lib/utils';
import DeactivateAccDialog from './deactivate';
import UserDetailSkeleton from '~/skeleton/user/view-user-skeleton';
import NoImgIcon from '~/assets/images/no-img-icon.jpg';
import { useResetPassword } from '../hooks/use-reset-user-password';
import ResetPassSuccess from './reset-password-success';
import { useAuth } from '~/providers/AuthProvider';
import { useResendLoginCredential } from '../hooks/user-resend-login-credential';
import { useDeactivateOrActivateUser } from '../hooks/use-deactivate-activate-user';
import { Edit } from 'lucide-react';

const ViewUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const resetUserPass = useResetPassword();
  const [open, setOpen] = useState(false);
  const [resendDialogOpen, setResendDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const decryptedId = encryptHelper.decrypt(Cookies.get('auth_token') ?? '', id ?? '');
  const { data } = useGetOneUser(decryptedId);
  const [userData, setUserData] = useState<UserManagementData | undefined>(undefined);
  const { data: rolesData } = useGetRoles();
  const { user } = useAuth();
  const { mutate } = useResendLoginCredential();
  const { mutate: deactivateUser } = useDeactivateOrActivateUser();

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  if (!userData) {
    return (
      <div>
        <UserDetailSkeleton />
      </div>
    );
  }
  const handleResendLoginCred = () => {
    if (!userData.id) {
      toast.error('User ID is required');
      return;
    }
    mutate({ user_id: userData.id });
    setResendDialogOpen(false);
  };

  const handleEditProfile = (userId: number | undefined) => {
    const encryptedId = encryptHelper.encrypt(
      Cookies.get('auth_token') ?? '',
      userId?.toString() ?? '',
    );
    navigate(`/admin/user-management/edit-user/${encryptedId}`);
  };

  const handleResetUserPassword = async () => {
    if (resetUserPass.isPending) {
      return;
    }
    try {
      if (userData.id) {
        const res = await resetUserPass.mutateAsync({
          user_id: userData.id,
        });
        if (res.user_id) {
          setTimeout(() => {
            setOpen(true);
          }, 300);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to reset the password');
    }
  };

  const handleDeactivateOrActivate = (userData: UserManagementData, deactivate: boolean) => {
    const formData = new FormData();
    if (userData.id) {
      try {
        formData.append('id', userData.id?.toString() ?? '');
        // formData.append('id', userData.id.toString());

        if (userData.verification_document) {
          formData.append('verification_document', userData.verification_document);
          formData.append('verification_method', userData.verification_method ?? '');
        }

        if (userData.account_type === 'Internal') {
          formData.append('division', userData.division ?? userData.division ?? '');
          formData.append('division_unit', userData.division_unit ?? userData.division_unit ?? '');
        }
        // Append primitive values with fallbacks
        formData.append('first_name', userData.first_name || userData.first_name || '');
        formData.append('middle_name', userData.middle_name ?? '');
        formData.append('surname', userData.surname || userData.surname || '');
        formData.append('email', userData.email || '');
        formData.append('phone', userData.phone || '');
        formData.append('account_status', deactivate ? 'Inactive' : 'Active');
        formData.append('account_type', userData.account_type || 'Internal');
        formData.append('mfa_method', userData?.mfa_method?.toLowerCase() || 'email');
        formData.append('mfa_enabled', userData.mfa_enabled ? 'true' : 'false');
        // role_ids: API side - GET returns number[], POST/PUT expects string
        if (Array.isArray(userData.role_ids) && userData.role_ids.length > 0) {
          formData.append('role_ids', userData?.role_ids?.join(', ') ?? '');
        } else if (userData.role_ids && Array.isArray(userData.role_ids)) {
          formData.append('role_ids', userData?.role_ids?.join(', ') ?? '');
        }
        setUserData({ ...userData, account_status: deactivate ? 'Inactive' : 'Active' });
        deactivateUser(userData.id, formData);
        setDeactivateDialogOpen(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title={['User Management', 'View User Details']}
        gradientColor="linear-gradient(to right, rgb(142, 77, 16) 0.38%, rgb(142 77 16 / 84%) 99.97%)"
        icon={<UserManagementDashboardIcon />}
      />
      <div className="bg-(--color-white) p-5 rounded-t-3xl">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/user-management')}
            className="flex items-center text-[22px] font-medium text-red gap-1.5"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <BackIcon /> Back
          </button>
        </div>
        <div className="space-y-6">
          {/* Profile Image Upload Section */}
          <div className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-3 mb-8">
            <div className="flex items-center gap-6">
              <Avatar className="h-21 w-21 border border-gray-200 bg-gray-50">
                <AvatarImage
                  src={
                    userData?.photo
                      ? (() => {
                        const url = new URL(userData.photo);
                        url.searchParams.set('_t', Date.now().toString());
                        return url.toString();
                      })()
                      : NoImgIcon
                  }
                  className="object-cover"
                />
                <AvatarFallback>
                  {`${userData?.first_name?.[0] || ''}${userData?.surname?.[0] || ''}`}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[22px] font-medium text-[#0E121B]">
                    {userData.first_name} {userData.surname} {userData?.middle_name ?? ''}
                  </span>
                  {userData.account_type && (
                    <span
                      className="rounded-xl px-3 py-1 text-md font-medium text-[#994A00]"
                      style={{
                        backgroundColor:
                          userData.account_type !== 'Internal' ? '#fbf4da' : '#ffe5cc',
                      }}
                    >
                      {userData.account_type}
                    </span>
                  )}
                </div>
                <div className="text-lg text-gray-400">{userData.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user?.role_ids?.includes(1) && userData.account_status === 'Inactive' && (
                <ResendLoginCred
                  onResend={handleResendLoginCred}
                  open={resendDialogOpen}
                  setOpen={setResendDialogOpen}
                >
                  <button className="border border-gray-300 rounded-xl px-6 py-3 text-base font-medium text-gray-900 bg-white hover:bg-gray-100 transition">
                    Resend Login Credentials
                  </button>
                </ResendLoginCred>
              )}
              <button
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-base font-medium text-white bg-gradient-to-br from-[#2F3E46] via-[#354F52] to-[#52796F] text-white  hover:opacity-90 transition"
                onClick={() => handleEditProfile(userData?.id)}
              >
                <Edit className="size-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-800 text-[22px]">User Details</h2>

        {/* Email */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <EmailIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Email Address</p>
              <p className="text-sm text-gray-600">Business email address recommended.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">{userData.email}</span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13  items-center justify-center rounded-lg bg-[#F5F5F6]">
              <PhoneIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Phone Number</p>
              <p className="text-sm text-gray-600">Business phone number recommended.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">{userData.phone}</span>
          </div>
        </div>

        {/* Division and Unit (for Internal users) */}
        {userData?.account_type === 'Internal' && (
          <>
            {/* Division */}
            <div className="flex border-b border-gray-200">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <EditDivisionIcon />
                </div>
                <div>
                  <p className="flex items-center text-base font-medium text-gray-900">Division</p>
                  <p className="text-sm text-gray-600">Department or business group assignment.</p>
                </div>
              </div>
              <div className="w-1/2 py-4 flex items-center">
                <span className="text-base text-gray-900">{userData.division}</span>
              </div>
            </div>

            {/* Unit */}
            <div className="flex border-b border-gray-200">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <EditUnitIcon />
                </div>
                <div>
                  <p className="flex items-center text-base font-medium text-gray-900">Unit</p>
                  <p className="text-sm text-gray-600">Specific team or operational subgroup.</p>
                </div>
              </div>
              <div className="w-1/2 py-4 flex items-center">
                <span className="text-base text-gray-900">{userData.division_unit}</span>
              </div>
            </div>
          </>
        )}

        {/* Role */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#F4F4F4]">
                <RoleIcon />
              </div>
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Role</p>
              <p className="text-sm text-gray-600">Permission group in the system</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center gap-2">
            {Array.isArray(userData.role_ids) &&
              userData.role_ids.map((roleId) => {
                const role = rolesData?.data?.find((r) => r.id === roleId);
                return role ? (
                  <span key={role.id} className="rounded-xl bg-gray-100 p-2 text-sm text-gray-900">
                    {role.name}
                  </span>
                ) : null;
              })}
          </div>
        </div>

        {/* Creation Date */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <EditCreateDateIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Creation Date</p>
              <p className="text-sm text-gray-600">Date when the account was initially created.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">
              {userData.created_at ? formatDate(userData.created_at) : '-'}
            </span>
          </div>
        </div>

        {/* Last Login */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Last Login</p>
              <p className="text-sm text-gray-600">Most recent successful login timestamp.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">
              {userData.last_login ? formatDate(userData.last_login, 'datetime') : '-'}
            </span>
          </div>
        </div>

        {/* Change Date */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <EditChangeDateIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Change Date</p>
              <p className="text-sm text-gray-600">
                Date and time of the most recent account update.
              </p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">
              {userData.updated_at ? formatDate(userData.updated_at, 'date') : '-'}
            </span>
          </div>
        </div>

        {/* Account Status */}
        <div className="flex">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <AccountStatusIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">
                Account Status
              </p>
              <p className="text-sm text-gray-600">
                Current state of the account (Active or Inactive).
              </p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">
              {userData.account_status === 'Active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {userData.account_type === 'External' && (
          <>
            {/* Verification Method */}
            <div className="flex border-t border-gray-200 border-b border-gray-200">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <FileIcon />
                </div>
                <div>
                  <p className="flex items-center text-base font-medium text-gray-900">
                    Verification Method
                  </p>
                  <p className="text-sm text-gray-600">Process used to confirm user identity.</p>
                </div>
              </div>
              <div className="w-1/2 py-4 flex items-center">
                <span className="text-base text-gray-900">
                  {userData.verification_method ?? '-'}
                </span>
              </div>
            </div>

            {/* Verification Document */}
            <div className="flex">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <FileIcon />
                </div>
                <div>
                  <p className="flex items-center text-base font-medium text-gray-900">File</p>
                  <p className="text-sm text-gray-600">
                    Uploaded document or attachment related to the account.
                  </p>
                </div>
              </div>
              <div className="w-1/2 py-4 flex items-center">
                {userData.verification_document ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      const baseUrl =
                        userData.verification_document instanceof File
                          ? URL.createObjectURL(userData.verification_document)
                          : userData.verification_document || '';
                      if (!baseUrl) return;
                      const url = new URL(baseUrl);
                      url.searchParams.set('_t', Date.now().toString());
                      const win = window.open();
                      if (win) {
                        win.document.write(
                          `<img src="${url}" style="max-width: 100%; height: auto;" />`,
                        );
                      }
                    }}
                    href="#"
                    className="flex items-center gap-2 text-[#671513] hover:underline cursor-pointer"
                  >
                    <PdfIcon />
                    <span className="text-lg">
                      {/* {userData.verification_document instanceof File
                        ? userData.verification_document.name
                        : 'File'} */}
                      {userData?.verification_document instanceof File && (
                        <label className="mt-3 cursor-pointer flex items-center">
                          <PdfIcon />
                          <span className="text-lg text-[#671513] justify-start  gap-2">
                            {userData?.verification_document?.name.length > 20
                              ? userData?.verification_document?.name.slice(0, 20) + '...'
                              : userData?.verification_document?.name}
                          </span>
                        </label>
                      )}

                      {typeof userData?.verification_document === 'string' &&
                        userData?.verification_document && (
                          <label className="cursor-pointer">
                            <span className="text-lg text-[#671513]">File</span>
                          </label>
                        )}
                    </span>
                  </a>
                ) : (
                  <span className="text-base text-gray-900">-</span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Account Security Section */}
        <h2 className="mt-8 text-xl font-semibold text-gray-800">Account Security</h2>

        {/* MFA */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <EditMultiAuthIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">
                Multi-Factor Authentication
              </p>
              <p className="text-sm text-gray-600">Extra security layer status for login.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">
              {userData.mfa_enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Preferred Method */}
        <div className="flex border-b border-gray-200">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <EditPreferLoginMethodIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">
                Preferred Method on Login
              </p>
              <p className="text-sm text-gray-600">Default method used for authentication.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <span className="text-base text-gray-900">
              {userData.mfa_method === 'email' && 'Email Address'}
              {userData.mfa_method === 'phone' && 'Phone Number'}
            </span>
          </div>
        </div>

        {/* Password */}
        <div className="flex">
          <div className="flex w-1/2 items-center py-4">
            <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
              <EditPasswordIcon />
            </div>
            <div>
              <p className="flex items-center text-base font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-600">Secure credentials for account access.</p>
            </div>
          </div>
          <div className="w-1/2 py-4 flex items-center">
            <Button
              className="px-6 py-2 cursor-pointer"
              onClick={() => {
                handleResetUserPassword();
              }}
              loading={resetUserPass.isPending}
            >
              Reset Password
            </Button>
          </div>
        </div>

        {/* Deactivate Account link */}
        <div className="mt-4">
          {userData.account_status === 'Active' ? (
            <DeactivateAccDialog
              isActive={true}
              onDeactivate={() => handleDeactivateOrActivate(userData, true)}
              open={deactivateDialogOpen}
              setOpen={setDeactivateDialogOpen}
            >
              <button
                className="text-[#600100] text-base font-medium hover:underline bg-transparent border-none p-0"
                type="button"
              >
                Deactivate Account
              </button>
            </DeactivateAccDialog>
          ) : (
            <button
              className="text-[#600100] text-base font-medium hover:underline bg-transparent border-none p-0"
              type="button"
              onClick={() => handleDeactivateOrActivate(userData, false)}
            >
              Activate Account
            </button>
          )}
        </div>
      </div>
      <ResetPassSuccess open={open} setOpen={setOpen} />
    </div>
  );
};

export default ViewUserDetail;
