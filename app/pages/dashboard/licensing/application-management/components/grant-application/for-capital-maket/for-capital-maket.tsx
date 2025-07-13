import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BackIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import CapitalMarket from './capital-market'; // ✅ fix import name
import { useForm } from 'react-hook-form';
import {
  additionalInformationSchema,
  capitalContactPersonSchema,
  capitalMarketSchema,
  endorsementSchema,
  physicalAddressSchema,
  postalAddressSchema,
  preferredAddressSchema,
  shareholdersListSchema,
  type additionalInformationFormData,
  type capitalContactPersonFormData,
  type endorsementFormData,
  type FullCapitalMarketFormData,
  type physicalAddressFormData,
  type postalAddressFormData,
  type preferredAddressFormData,
  type shareholdersListFormData,
} from '../../../schema/create-application';
import { zodResolver } from '@hookform/resolvers/zod';
import EndorsementForm from './endorsement-form';
import ContactInformation from './contact-information';
import AdditionalInformation from '../for-corporation/additional-information';
import PostalAddress from '../for-corporation/postal-address';
import PhysicalAddress from '../for-corporation/physical-address';
import ShareholdersList from '../for-corporation/shareholders-list';
import type { z } from 'zod';
import { toast } from 'react-toastify';
import { useCreateCorporateShareholders } from '../hooks/use-create-corporate-shareholders';
import useTableFIlter from '~/hooks/use-table-filters';
import type { GetCorporateDirectorsParams } from '../hooks/use-get-one-corporate-application';
import { useGetCorporateShareholders } from '../hooks/use-get-corporate-shareholders';
import Cookies from 'js-cookie';
import { useDeleteCorporateShareholder } from '../hooks/use-delete-corporate-shareholders';
import { useCreateCapitalMarketApplication } from '../hooks/use-create-capital-market-application';
import { useCreateAdditionalDocument } from '../hooks/use-create-additional-document';
import { useUpdateCapitalMarketApplication } from '../hooks/use-update-capital-market-application';
import { useGetCapitalMarketApplication } from '../hooks/use-get-one-capital-market-application';
import { useSaveApplicationDraft } from '../hooks/use-save-application';

const ForCapitalMarket = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const navigate = useNavigate();
  const applicationId = Cookies.get('application_draft') || '';
  const capitalMarketId = Cookies.get('capital_market_id');
  const [isLoading, setIsLoading] = useState(false);
  const { data: capitalData, refetch } = useGetCapitalMarketApplication(capitalMarketId);
  const { mutateAsync: addAdditionalDoc, isPending: uploadDocPending } =
    useCreateAdditionalDocument();
  const shareholdersTableFilter = useTableFIlter();
  const { mutateAsync: deleteShareholder } = useDeleteCorporateShareholder();
  const { mutateAsync: shareholdersMutate, isPending: isShareholderPending } =
    useCreateCorporateShareholders();
  const { mutateAsync: createCapitalMarket, isPending } = useCreateCapitalMarketApplication();
  const { mutateAsync: updateCapitalMarket, isPending: updatePending } =
    useUpdateCapitalMarketApplication(capitalMarketId ?? '');
  const { saveDraft } = useSaveApplicationDraft();

  const shareholdersQueryParams: GetCorporateDirectorsParams = useMemo(
    () => ({
      order_by: shareholdersTableFilter.orderBy,
      order_dir: shareholdersTableFilter.orderDir,
    }),
    [shareholdersTableFilter.orderBy, shareholdersTableFilter.orderDir],
  );

  const { refetch: shareholdersRefetch, data: shareholdersData } =
    useGetCorporateShareholders(shareholdersQueryParams);
  const shareholdersList = shareholdersData?.data || [];

  const capitalMarketForm = useForm<FullCapitalMarketFormData>({
    resolver: zodResolver(capitalMarketSchema),
    values: {
      licenseNumber: capitalData?.capital_market_license_number || '',
      licenseHolderName: capitalData?.capital_market_license_holder_name || '',
      representativeType: capitalData?.representative_type || 'Individual',
      firstName: capitalData?.individual_first_name || '',
      surname: capitalData?.individual_surname || '',
      middleName: capitalData?.individual_middle_name || '',
      corporationName: capitalData?.corporation_name || '',
    },
    mode: 'onChange',
  });

  const physicalAddressForm = useForm<physicalAddressFormData>({
    resolver: zodResolver(physicalAddressSchema),
    defaultValues: {
      address1: capitalData?.physical_address_of_principle_place_of_business_city || '',
      address2: capitalData?.physical_address_of_principle_place_of_business_line2 || '',
      postalCode: capitalData?.physical_address_of_principle_place_of_business_postal_code || '',
      city: capitalData?.physical_address_of_principle_place_of_business_city || '',
      province: capitalData?.physical_address_of_principle_place_of_business_province || '',
      country:
        capitalData?.physical_address_of_principle_place_of_business_country || 'Papua New Guinea',
    },
    mode: 'onChange',
  });

  const preferredAddressForm = useForm<preferredAddressFormData>({
    resolver: zodResolver(preferredAddressSchema),
    values: {
      type:
        capitalData?.preferred_address_of_service ||
        'physical_address_of_principle_place_of_business',
    },
    mode: 'onChange',
  });

  const postAddressForm = useForm<postalAddressFormData>({
    resolver: zodResolver(postalAddressSchema),
    values: {
      address1: capitalData?.postal_address_line1 || '',
      address2: capitalData?.postal_address_line2 || '',
      postalCode: capitalData?.postal_address_postal_code || '',
      city: capitalData?.postal_address_city || '',
      province: capitalData?.postal_address_province || '',
      country: capitalData?.postal_address_country || 'Papua New Guinea',
    },
    mode: 'onChange',
  });

  const contactPersonForm = useForm<capitalContactPersonFormData>({
    resolver: zodResolver(capitalContactPersonSchema),
    values: {
      preferredEmailForService: capitalData?.email_for_service || '',
      phoneNumber: capitalData?.phone_for_service || '',
    },
    mode: 'onChange',
  });

  const additionalInformationForm = useForm<additionalInformationFormData>({
    resolver: zodResolver(additionalInformationSchema),
    values: {
      additionalInfo: capitalData?.additional_information || '',
      additionalSupportDocs: [],
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
  });

  const endorsementForm = useForm<endorsementFormData>({
    resolver: zodResolver(endorsementSchema),
    values: {
      supportingLetter: capitalData?.supporting_letter_document || '',
      copyOfCML: capitalData?.copy_of_cml_document || '',
    },
    mode: 'onChange',
  });

  const representativeType = capitalMarketForm.watch('representativeType');

  const handleSubmitForm = async () => {
    if (!capitalMarketForm.trigger()) {
    }
    const capitalMarketValues = capitalMarketForm.getValues();
    const physicalAddress = physicalAddressForm.getValues();
    const postalAddress = postAddressForm.getValues();
    const contact = contactPersonForm.getValues();
    const preferredAddress = preferredAddressForm.getValues();
    const additionalInfo = additionalInformationForm.getValues();
    const endorsement = endorsementForm.getValues();

    const formData = new FormData();

    formData.append('capital_market_license_number', capitalMarketValues.licenseNumber);
    formData.append('capital_market_license_holder_name', capitalMarketValues.licenseHolderName);
    formData.append('representative_type', capitalMarketValues.representativeType);
    if (
      capitalMarketValues.representativeType === 'Corporation' &&
      capitalMarketValues.corporationName
    ) {
      formData.append('corporation_name', capitalMarketValues.corporationName || '');
    }

    if (
      capitalMarketValues.representativeType === 'Individual' &&
      capitalMarketValues.firstName &&
      capitalMarketValues.surname
    ) {
      formData.append('individual_first_name', capitalMarketValues.firstName);
      formData.append('individual_surname', capitalMarketValues.surname);
      formData.append('individual_middle_name', capitalMarketValues.middleName || '');
    }

    // File uploads
    if (endorsement.supportingLetter) {
      formData.append('supporting_letter_document', endorsement.supportingLetter);
    }
    if (endorsement.copyOfCML) {
      formData.append('copy_of_cml_document', endorsement.copyOfCML);
    }

    formData.append('email_for_service', contact.preferredEmailForService);
    formData.append('phone_for_service', contact.phoneNumber);
    formData.append('preferred_address_of_service', preferredAddress.type);

    // Physical address
    formData.append(
      'physical_address_of_principle_place_of_business_line1',
      physicalAddress.address1,
    );
    formData.append(
      'physical_address_of_principle_place_of_business_line2',
      physicalAddress.address2 || '',
    );
    if (physicalAddress.postalCode) {
      formData.append(
        'physical_address_of_principle_place_of_business_postal_code',
        physicalAddress.postalCode,
      );
    }
    formData.append('physical_address_of_principle_place_of_business_city', physicalAddress.city);
    formData.append(
      'physical_address_of_principle_place_of_business_province',
      physicalAddress.province,
    );
    formData.append(
      'physical_address_of_principle_place_of_business_country',
      physicalAddress.country,
    );

    // Postal address
    formData.append('postal_address_line1', postalAddress.address1);
    formData.append('postal_address_line2', postalAddress.address2 || '');
    if (postalAddress.postalCode) {
      formData.append('postal_address_postal_code', postalAddress.postalCode);
    }
    formData.append('postal_address_city', postalAddress.city);
    formData.append('postal_address_province', postalAddress.province);
    formData.append('postal_address_country', postalAddress.country);

    // Additional info
    formData.append('additional_information', additionalInfo.additionalInfo);

    // Add optional fields if available
    const shareholdersIds = shareholdersList?.map((holder) => holder.id) ?? [];
    if (capitalMarketValues.representativeType === 'Corporation' && shareholdersIds.length > 0) {
      formData.append('corporation_shareholder_ids', shareholdersIds.join(','));
    }

    formData.append('license_application_id', applicationId);
    const docIds = [];
    for (const file of additionalInfo.additionalSupportDocs || []) {
      if (file instanceof File) {
        const additionalFormData = new FormData();
        additionalFormData.append('document', file);
        additionalFormData.append('name', file.name);
        if (capitalMarketId) {
          additionalFormData.append(
            'capital_market_representative_license_holder_id',
            capitalMarketId,
          );
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
    try {
      if (capitalMarketId) {
        const res = await updateCapitalMarket(formData);
        if (res.id) {
          setIsLoading(true);
          setTimeout(async () => {
            await saveDraft({
              applicant_type: 'Capital Market Representative License',
              capital_market_representative_license_holder_id: res.id,
            });
            refetch();
            onNext();
            setIsLoading(false);
          }, 1000);
        }
      } else {
        const res = await createCapitalMarket(formData);
        if (res.id) {
          setIsLoading(true);
          Cookies.set('capital_market_id', res.id);
          setTimeout(async () => {
            await saveDraft({
              applicant_type: 'Capital Market Representative License',
              capital_market_representative_license_holder_id: res.id,
            });
            refetch();
            onNext();
            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (error) {
      const rawMessage = (error as any)?.response?.data?.message;

      if (rawMessage?.includes("Field validation for 'Phone' failed on the 'e164'")) {
        toast.error('Phone number must be in valid international format');
      } else {
        toast.error(rawMessage || 'Something went wrong. Please try again.');
      }
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
        capital_market_representative_license_holder_id: Number(capitalMarketId) || undefined,
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

  const isDisable = !capitalMarketForm.formState.isValid;

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
        Section 03: For Capital Market Representative License
      </Heading>

      <div className="flex items-center justify-between mt-8 mb-4 flex-col">
        <CapitalMarket form={capitalMarketForm} />
        {representativeType === 'Corporation' && (
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
        )}

        <EndorsementForm form={endorsementForm} />
        <PhysicalAddress form={physicalAddressForm} preferredAddressForm={preferredAddressForm} />
        <PostalAddress form={postAddressForm} />
        <ContactInformation form={contactPersonForm} />
        <AdditionalInformation
          form={additionalInformationForm}
          documents={capitalData?.additional_supporting_documents}
        />
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            className="w-38.5 bg-white text-[#2D3139]"
            onClick={() => {
              onBack();
            }}
          >
            Back
          </Button>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-38.5 bg-white text-[#2D3139]"
              onClick={() => {
                const values = capitalMarketForm.getValues();
                console.log('Saving Draft:', values);
                // saveDraft(values); // optionally implement
              }}
            >
              Save as Draft
            </Button>
            <Button
              className="w-38.5 bg-[#C4C4C4] disabled:bg-[#C4C4C4]"
              onClick={() => {
                handleSubmitForm();
              }}
              loading={isPending || updatePending || isLoading || uploadDocPending}
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

export default ForCapitalMarket;
