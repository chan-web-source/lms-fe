import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import NoImgIcon from '~/assets/images/no-img-icon.jpg';
import {
  BackIcon,
  DivisionIcon,
  EmailIcon,
  RoleIcon,
  SecuritySettingsIcon,
  UnitIcon,
  UserManagementDashboardIcon,
  UsersIconRound,
} from '~/assets/icons';
import PageHeader from '~/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  userFormSchema,
  externalFormSchema,
  type UserFormValues,
  InternalUserFormSchema,
} from '../schema/create-user-schema';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import type { AccountType } from '~/types/user.types';
import { AccountTypeOptions, VerificationMethodOptions } from '~/lib/user-management-data';
import { handleImageUpload } from '~/lib/formFilling';
import PhoneInputWithFlag from '~/components/comp-46';
import { CirclePlus } from 'lucide-react';
import { useAddUser } from '../hooks/use-add-user';
import { useGetRoles } from '../hooks/use-get-roles';
import { useGetDivisionUnits } from '../hooks/use-get-division-units';
import { useGetDivisions } from '../hooks/use-get-divisions';
import type { DropDownData } from '~/types/management';

const CreateNewUser = () => {
  const navigate = useNavigate();
  const { mutate } = useAddUser();
  const { data: rolesData } = useGetRoles();
  const { data: divisionData } = useGetDivisions();
  const { data: divisionUnitData } = useGetDivisionUnits();
  const [internalRolesData, setInternalRolesData] = useState<DropDownData[] | undefined>(undefined);
  const [externalRolesData, setExternalRolesData] = useState<DropDownData[] | undefined>(undefined);

  useEffect(() => {
    setInternalRolesData(
      rolesData?.data?.filter((role) => role.name !== 'License User') as unknown as DropDownData[],
    );
    setExternalRolesData(
      rolesData?.data?.filter((role) => role.name === 'License User') as unknown as DropDownData[],
    );
  }, [rolesData]);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      photo: undefined,
      verification_document: undefined,
      first_name: '',
      middle_name: '',
      surname: '',
      email: '',
      phone_code: '+1',
      phone: '',
      account_status: true,
      mfa_enabled: true,
      account_type: 'Internal',
      role_ids: [],
      division: 'Licensing & Supervision',
      division_unit: 'Licensing',
      verificationMethod: 'Passport',
    },
  });

  useEffect(() => {
    const division = form.watch('division') || 'Licensing & Supervision';
    const units = divisionUnitData?.data?.filter((unit) => unit?.division === division);
    const firstUnitValue = units?.[0]?.name?.toString();

    if (firstUnitValue) {
      form.setValue('division_unit', firstUnitValue, { shouldValidate: true });
    }
  }, [form.watch('division'), divisionUnitData?.data]);

  // Set default division unit when division changes
  useEffect(() => {
    const division = form.watch('division');
    if (division) {
      const units = divisionUnitData?.data?.filter((unit) => unit?.division === division);
      const firstUnitValue = units?.[0]?.name?.toString();

      if (firstUnitValue) {
        form.setValue('division_unit', firstUnitValue, { shouldValidate: true });
      }
    }
  }, [form.watch('division'), divisionUnitData?.data]);

  // Update role_ids and verification method when account_type changes
  useEffect(() => {
    const accountType = form.watch('account_type');
    const currentRoles = form.getValues('role_ids');

    // Set verification method for External accounts
    if (accountType === 'External') {
      const currentVerificationMethod = form.getValues('verificationMethod');
      if (!currentVerificationMethod || currentVerificationMethod !== 'Passport') {
        form.setValue('verificationMethod', 'Passport', { shouldValidate: true });
      }
    }

    // Function to check if roles are appropriate for the account type
    const correctRoles = checkCorrectRoles(currentRoles, accountType);

    // If roles don't match the account type or no roles are selected, set default role
    if (accountType && (!correctRoles || !currentRoles || currentRoles.length === 0)) {
      const defaultRoleId =
        accountType === 'Internal'
          ? ((internalRolesData && internalRolesData[0]?.id) ?? '')
          : ((externalRolesData && externalRolesData[0]?.id) ?? '');
      form.setValue('role_ids', [defaultRoleId.toString()], { shouldValidate: true });
      form.clearErrors('role_ids');
    }
  }, [form.watch('account_type'), internalRolesData, externalRolesData]);

  useEffect(() => {
    const division = form.watch('division');
    if (division) {
      const units = divisionUnitData?.data?.filter((unit) => unit?.division === division);
      const firstUnitValue = units?.[0]?.name?.toString();

      if (firstUnitValue) {
        form.setValue('division_unit', firstUnitValue, { shouldValidate: true });
      }
    }
  }, [form.watch('division'), divisionUnitData?.data]);

  const checkCorrectRoles = (currentRoles: string[], accountType: string): boolean => {
    // If no roles selected or role data not loaded yet, return true (no validation error)
    if (!currentRoles || currentRoles.length === 0 || !internalRolesData || !externalRolesData) {
      return true;
    }

    if (accountType === 'Internal') {
      // For Internal account type, all roles should be from internalRolesData
      // and none should be from externalRolesData
      const internalRoleIds = internalRolesData.map((role) => role.id?.toString());
      return (
        currentRoles.every((roleId) => internalRoleIds.includes(roleId)) &&
        !currentRoles.some((roleId) =>
          externalRolesData.map((role) => role.id?.toString()).includes(roleId),
        )
      );
    } else if (accountType === 'External') {
      // For External account type, all roles should be from externalRolesData
      // and none should be from internalRolesData
      const externalRoleIds = externalRolesData.map((role) => role.id?.toString());
      return (
        currentRoles.every((roleId) => externalRoleIds.includes(roleId)) &&
        !currentRoles.some((roleId) =>
          internalRolesData.map((role) => role.id?.toString()).includes(roleId),
        )
      );
    }

    // If account type is neither Internal nor External, return true (no validation)
    return true;
  };

  const onSubmit = async (data: UserFormValues) => {
    try {
      // Validate form data
      const validationResult = userFormSchema.safeParse(data);
      const validationExternalResult = externalFormSchema.safeParse(data);
      const validationInternalResult = InternalUserFormSchema.safeParse(data);

      if (data.account_type === 'External' && !validationExternalResult.success) {
        validationExternalResult.error.errors.forEach((error) => {
          form.setError(error.path[0] as keyof UserFormValues, {
            type: 'manual',
            message: error.message,
          });
        });
        return;
      } else if (data.account_type === 'Internal' && !validationInternalResult.success) {
        validationInternalResult.error.errors.forEach((error) => {
          form.setError(error.path[0] as keyof UserFormValues, {
            type: 'manual',
            message: error.message,
          });
        });
        return;
      }
      if (!validationResult.success) {
        console.error('Validation errors:', validationResult.error.errors);
        return;
      }
      const formData = new FormData();
      if (data.photo) {
        formData.append('photo', data.photo);
      }
      if (
        data.account_type === 'External' &&
        data.verification_document &&
        data.verification_document instanceof File
      ) {
        formData.append('verification_document', data.verification_document);
        formData.append('verification_method', data?.verificationMethod ?? '');
      }

      if (data.account_type === 'Internal') {
        formData.append('division', data.division ?? '');
        formData.append('division_unit', data.division_unit ?? '');
      }

      // Append primitive values
      formData.append('mfa_method', 'email');
      formData.append('first_name', data.first_name);
      formData.append('middle_name', data.middle_name ?? '');
      formData.append('surname', data.surname);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('account_status', data.account_status ? 'Active' : 'Inactive');
      formData.append('account_type', data.account_type);

      // Append role_ids
      if (Array.isArray(data.role_ids) && data.role_ids.length > 0) {
        formData.append('role_ids', data.role_ids.join(', '));
      }

      mutate(formData);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="User Management / Create User" icon={<UserManagementDashboardIcon />} />
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <div className="mb-10">
              <h2 className="mb-8 text-[22px] font-medium text-gray-900">User Personal Details</h2>

              {/* Image Upload Section */}
              <div className="mb-4.5 flex flex-wrap items-start gap-4">
                <Avatar className="h-16 w-16 border border-gray-200 bg-gray-100">
                  <AvatarImage
                    src={
                      form.watch('photo')
                        ? URL.createObjectURL(form.watch('photo') as File)
                        : NoImgIcon
                    }
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl">CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-base text-[#0E121B] font-medium text-[16px]">Upload Image</p>
                  <p className="text-sm text-[#525866]">Min 400x400px, PNG or JPEG</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-base font-medium text-[#525866] bg-white border-[#E1E4EA] p-2 rounded-[6px] hover:bg-gray-100"
                    asChild
                  >
                    <label className="cursor-pointer text-[14px] px-2.5">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleImageUpload(e, form, 'photo')}
                      />
                      Upload
                    </label>
                  </Button>
                  <FormMessage className="text-red-500 text-sm mt-1">
                    {form.formState.errors.photo?.message?.toString()}
                  </FormMessage>
                </div>
              </div>

              {/* Personal Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base font-medium text-gray-900">
                        First Name <span className="text-[#B3261E]">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UsersIconRound
                            svgProps={{
                              className:
                                'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500',
                            }}
                          />
                          <Input
                            placeholder="Enter first name"
                            className={cn(
                              'h-12 w-full rounded-[6px] border border-gray-300 bg-white pl-10 text-base font-medium',
                              form.formState.errors.first_name
                                ? 'border-red-500'
                                : 'border-gray-300',
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[20px] mt-1">
                        <FormMessage className="text-red-500 text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base font-medium text-gray-900">
                        Surname <span className="text-[#B3261E]">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UsersIconRound
                            svgProps={{
                              className:
                                'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500',
                            }}
                          />
                          <Input
                            placeholder="Enter surname"
                            className={cn(
                              'h-12 w-full rounded-[6px] border border-gray-300 bg-white pl-10 text-base font-medium',
                              form.formState.errors.surname ? 'border-red-500' : 'border-gray-300',
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[20px] mt-1">
                        <FormMessage className="text-red-500 text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base font-medium text-gray-900">
                        Middle Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UsersIconRound
                            svgProps={{
                              className:
                                'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500',
                            }}
                          />
                          <Input
                            placeholder="Enter middle name"
                            className={cn(
                              'h-12 w-full rounded-[6px] border border-gray-300 bg-white pl-10 text-base font-medium',
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[20px] mt-1">
                        <FormMessage className="text-red-500 text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-base font-medium text-gray-900">
                        Email Address
                        <span className="text-[#B3261E]">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <EmailIcon
                            svgProps={{
                              className:
                                'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500',
                            }}
                          />
                          <Input
                            type="email"
                            placeholder="Enter organization email"
                            className={cn(
                              'h-12 w-full rounded-[6px] border border-gray-300 bg-white pl-10 text-base font-medium',
                              form.formState.errors.email ? 'border-red-500' : 'border-gray-300',
                            )}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[20px] mt-1">
                        <FormMessage className="text-red-500 text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" block text-base font-medium text-gray-900">
                        Phone Number <span className="text-[#B3261E]">*</span>
                      </FormLabel>
                      <FormControl>
                        <PhoneInputWithFlag
                          value={field.value}
                          className="border-gray-300"
                          onChange={(value) => field.onChange(value)}
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <div className="min-h-[20px] mt-1">
                        <FormMessage className="text-red-500 text-sm" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <hr className="border-t border-gray-200 my-6.5" />

            <div>
              <h2 className="mb-4 text-[22px] font-medium text-gray-900">User Function Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="account_type"
                  render={({ field }) => (
                    <FormItem className="py-3">
                      <FormLabel className="block text-base font-medium text-gray-900 my-0 py-0">
                        Account Type <span className="text-[#B3261E]">*</span>
                      </FormLabel>
                      <div className="relative">
                        <Select
                          value={field.value}
                          onValueChange={(value: AccountType) => {
                            field.onChange(value);
                            if (value === 'External') {
                              form.setValue('role_ids', ['1']);
                            }
                          }}
                        >
                          <FormControl>
                            <div className="relative">
                              <SecuritySettingsIcon
                                svgProps={{
                                  className:
                                    'absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-gray-500 pointer-events-none font-[400]',
                                }}
                              />
                              <SelectTrigger
                                className={cn(
                                  'h-full w-full rounded-[6px] border border-gray-300 bg-white pl-10 py-6 text-base font-[400]',
                                  form.formState.errors.account_type
                                    ? 'border-red-500'
                                    : 'border-gray-300',
                                )}
                              >
                                <SelectValue placeholder="Select account type" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent className="bg-white" position="popper" sideOffset={0}>
                            <SelectGroup>
                              {AccountTypeOptions.map((type) => (
                                <SelectItem
                                  key={type.id}
                                  value={type.value?.toString() ?? ''}
                                  className="text-sm data-[highlighted]:bg-gray-50 h-10 flex items-center pl-8 font-[400]"
                                >
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="min-h-[20px] mt-1">
                        <FormMessage className="text-red-500 text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role_ids"
                  render={({ field }) => {
                    // Clear form error when roles are selected
                    if (field.value?.length > 0 && form.formState.errors.role_ids) {
                      form.clearErrors('role_ids');
                    }
                    const selectedRoleNames = (
                      form.watch('account_type') === 'Internal'
                        ? internalRolesData
                        : externalRolesData
                    )
                      ?.filter((role) => field.value?.includes(role.id.toString()))
                      ?.map((role) => role.name)
                      .join(', ');
                    return (
                      <FormItem className="py-3">
                        <FormLabel className="block text-base font-medium text-gray-900">
                          Role <span className="text-[#B3261E]">*</span>
                        </FormLabel>
                        <div className="relative">
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
                          >
                            <FormControl>
                              <div className="relative">
                                <RoleIcon
                                  svgProps={{
                                    className:
                                      'absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-gray-500 pointer-events-none ',
                                  }}
                                />
                                <SelectTrigger
                                  className={cn(
                                    'h-full w-full rounded-[6px] border border-gray-300 bg-white pl-10 py-6 text-base font-[400] [&>span]:text-black-200',
                                    form.formState.errors.role_ids
                                      ? 'border-red-500'
                                      : 'border-gray-300',
                                  )}
                                >
                                  <SelectValue
                                    placeholder="Select roles"
                                    className={cn('font-[400]')}
                                  >
                                    {selectedRoleNames?.length && selectedRoleNames?.length > 25
                                      ? `${selectedRoleNames.slice(0, 25)}...`
                                      : selectedRoleNames}
                                  </SelectValue>
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                {form.watch('account_type') === 'Internal'
                                  ? // if account type is internal, show internal roles
                                    internalRolesData?.map((role, index) => (
                                      <SelectItem
                                        key={index}
                                        value={role?.id?.toString() ?? ''}
                                        className="text-sm data-[highlighted]:bg-gray-50 h-10 flex items-center pl-8"
                                        disabled={field.value.includes(role.id?.toString() ?? '')}
                                      >
                                        {role.name}
                                      </SelectItem>
                                    ))
                                  : // if account type is external, show external roles
                                    externalRolesData?.map((role, index) => (
                                      <SelectItem
                                        key={index}
                                        value={role?.id?.toString() ?? ''}
                                        className="text-sm data-[highlighted]:bg-gray-50 h-10 flex items-center pl-8"
                                        disabled={field.value.includes(role.id?.toString() ?? '')}
                                      >
                                        {role.name}
                                      </SelectItem>
                                    ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {field.value.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1">
                              <div className="flex flex-wrap gap-2">
                                {field.value.map((role: string) => (
                                  <div
                                    key={role}
                                    className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm"
                                  >
                                    <span>
                                      {
                                        (form.watch('account_type') === 'Internal'
                                          ? internalRolesData
                                          : externalRolesData
                                        )?.find((r) => r.id.toString() === role)?.name
                                      }
                                    </span>
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
                                        ×
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="min-h-[20px] mt-1">
                          <FormMessage className="text-red-500 text-sm" />
                        </div>
                      </FormItem>
                    );
                  }}
                />

                {form.watch('account_type') === 'Internal' && (
                  <>
                    <FormField
                      control={form.control}
                      name="division"
                      render={({ field }) => (
                        <FormItem className="py-3">
                          <FormLabel className="block text-base font-medium text-gray-900">
                            Division <span className="text-[#B3261E]">*</span>
                          </FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <div className="relative">
                                <DivisionIcon
                                  svgProps={{
                                    className:
                                      'absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500',
                                  }}
                                />
                                <SelectTrigger className="h-full w-full rounded-[6px] border border-gray-300 bg-white pl-10 py-6 text-base font-[400]">
                                  <SelectValue placeholder="Select division" />
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
                          <div className="min-h-[20px] mt-1">
                            <FormMessage className="text-red-500 text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="division_unit"
                      render={({ field }) => (
                        <FormItem className="py-2">
                          <FormLabel className="block text-base font-medium text-gray-900">
                            Unit <span className="text-[#B3261E]">*</span>
                          </FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <div className="relative">
                                <UnitIcon
                                  svgProps={{
                                    className:
                                      'absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500',
                                  }}
                                />
                                <SelectTrigger className="h-full w-full rounded-[6px] border border-gray-300 bg-white pl-10 py-6 text-base font-[400]">
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                {divisionUnitData?.data
                                  ?.filter(
                                    (unit) =>
                                      unit?.division ===
                                      (form.watch('division') || 'Licensing & Supervision'),
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
                          <div className="min-h-[20px] mt-1">
                            <FormMessage className="text-red-500 text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {form.watch('account_type') === 'External' && (
                  <>
                    <FormField
                      control={form.control}
                      name="verificationMethod"
                      render={({ field }) => (
                        <FormItem className="py-2">
                          <FormLabel className="block text-base font-medium text-gray-900">
                            Verification Method <span className="text-[#B3261E]">*</span>
                          </FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <div className="relative">
                                <UnitIcon
                                  svgProps={{
                                    className:
                                      'absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500',
                                  }}
                                />
                                <SelectTrigger className="h-full w-full rounded-[6px] border border-gray-300 bg-white pl-10 py-6 text-base font-[400]">
                                  {' '}
                                  <SelectValue placeholder="Select verification method" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                {VerificationMethodOptions.map((method) => (
                                  <SelectItem
                                    key={method.id}
                                    value={method.value?.toString() ?? ''}
                                    className="text-sm data-[highlighted]:bg-gray-50 h-10 flex items-center pl-8 font-[400]"
                                  >
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <div className="min-h-[20px] mt-1">
                            <FormMessage className="text-red-500 text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="verification_document"
                      render={() => (
                        <FormItem className="py-2">
                          <FormLabel className="block text-base font-medium text-gray-900">
                            File <span className="text-[#B3261E]">*</span>
                          </FormLabel>
                          <FormControl>
                            <div
                              className="flex h-12 items-center w-full border border-gray-300 rounded-[6px] bg-white px-4 cursor-pointer transition hover:shadow-sm"
                              onClick={() => document.getElementById('file-upload-input')?.click()}
                            >
                              <span className="flex-1 text-lg text-gray-600">
                                {form.watch('verification_document')?.name ||
                                  'Click to upload document'}
                              </span>
                              <Button
                                className="p-2 px-6 py-2 text-white hover:text-white my-2"
                                style={{
                                  background: 'linear-gradient(90deg, #B9971B 0%, #E9C75E 100%)',
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  document.getElementById('file-upload-input')?.click();
                                }}
                              >
                                {form.watch('verification_document') ? 'Re-upload' : 'Upload'}
                              </Button>
                              <input
                                id="file-upload-input"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,application/pdf"
                                onChange={(e) =>
                                  handleImageUpload(e, form, 'verification_document')
                                }
                              />
                            </div>
                          </FormControl>
                          <div className="min-h-[20px] mt-1">
                            <FormMessage className="text-red-500 text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="px-6.5">
                <span className="flex items-center gap-2">
                  <CirclePlus />
                  Add Account
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* <UserList /> */}
    </div>
  );
};

export default CreateNewUser;
