import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { BackIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import {
  additionalInformationSchema,
  addressOfBranchSchema,
  contactPersonSchema,
  corporationSchema,
  directorsSchema,
  physicalAddressSchema,
  postalAddressSchema,
  preferredAddressSchema,
  secretariesSchema,
  shareholdersListSchema,
  type additionalInformationFormData,
  type addressOfBranchFormData,
  type contactPersonFormData,
  type CorporationFormData,
  type directorsFormData,
  type physicalAddressFormData,
  type postalAddressFormData,
  type preferredAddressFormData,
  type secretariesFormData,
  type shareholdersListFormData,
} from '../../../schema/create-application';

import CorporationDetail from './corporation-detail';
import DirectorsList from './directors-list';
import SecretariesList from './secretaries -list';
import ShareholdersList from './shareholders-list';
import ContactPerson from './contact-person';
import PhysicalAddress from './physical-address';
import AddressOfBranch from './address-of-branch';
import PostalAddress from './postal-address';
import AdditionalInformation from './additional-information';
import type { z } from 'zod';
import { toast } from 'react-toastify';
import { useCreateCorporateDirector } from '../hooks/use-create-corporate-director';
import {
  useGetCorporateDirectors,
  type GetCorporateDirectorsParams,
} from '../hooks/use-get-corporate-director-list';
import useTableFIlter from '~/hooks/use-table-filters';
import { useDeleteCorporateDirector } from '../hooks/use-delete-corporate-director';
import { useCreateCorporateSecretaries } from '../hooks/use-create-corporate-secretaries';
import { useGetCorporateSecretaries } from '../hooks/use-get-corporate-secretaries';
import { useCreateCorporateShareholders } from '../hooks/use-create-corporate-shareholders';
import { useGetCorporateShareholders } from '../hooks/use-get-corporate-shareholders';
import { useDeleteCorporateSecretary } from '../hooks/use-delete-corporate-secretary';
import { useDeleteCorporateShareholder } from '../hooks/use-delete-corporate-shareholders';
import { useCreateCorporateApplication } from '../hooks/use-create-corporate-application';
import Cookies from 'js-cookie';
import { useGetOneApplicationDraft } from '../../../hooks/use-get-one-applocation-draft';
import { useGetCorporateApplication } from '../hooks/use-get-one-corporate-application';
import { useCreateAdditionalDocument } from '../hooks/use-create-additional-document';
import { useUpdateCorporateApplication } from '../hooks/use-update-corporate-application';
import { useSaveApplicationDraft } from '../hooks/use-save-application';

const ForCorporation = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const navigate = useNavigate();
  const applicationId = Cookies.get('application_draft') || '';
  const corpId = Cookies.get('corporation_id');
  const { data: draft } = useGetOneApplicationDraft(applicationId);
  const [isLoading, setIsLoading] = useState(false);
  const corporationApplicantId = draft?.corporation_applicant_id || Number(corpId);

  const { data: corporationDetail, refetch } = useGetCorporateApplication(
    typeof corporationApplicantId === 'number' && corporationApplicantId > 0
      ? corporationApplicantId
      : undefined,
  );

  const directorsTableFilter = useTableFIlter();
  const secretariesTableFilter = useTableFIlter();
  const shareholdersTableFilter = useTableFIlter();

  const { mutateAsync: directorMutate, isPending: isDirectorPending } =
    useCreateCorporateDirector();
  const { mutateAsync: deleteDirector } = useDeleteCorporateDirector();
  const { mutateAsync: deleteSecretary } = useDeleteCorporateSecretary();
  const { mutateAsync: deleteShareholder } = useDeleteCorporateShareholder();
  const { mutateAsync: secretaryMutate, isPending: isSecretaryPending } =
    useCreateCorporateSecretaries();
  const { mutateAsync: addAdditionalDoc, isPending: uploadAdditionalDocPending } =
    useCreateAdditionalDocument();
  const { mutateAsync: shareholdersMutate, isPending: isShareholderPending } =
    useCreateCorporateShareholders();
  const { mutateAsync: corporateMutate, isPending } = useCreateCorporateApplication();
  const { mutateAsync: updateCorporateMutate, isPending: updatePending } =
    useUpdateCorporateApplication(corpId ?? '');
  const { saveDraft } = useSaveApplicationDraft();

  const directorQueryParams: GetCorporateDirectorsParams = useMemo(
    () => ({
      order_by: directorsTableFilter.orderBy,
      order_dir: directorsTableFilter.orderDir,
    }),
    [directorsTableFilter.orderBy, directorsTableFilter.orderDir],
  );

  const secretariesQueryParams: GetCorporateDirectorsParams = useMemo(
    () => ({
      order_by: secretariesTableFilter.orderBy,
      order_dir: secretariesTableFilter.orderDir,
    }),
    [secretariesTableFilter.orderBy, secretariesTableFilter.orderDir],
  );

  const shareholdersQueryParams: GetCorporateDirectorsParams = useMemo(
    () => ({
      order_by: shareholdersTableFilter.orderBy,
      order_dir: shareholdersTableFilter.orderDir,
    }),
    [shareholdersTableFilter.orderBy, shareholdersTableFilter.orderDir],
  );

  const { refetch: directoryRefetch, data: directorsData } =
    useGetCorporateDirectors(directorQueryParams);
  const directorList = directorsData?.data || [];

  const { refetch: secretariesRefetch, data: secretariesData } =
    useGetCorporateSecretaries(secretariesQueryParams);
  const secretariesList = secretariesData?.data || [];

  const { refetch: shareholdersRefetch, data: shareholdersData } =
    useGetCorporateShareholders(shareholdersQueryParams);
  const shareholdersList = shareholdersData?.data || [];

  const corporationDetailForm = useForm<CorporationFormData>({
    resolver: zodResolver(corporationSchema),
    values: {
      corporationName: corporationDetail?.name ?? '',
      ipaRegistrationNumber: corporationDetail?.ipa_registration_number ?? '',
      ipaExtract: corporationDetail?.ipa_extract_document ?? '',
      businessName: corporationDetail?.business_name ?? '',
    },
    mode: 'onChange',
  });

  const directorsForm = useForm<directorsFormData>({
    resolver: zodResolver(directorsSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      middleName: '',
    },
    mode: 'onChange',
  });

  const preferredAddressForm = useForm<preferredAddressFormData>({
    resolver: zodResolver(preferredAddressSchema),
    values: {
      type:
        corporationDetail?.preferred_address_of_service ||
        'physical_address_of_principle_place_of_business',
    },
    mode: 'onChange',
  });

  const secretariesForm = useForm<secretariesFormData>({
    resolver: zodResolver(secretariesSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      middleName: '',
    },
    mode: 'onChange',
  });

  const shareHoldersForm = useForm<shareholdersListFormData>({
    resolver: zodResolver(shareholdersListSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      middleName: '',
      numberOfSharesHeld: 0,
      typeofShareHeld: '',
    },
    mode: 'onChange',
  });

  const contactPersonForm = useForm<contactPersonFormData>({
    resolver: zodResolver(contactPersonSchema),
    values: {
      firstName: corporationDetail?.contact_first_name ?? '',
      surname: corporationDetail?.contact_surname ?? '',
      middleName: corporationDetail?.contact_surname ?? '',
      preferredEmailForService: corporationDetail?.email_for_service ?? '',
      phoneNumber: corporationDetail?.phone_for_service ?? '',
    },
    mode: 'onChange',
  });

  const physicalAddressForm = useForm<physicalAddressFormData>({
    resolver: zodResolver(physicalAddressSchema),
    values: {
      address1: corporationDetail?.physical_address_of_principle_place_of_business_line1 ?? '',
      address2: corporationDetail?.physical_address_of_principle_place_of_business_line2 ?? '',
      postalCode:
        corporationDetail?.physical_address_of_principle_place_of_business_postal_code ?? '',
      city: corporationDetail?.physical_address_of_principle_place_of_business_city ?? '',
      province: corporationDetail?.physical_address_of_principle_place_of_business_province ?? '',
      country:
        corporationDetail?.physical_address_of_principle_place_of_business_country ??
        'Papua New Guinea',
    },
    mode: 'onChange',
  });

  const postAddressForm = useForm<postalAddressFormData>({
    resolver: zodResolver(postalAddressSchema),
    defaultValues: {
      address1: '',
      address2: '',
      postalCode: '',
      city: '',
      province: '',
      country: 'Papua New Guinea',
    },
  });

  const addressOfBranchForm = useForm<addressOfBranchFormData>({
    resolver: zodResolver(addressOfBranchSchema),
    values: {
      address1: corporationDetail?.address_of_branch_where_business_is_conducted_line1 ?? '',
      address2: corporationDetail?.address_of_branch_where_business_is_conducted_line2 ?? '',
      postalCode:
        corporationDetail?.address_of_branch_where_business_is_conducted_postal_code ?? '',
      city: corporationDetail?.address_of_branch_where_business_is_conducted_city ?? '',
      province: corporationDetail?.address_of_branch_where_business_is_conducted_province ?? '',
      country:
        corporationDetail?.address_of_branch_where_business_is_conducted_country ??
        'Papua New Guinea',
    },
    mode: 'onChange',
  });

  const additionalInformationForm = useForm<additionalInformationFormData>({
    resolver: zodResolver(additionalInformationSchema),
    values: {
      additionalInfo: corporationDetail?.additional_information ?? '',
      additionalSupportDocs: [],
    },
    mode: 'onChange',
  });

  const isDisable =
    !corporationDetailForm.formState.isValid &&
    !physicalAddressForm.formState.isValid &&
    !addressOfBranchForm.formState.isValid &&
    !additionalInformationForm.formState.isValid;

  const saveDirectors = async (values: z.infer<typeof directorsSchema>) => {
    try {
      const res = await directorMutate({
        first_name: values.firstName,
        surname: values.surname,
        middle_name: values.middleName,
        corporation_applicant_id: Number(corpId) || undefined,
      });
      if (res.id) {
        directoryRefetch();
        directorsForm.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save directors');
    }
  };

  const saveSecretaries = async (values: z.infer<typeof secretariesSchema>) => {
    try {
      const res = await secretaryMutate({
        first_name: values.firstName,
        surname: values.surname,
        middle_name: values.middleName,
        corporation_applicant_id: Number(corpId) || undefined,
      });
      if (res.id) {
        secretariesRefetch();
        secretariesForm.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save secretaries');
    }
  };

  const saveShareHolder = async (values: z.infer<typeof shareholdersListSchema>) => {
    try {
      const res = await shareholdersMutate({
        first_name: values.firstName,
        surname: values.surname,
        middle_name: values.middleName,
        number_of_shares: Number(values.numberOfSharesHeld),
        type_of_shares: values.typeofShareHeld,
        corporation_applicant_id: Number(corpId) || undefined,
      });
      if (res.id) {
        shareholdersRefetch();
        shareHoldersForm.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save shareholders');
    }
  };

  const handleSubmitCorporation = async () => {
    try {
      const formData = new FormData();
      const corp = corporationDetailForm.getValues();
      const contact = contactPersonForm.getValues();
      const physical = physicalAddressForm.getValues();
      const branch = addressOfBranchForm.getValues();
      const info = additionalInformationForm.getValues();
      const preferredAddress = preferredAddressForm.getValues();

      formData.append('name', corp.corporationName);
      if (corp?.businessName) {
        formData.append('business_name', corp?.businessName);
      }
      formData.append('ipa_registration_number', corp.ipaRegistrationNumber);
      formData.append('ipa_extract_document', corp.ipaExtract);

      formData.append('contact_first_name', contact.firstName);
      formData.append('contact_surname', contact.surname);
      formData.append('email_for_service', contact.preferredEmailForService);
      formData.append('phone_for_service', contact.phoneNumber);
      formData.append('preferred_address_of_service', preferredAddress.type);

      formData.append('physical_address_of_principle_place_of_business_line1', physical.address1);
      if (physical.address2) {
        formData.append('physical_address_of_principle_place_of_business_line2', physical.address2);
      }
      if (physical.postalCode) {
        formData.append(
          'physical_address_of_principle_place_of_business_postal_code',
          physical.postalCode,
        );
      }
      formData.append('physical_address_of_principle_place_of_business_city', physical.city);
      formData.append(
        'physical_address_of_principle_place_of_business_province',
        physical.province,
      );
      formData.append('physical_address_of_principle_place_of_business_country', physical.country);

      formData.append('address_of_branch_where_business_is_conducted_line1', branch.address1);
      if (branch.address2) {
        formData.append('address_of_branch_where_business_is_conducted_line2', branch.address2);
      }
      if (branch.postalCode) {
        formData.append(
          'address_of_branch_where_business_is_conducted_postal_code',
          branch.postalCode,
        );
      }
      formData.append('address_of_branch_where_business_is_conducted_city', branch.city);
      formData.append('address_of_branch_where_business_is_conducted_province', branch.province);
      formData.append('address_of_branch_where_business_is_conducted_country', branch.country);

      formData.append('additional_information', info.additionalInfo);
      formData.append('license_application_id', applicationId || '');

      const directorIds = directorList?.map((director) => director.id) ?? [];
      if (directorIds.length > 0) {
        formData.append('director_ids', directorIds.join(','));
      }
      const secretariesIds = secretariesList?.map((secretary) => secretary.id) ?? [];
      if (secretariesIds.length > 0) {
        formData.append('secretary_ids', secretariesIds.join(','));
      }
      const shareholdersIds = shareholdersList?.map((holder) => holder.id) ?? [];
      if (shareholdersIds.length > 0) {
        formData.append('shareholder_ids', shareholdersIds.join(','));
      }
      const docIds = [];
      for (const file of info.additionalSupportDocs || []) {
        if (file instanceof File) {
          const additionalFormData = new FormData();
          additionalFormData.append('document', file);
          additionalFormData.append('name', file.name);
          if (corpId) {
            additionalFormData.append('corporation_applicant_id', corpId);
          }

          try {
            const res = await addAdditionalDoc(additionalFormData);
            if (res?.id) {
              docIds.push(res.id);
            }
          } catch (error) {
            console.error('Upload failed:', error);
          }
        } else if ('id' in file) {
          docIds.push(file.id);
        }
      }

      if (docIds.length > 0) {
        formData.append('additional_supporting_document_ids', docIds.join(','));
      }

      if (corpId) {
        const res = await updateCorporateMutate(formData);
        if (res.id) {
          setIsLoading(true);
          setTimeout(async () => {
            await saveDraft({
              applicant_type: 'Corporation',
              corporation_applicant_id: res.id,
            });

            refetch();
            onNext();
            setIsLoading(false);
          }, 1000);
        }
      } else {
        const res = await corporateMutate(formData);
        if (res.id) {
          setIsLoading(true);
          Cookies.set('corporation_id', res.id);
          setTimeout(async () => {
            await saveDraft({
              applicant_type: 'Corporation',
              corporation_applicant_id: res.id,
            });

            refetch();
            onNext();
            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (error) {
      const rawMessage = (error as any)?.response?.data?.message;

      if (rawMessage?.includes("Field validation for 'PhoneForService' failed on the 'e164'")) {
        toast.error('Phone number must be in valid international format');
      } else if (
        rawMessage?.includes("Field validation for 'EmailForService' failed on the 'email'")
      ) {
        toast.error('Email must be a valid email address');
      } else {
        toast.error(rawMessage || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/licensing/application-management')}
          className="flex items-center text-[22px] font-medium text-red gap-1.5 bg-transparent border-none p-0"
        >
          <BackIcon /> Back
        </button>
      </div>

      <Heading className="font-bold text-[32px] text-[#2D3139] mb-8">
        Section 03: For Corporation
      </Heading>
      <div>
        <div></div>
      </div>
      <div className="flex items-center justify-between mt-8 mb-4 flex-col">
        <CorporationDetail form={corporationDetailForm} />
        <DirectorsList
          sorting={directorsTableFilter.sorting}
          setSorting={directorsTableFilter.setSorting}
          form={directorsForm}
          onSubmit={saveDirectors}
          directors={directorList}
          isPending={isDirectorPending}
          onDelete={async (id) => {
            try {
              await deleteDirector({ id });
              directoryRefetch();
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete director');
            }
          }}
        />
        <SecretariesList
          form={secretariesForm}
          onSubmit={saveSecretaries}
          isPending={isSecretaryPending}
          secretaries={secretariesList}
          sorting={secretariesTableFilter.sorting}
          setSorting={secretariesTableFilter.setSorting}
          onDelete={async (id) => {
            try {
              await deleteSecretary({ id });
              secretariesRefetch();
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete director');
            }
          }}
        />
        <ShareholdersList
          form={shareHoldersForm}
          onSubmit={saveShareHolder}
          isPending={isShareholderPending}
          setSorting={shareholdersTableFilter.setSorting}
          sorting={shareholdersTableFilter.sorting}
          shareholders={shareholdersList}
          onDelete={async (id) => {
            try {
              await deleteShareholder({ id });
              shareholdersRefetch();
            } catch (error) {
              console.error(error);
              toast.error('Failed to delete director');
            }
          }}
        />
        <ContactPerson form={contactPersonForm} />
        <PhysicalAddress form={physicalAddressForm} preferredAddressForm={preferredAddressForm} />
        <AddressOfBranch form={addressOfBranchForm} preferredAddressForm={preferredAddressForm} />
        <PostalAddress form={postAddressForm} />
        <AdditionalInformation
          form={additionalInformationForm}
          documents={corporationDetail?.additional_supporting_documents}
        />
        <div className="flex justify-between w-full mt-7">
          <Button
            variant="outline"
            className="w-38.5 bg-white text-[#2D3139] "
            onClick={() => {
              onBack();
            }}
          >
            Back
          </Button>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => handleSubmitCorporation()}
              variant="outline"
              className="w-38.5 bg-white text-[#2D3139]"
            >
              Save as Draft
            </Button>
            <Button
              className="w-38.5 bg-[#C4C4C4] disabled:bg-[#C4C4C4]"
              onClick={() => {
                handleSubmitCorporation();
              }}
              loading={isLoading || isPending || updatePending || uploadAdditionalDocPending}
              disabled={isDisable}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForCorporation;
