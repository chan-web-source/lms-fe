import { useEffect, useState } from 'react';
import {
  AccountSettingIcon,
  EditDivisionIcon,
  EditUnitIcon,
  EmailIcon,
  FileIcon,
  RoleIcon,
  UserManagementDashboardIcon,
  UsersIconRound,
  EditMultiAuthIcon,
  EditPreferLoginMethodIcon,
  EditPasswordIcon,
  PdfIcon,
} from '~/assets/icons';
import NoImgIcon from '~/assets/images/no-img-icon.jpg';
import PageHeader from '~/components/page-header';
import { useGetOneUser } from '../../dashboard/admin/user-management/hooks/use-get-one-user';
import { useForm } from 'react-hook-form';
import {
  mapUserToFormValues,
  userFormSchema,
  type UserFormValues,
} from '../../dashboard/admin/user-management/schema/create-user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Input } from '~/components/ui/input';
import { PhoneIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  AccountTypeOptions,
  VerificationMethodOptions,
  MFAOptions,
  PreferredMethodOptions,
} from '~/lib/user-management-data';
import type { DropDownData } from '~/types/management';
import { handleImageUpload } from '~/lib/formFilling';
import PhoneInputWithFlag from '~/components/comp-46';
import { useUpdateMyProfile } from '../hooks/use-update-my-profile';
import EditUserSkeleton from '~/skeleton/user/edit-user-skeleton';
import { useGetRoles } from '../../dashboard/admin/user-management/hooks/use-get-roles';
import { useGetDivisionUnits } from '../../dashboard/admin/user-management/hooks/use-get-division-units';
import { useGetDivisions } from '../../dashboard/admin/user-management/hooks/use-get-divisions';
import type { AuthUser } from '~/types/Auth';
import { useAuth } from '~/providers/AuthProvider';

const EditUser = () => {
  const { mutate } = useUpdateMyProfile();
  const { user } = useAuth();
  const { data: getUserData } = useGetOneUser(user?.id.toString() ?? '');
  const { data: rolesData } = useGetRoles();
  const { data: divisionData } = useGetDivisions();
  const { data: divisionUnitData } = useGetDivisionUnits();
  const [myData, setMyData] = useState<AuthUser | null>(null);

  const [internalRolesData, setInternalRolesData] = useState<DropDownData[] | undefined>(undefined);
  const [externalRolesData, setExternalRolesData] = useState<DropDownData[] | undefined>(undefined);

  const [profileImage, setProfileImage] = useState<string | File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(NoImgIcon);

  useEffect(() => {
    if (getUserData?.photo) {
      setProfileImage(getUserData.photo);
    }
  }, [getUserData]);

  useEffect(() => {
    if (profileImage instanceof File) {
      const objectUrl = URL.createObjectURL(profileImage);
      setImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof profileImage === 'string') {
      try {
        const url = new URL(profileImage);
        url.searchParams.set('_t', Date.now().toString());
        setImageUrl(url.toString());
      } catch {
        setImageUrl(profileImage || NoImgIcon);
      }
    } else {
      setImageUrl(NoImgIcon);
    }
  }, [profileImage]);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      photo: '',
      verification_document: '',
      first_name: '',
      middle_name: '',
      surname: '',
      email: '',
      phone_code: '',
      phone: '',
      account_status: false,
      mfa_enabled: false,
      account_type: '',
      role_ids: [],
      division: '',
      division_unit: '',
      verificationMethod: '',
      mfa_method: '',
    },
    mode: 'onChange',
  });

  // Refetch user data when component mounts to ensure fresh data
  // useEffect(() => {
  //   if (user?.id) {
  //     refetchUserData();
  //   }
  // }, [user?.id, refetchUserData]);

  useEffect(() => {
    if (getUserData && user?.id) {
      setMyData(user ?? null);

      const formValues = mapUserToFormValues(getUserData);
      setTimeout(() => {
        form.reset(formValues);
      }, 400);
      // check my edit right
      setInternalRolesData(
        rolesData?.data?.filter(
          (role) => role.name !== 'License User',
        ) as unknown as DropDownData[],
      );
      setExternalRolesData(
        rolesData?.data?.filter(
          (role) => role.name === 'License User',
        ) as unknown as DropDownData[],
      );
    }
  }, [getUserData, rolesData, form]);

  // Subscribe to form changes
  // useEffect(() => {
  //   const subscription = form.watch((value, { name }) => {
  //     if (name === 'account_type') {
  //       setAccountType(value.account_type as string);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form]);

  // useEffect(() => {
  //   const accountType = form.watch('account_type');
  //   if (accountType === 'External' && getUserData) {
  //     const currentVerificationMethod = form.getValues('verificationMethod');
  //     if (!currentVerificationMethod) {
  //       form.setValue('verificationMethod', 'Passport', { shouldValidate: true });
  //     }
  //   }
  // }, [form.watch('account_type'), getUserData]);

  if (!getUserData) {
    return (
      <div>
        <EditUserSkeleton />
      </div>
    );
  }

  const onSubmit = async (data: UserFormValues) => {
    // Validate form data
    const validationResult = userFormSchema.safeParse(data);

    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.errors);
      // Set form errors
      validationResult.error.errors.forEach((error) => {
        form.setError(error.path[0] as keyof UserFormValues, {
          type: 'manual',
          message: error.message,
        });
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', getUserData?.id?.toString() ?? '');

      if (data.photo) {
        formData.append('photo', data.photo);
      }

      if (data.verification_document && data.account_type === 'External') {
        formData.append('verification_document', data.verification_document);
        formData.append('verification_method', data.verificationMethod ?? '');
      }

      if (data.account_type === 'Internal') {
        formData.append('division', data.division ?? getUserData?.division ?? '');
        formData.append('division_unit', data.division_unit ?? getUserData?.division_unit ?? '');
      }

      // Append primitive values with fallbacks
      formData.append('first_name', data.first_name || getUserData?.first_name || '');
      formData.append('middle_name', data.middle_name ?? '');
      formData.append('surname', data.surname || getUserData?.surname || '');
      formData.append('email', data.email || getUserData?.email || '');
      formData.append('phone', data.phone || getUserData?.phone || '');
      formData.append('account_status', data.account_status ? 'Active' : 'Inactive');
      formData.append('account_type', data.account_type || getUserData?.account_type || 'Internal');
      formData.append(
        'mfa_method',
        data.mfa_method?.toLowerCase() || getUserData?.mfa_method || 'email',
      );
      formData.append('mfa_enabled', data.mfa_enabled ? 'true' : 'false');
      // role_ids: API side - GET returns number[], POST/PUT expects string
      if (Array.isArray(data.role_ids) && data.role_ids.length > 0) {
        formData.append('role_ids', data?.role_ids?.join(', ') ?? '');
      } else if (getUserData?.role_ids && Array.isArray(getUserData.role_ids)) {
        formData.append('role_ids', getUserData?.role_ids?.join(', ') ?? '');
      }

      mutate(formData, {
        onSuccess: (response) => {
          if (response?.data?.photo) {
            setProfileImage(response.data.photo);
          }
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title={'My Profile'} icon={<UserManagementDashboardIcon />} />
      <div className="bg-(--color-white) p-5 rounded-t-3xl">
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // Get current form values
              const formValues = form.getValues();
              // Try submitting with current values
              await onSubmit(formValues);
            }}
            className="space-y-8"
          >
            <div className="space-y-6 mb-0">
              {/* User Details Header */}
              <h2 className="mb-5 text-[22px] font-[500] text-[#17181C]">User Details</h2>

              {/* Profile Image Upload Section */}
              <div className="mb-4.5 flex flex-wrap items-start gap-4">
                <Avatar className="h-16 w-16 border border-gray-200 bg-gray-100">
                  <AvatarImage
                    src={imageUrl}
                    className="object-cover"
                    onError={() => setImageUrl(NoImgIcon)}
                  />
                  <AvatarFallback className="text-2xl">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-base text-[#0E121B] font-medium text-[16px]">Upload Image</p>
                  <p className="text-sm text-[#525866]">Min 400x400px, PNG or JPEG</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-base font-medium text-[#525866] bg-white border-[#E1E4EA] p-2 rounded-[6px] hover:bg-gray-100"
                    asChild
                  >
                    <label className="cursor-pointer text-[14px] px-2.5">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={(e) => {
                          handleImageUpload(e, form, 'photo');
                          const file = e.target.files?.[0];
                          if (file) setProfileImage(file);
                        }}
                      />
                      Upload
                    </label>
                  </Button>
                  <FormMessage className="text-red-500 text-sm mt-1">
                    {form.formState.errors.photo?.message?.toString()}
                  </FormMessage>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Full Name */}
                <div className="flex border-b border-gray-200 mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <UsersIconRound />
                    </div>
                    <div>
                      <p className="flex items-center text-18 font-medium text-gray-900">
                        Full Name<span className="ml-1 text-[#B3261E]">*</span>
                      </p>
                      <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">User's complete legal name.</p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px] ">
                              First Name<span className="ml-1 text-[#B3261E]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                className="h-12.5"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px] ">
                              Surname<span className="ml-1 text-[#B3261E]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                className="h-12.5"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="middle_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[14px] ">Middle Name</FormLabel>
                            <FormControl>
                              <Input
                                className="h-12.5"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex border-b border-gray-200 mb-0">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <EmailIcon />
                </div>
                <div>
                  <p className="flex items-center text-18 font-medium text-gray-900">
                    Email Address<span className="ml-1 text-[#B3261E]">*</span>
                  </p>
                  {/* <p className="bg-red md:min-w-40 md:max-w-55 text-sm text-[#444955] text-break">Business email address recommended.</p> */}
                  <p className=" md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] text-sm text-[#444955] break-words">
                    Business email address recommended.</p>
                </div>
              </div>
              <div className="w-1/2 py-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12.5"
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex border-b border-gray-200 mb-0">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="flex items-center text-base text-18 text-gray-900 font-medium">
                    Phone Number<span className="ml-1 text-[#B3261E]">*</span>
                  </p>
                  <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">Business phone number recommended.</p>
                </div>
              </div>
              <div className="w-1/2 py-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PhoneInputWithFlag
                          value={field.value}
                          className="border-gray-300"
                          onChange={(value) => field.onChange(value)}
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Account Type */}
            <div className="flex border-b border-gray-200 mb-0">
              <div className="flex w-1/2 items-center py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <AccountSettingIcon />
                </div>
                <div>
                  <p className="flex items-center text-18 font-medium text-gray-900">
                    Account Type<span className="ml-1 text-[#B3261E]">*</span>
                  </p>
                  <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">
                    Specifies the category or level of the user account.
                  </p>
                </div>
              </div>
              <div className="w-1/2 py-4">
                <FormField
                  control={form.control}
                  name="account_type"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            disabled={true}
                          >
                            <SelectTrigger
                              size="lg"
                              className="w-full rounded-md border border-gray-300 bg-white text-sm"
                            >
                              <SelectValue placeholder="Select account type">
                                {field.value}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {AccountTypeOptions.map((type) => (
                                  <SelectItem
                                    key={type.id}
                                    value={type.value?.toString() ?? ''}
                                    className="text-sm data-[highlighted]:bg-gray-50 h-12.5"
                                  >
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            {/* Role */}
            <div className="flex border-b border-gray-200 mb-0">
              <div className="flex w-1/2 items-start py-4">
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                  <RoleIcon
                    svgProps={{
                      width: '28',
                      height: '28',
                      stroke: '#2D3139',
                    }}
                  />
                </div>
                <div>
                  <p className="flex items-center text-18 font-medium text-gray-900">
                    Role<span className="ml-1 text-[#B3261E]">*</span>
                  </p>
                  <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">Permission group in the system</p>
                </div>
              </div>
              <div className="w-1/2 py-4">
                <FormField
                  control={form.control}
                  name="role_ids"
                  render={({ field }) => {
                    const selectedRoleNames = rolesData?.data
                      ?.filter((role) => field.value.includes(role.id.toString()))
                      .map((role) => role.name)
                      .join(', ');

                    return (
                      <FormItem>
                        <Select
                          value={
                            Array.isArray(field.value) && field.value.length > 0
                              ? field.value[0]
                              : undefined
                          }
                          onValueChange={(value: string) => {
                            const currentValue = Array.isArray(field.value)
                              ? field.value.filter((v) => v !== '')
                              : [];
                            if (value && !currentValue.includes(value)) {
                              const newRoles = [...currentValue, value];
                              field.onChange(newRoles);
                            }
                          }}
                          disabled={true}
                        >
                          <FormControl>
                            <div className="relative">
                              <SelectTrigger
                                size="lg"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white  text-sm"
                              >
                                <SelectValue placeholder="Select roles">
                                  {selectedRoleNames}
                                </SelectValue>
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                              {form.getValues('account_type') === 'Internal'
                                ? internalRolesData?.map((role, index) => (
                                  <SelectItem
                                    key={index}
                                    value={role?.id?.toString() ?? ''}
                                    className={`text-sm data-[highlighted]:bg-gray-50 ${Array.isArray(field.value) && field.value.includes(role.id?.toString() ?? '') ? 'opacity-50' : ''}`}
                                  >
                                    {role.name} {field.value.includes(role.id?.toString() && '✓')}
                                  </SelectItem>
                                ))
                                : externalRolesData?.map((role, index) => (
                                  <SelectItem
                                    key={index}
                                    value={role?.id?.toString() ?? ''}
                                    className={`text-sm data-[highlighted]:bg-gray-50 ${Array.isArray(field.value) && field.value.includes(role.id?.toString() ?? '') ? 'opacity-50' : ''}`}
                                  >
                                    {role.name} {field.value.includes(role.id?.toString() && '✓')}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {Array.isArray(field.value) && field.value.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {field.value
                              .filter((role: string) => role !== '')
                              .map((role: string) => {
                                return (
                                  <div
                                    key={role}
                                    className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm"
                                  >
                                    <span>{rolesData?.data?.[Number(role) - 1]?.name}</span>
                                    {field.value.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newRoles = field.value.filter(
                                            (r: string) => r !== role,
                                          );
                                          field.onChange(newRoles);
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                      >
                                        {/* × */}
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            {/* Division and Unit (for Internal users) */}
            {form.getValues('account_type') === 'Internal' && (
              <>
                {/* Division */}
                <div className="flex border-b border-gray-200 mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <EditDivisionIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-18 font-medium text-gray-900">
                        Division<span className="ml-1 text-[#B3261E]">*</span>
                      </p>
                      <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">
                        Department or business group assignment.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <FormField
                      control={form.control}
                      name="division"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            disabled={true}
                          >
                            <FormControl>
                              <div className="relative">
                                <SelectTrigger
                                  size="lg"
                                  className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm"
                                >
                                  <SelectValue placeholder="Select division">
                                    {field.value}
                                  </SelectValue>
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                {divisionData?.data?.map((division, index) => (
                                  <SelectItem
                                    key={index}
                                    value={division?.name ?? ''}
                                    className="text-sm data-[highlighted]:bg-gray-50"
                                  >
                                    {division?.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Unit */}
                <div className="flex mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <EditUnitIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-18 font-medium text-gray-900">
                        Unit<span className="ml-1 text-[#B3261E]">*</span>
                      </p>
                      <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">
                        Specific team or operational subgroup.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <FormField
                      control={form.control}
                      name="division_unit"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                              disabled={true}
                            >
                              <FormControl>
                                <div className="relative">
                                  <SelectTrigger
                                    size="lg"
                                    className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm"
                                  >
                                    <SelectValue placeholder="Select unit">
                                      {field.value}
                                    </SelectValue>
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {divisionUnitData?.data
                                    ?.filter(
                                      (unit) => unit?.division === form.getValues('division'),
                                    )
                                    ?.map((unit, index) => (
                                      <SelectItem
                                        key={index}
                                        value={unit.name || ''}
                                        className="text-sm data-[highlighted]:bg-gray-50"
                                      >
                                        {unit.name}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {form.getValues('account_type') === 'External' && getUserData && (
              <>
                {/* Verification Method */}
                <div className="flex border-b border-gray-200 mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <FileIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        Verification Method<span className="ml-1 text-[#B3261E]">*</span>
                      </p>
                      <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">
                        Process used to confirm user identity.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <FormField
                      control={form.control}
                      name="verificationMethod"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                              disabled={true}
                            >
                              <FormControl>
                                <div className="relative">
                                  <SelectTrigger
                                    size="lg"
                                    className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm"
                                  >
                                    <SelectValue placeholder="Select verification method">
                                      {field.value}
                                    </SelectValue>
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {VerificationMethodOptions.map((method) => (
                                    <SelectItem
                                      key={method.id}
                                      value={method.value?.toString() ?? ''}
                                      className="text-sm data-[highlighted]:bg-gray-50"
                                    >
                                      {method.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Verification Document */}
                <div className="flex mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <FileIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        File<span className="ml-1 text-[#B3261E]">*</span>
                      </p>
                      <p className="text-sm text-[#444955] md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">
                        Uploaded document or attachment related to the account.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <FormField
                      control={form.control}
                      name="verification_document"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center justify-start gap-3">
                              {/* Show existing document name from API */}
                              {typeof form.getValues('verification_document') === 'string' &&
                                form.getValues('verification_document') && (
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      const baseUrl = form.getValues('verification_document');
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
                                    className="cursor-pointer"
                                  >
                                    <span className="text-lg text-[#671513] hover:underline">
                                      File
                                    </span>
                                  </a>
                                )}
                              {/* Show newly uploaded file name */}
                              {field.value instanceof File && (
                                <label className="mt-3 cursor-pointer flex items-center">
                                  <PdfIcon />
                                  <span className="text-lg text-[#671513] justify-start  gap-2">
                                    {field.value.name.length > 20
                                      ? field.value.name.slice(0, 20) + '...'
                                      : field.value.name}
                                  </span>
                                </label>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-full px-6 text-white hover:text-white my-3"
                                style={{
                                  background: 'linear-gradient(90deg, #B9971B 0%, #E9C75E 100%)',
                                }}
                                asChild
                              >
                                <label className="cursor-pointer ">
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png"
                                    onChange={(e) =>
                                      handleImageUpload(
                                        e,
                                        form,
                                        'verification_document',
                                        // handleSetFileData,
                                      )
                                    }
                                  />
                                  {form.getValues('verification_document') || field.value
                                    ? 'Re-upload'
                                    : 'Upload'}
                                </label>
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Account Security Section */}
            {getUserData?.id === myData?.id && (
              <>
                <h2 className="mt-8 text-xl font-semibold text-gray-800">Account Security</h2>

                {/* MFA */}
                <div className="flex border-b border-gray-200 mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <EditMultiAuthIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        Multi-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-600">Extra security status for login.</p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <FormField
                      control={form.control}
                      name="mfa_enabled"
                      disabled={!myData?.role_ids?.includes(1)}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              value={field.value ? 'Enabled' : 'Disabled'}
                              onValueChange={(value) => {
                                const isEnabled = value === 'Enabled';
                                field.onChange(isEnabled);
                              }}
                              disabled={true}
                            >
                              <SelectTrigger
                                size="lg"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm"
                              >
                                <SelectValue placeholder="Select MFA status" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {MFAOptions.map((option) => (
                                    <SelectItem
                                      key={option.id}
                                      value={option.value?.toString() ?? ''}
                                      className="text-sm data-[highlighted]:bg-gray-50"
                                    >
                                      {option.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Preferred Method */}
                <div className="flex border-b border-gray-200 mb-0">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <EditPreferLoginMethodIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        Preferred Method on Login
                      </p>
                      <p className="text-sm text-gray-600 md:min-w-[10rem] md:max-w-[13.75rem] lg:min-w-[15rem] break-words">
                        Default method used for authentication.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4">
                    <FormField
                      control={form.control}
                      name="mfa_method"
                      disabled={!myData?.role_ids?.includes(1)}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              value={field.value || ''}
                              onValueChange={(value) => {
                                field.onChange(value);
                              }}
                              disabled={true}
                            >
                              <SelectTrigger
                                size="lg"
                                className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm"
                              >
                                <SelectValue placeholder="Select preferred method">
                                  {PreferredMethodOptions.find(
                                    (option) =>
                                      String(option?.value).toLowerCase() ===
                                      String(field.value).toLowerCase(),
                                  )?.name || field.value}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectGroup>
                                  {PreferredMethodOptions.map((option) => {
                                    return (
                                      <SelectItem
                                        key={option.id}
                                        value={option.value?.toString() ?? ''}
                                        className="text-sm data-[highlighted]:bg-gray-50"
                                      >
                                        {option.name}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex">
                  <div className="flex w-1/2 items-center py-4">
                    <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-lg bg-[#F5F5F6]">
                      <EditPasswordIcon />
                    </div>
                    <div>
                      <p className="flex items-center text-base font-medium text-gray-900">
                        Password
                      </p>
                      <p className="text-sm text-gray-600">
                        Secure credentials for account access.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 py-4 flex items-center">
                    <Button className="bg-gradient-to-r from-[#9B7C0D] to-[#EDCA4E] text-white px-6 py-2 rounded-md">
                      Reset Password
                    </Button>
                  </div>
                </div>
              </>
            )}

            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                className=" hover:bg-[#A39149] px-6 text-base text-white "
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
