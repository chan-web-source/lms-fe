import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BackIcon } from '~/assets/icons';
import Heading from '~/components/typography/heading';
import { Button } from '~/components/ui/button';
import {
  additionalInformationSchema,
  individualDetailSchema,
  personalIdlDetailSchema,
  physicalAddressSchema,
  postalAddressSchema,
  preferredAddressSchema,
  type additionalInformationFormData,
  type individualDetailFormData,
  type personalIdlDetailFormData,
  type physicalAddressFormData,
  type postalAddressFormData,
  type preferredAddressFormData,
} from '../../../schema/create-application';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import IndividualDetail from './individual-detail';
import ValidPersonalIdentification from './valid-personal-identification';
import PostalAddress from '../for-corporation/postal-address';
import PhysicalAddress from '../for-corporation/physical-address';
import AdditionalInformation from '../for-corporation/additional-information';
import { useCreateIndividualApplication } from '../hooks/use-create-individual-application';
import { useCreateAdditionalDocument } from '../hooks/use-create-additional-document';
import Cookies from 'js-cookie';
import { useUpdateIndividualApplication } from '../hooks/use-update-individual-application';
import { useGetIndividualApplication } from '../hooks/use-get-one-individual-application';
import { buildDocsFromIndividualData } from '~/lib/utils';
import { useSaveApplicationDraft } from '../hooks/use-save-application';
import { toast } from 'react-toastify';

const ForIndividual = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const applicationId = Cookies.get('application_draft') || '';
  const individualId = Cookies.get('individual_id');
  const { mutateAsync: createIndividualApplicant, isPending } = useCreateIndividualApplication();
  const { mutateAsync: updateIndividualApplicant, isPending: updatePending } =
    useUpdateIndividualApplication(individualId ?? '');
  const { data: individualData, refetch } = useGetIndividualApplication(individualId);
  const { mutateAsync: addAdditionalDoc, isPending: uploadAdditionalDocPending } =
    useCreateAdditionalDocument();
  const { saveDraft } = useSaveApplicationDraft();

  const individualForm = useForm<individualDetailFormData>({
    resolver: zodResolver(individualDetailSchema),
    values: {
      firstName: individualData?.first_name || '',
      surname: individualData?.surname || '',
      middleName: individualData?.middle_name || '',
      email: individualData?.email || '',
      nationality: individualData?.nationality || 'Papua New Guinea',
      phoneNumber: individualData?.phone || '',
    },
    mode: 'onChange',
  });

  const preferredAddressForm = useForm<preferredAddressFormData>({
    resolver: zodResolver(preferredAddressSchema),
    values: {
      type:
        individualData?.preferred_address_of_service ||
        'physical_address_of_principle_place_of_business',
    },
    mode: 'onChange',
  });

  const personalIdForm = useForm<personalIdlDetailFormData>({
    resolver: zodResolver(personalIdlDetailSchema),
    values: {
      docs: buildDocsFromIndividualData(individualData),
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (individualData?.id) {
      const docs = buildDocsFromIndividualData(individualData);
      personalIdForm.reset({ docs });
    }
  }, [individualData, individualData?.id, personalIdForm]);

  const postalAddressForm = useForm<postalAddressFormData>({
    resolver: zodResolver(postalAddressSchema),
    values: {
      address1: individualData?.physical_address_of_principle_place_of_business_line1 || '',
      address2: individualData?.physical_address_of_principle_place_of_business_line2 || '',
      postalCode: individualData?.physical_address_of_principle_place_of_business_postal_code || '',
      city: individualData?.physical_address_of_principle_place_of_business_city || '',
      province: individualData?.physical_address_of_principle_place_of_business_province || '',
      country:
        individualData?.physical_address_of_principle_place_of_business_country ||
        'Papua New Guinea',
    },
    mode: 'onChange',
  });

  const physicalAddressForm = useForm<physicalAddressFormData>({
    resolver: zodResolver(physicalAddressSchema),
    values: {
      address1: individualData?.postal_address_line1 || '',
      address2: individualData?.postal_address_line2 || '',
      postalCode: individualData?.postal_address_postal_code || '',
      city: individualData?.postal_address_city || '',
      province: individualData?.postal_address_province || '',
      country: individualData?.postal_address_country || 'Papua New Guinea',
    },
    mode: 'onChange',
  });

  const additionalInformationForm = useForm<additionalInformationFormData>({
    resolver: zodResolver(additionalInformationSchema),
    values: {
      additionalInfo: individualData?.additional_information || '',
      additionalSupportDocs: [],
    },
    mode: 'onChange',
  });

  const isDisable =
    !individualForm.formState.isValid &&
    !physicalAddressForm.formState.isValid &&
    !additionalInformationForm.formState.isValid;

  const handleSubmitIndividual = async () => {
    const isValid = await individualForm.trigger();
    if (!isValid) return;

    const individualData = individualForm.getValues();
    const personalIdData = personalIdForm.getValues();
    const postalAddressData = postalAddressForm.getValues();
    const physicalAddressData = physicalAddressForm.getValues();
    const preferredAddressData = preferredAddressForm.getValues();
    const additionalInformationData = additionalInformationForm.getValues();
    const formData = new FormData();

    // Basic info
    formData.append('first_name', individualData.firstName);
    formData.append('surname', individualData.surname);
    formData.append('middle_name', individualData.middleName || '');
    formData.append('email', individualData.email);
    formData.append('phone', individualData.phoneNumber);
    formData.append('nationality', individualData.nationality);

    // ID Documents
    personalIdData.docs.forEach((item) => {
      if (!item.docType || !item.doc) return;

      switch (item.docType) {
        case 'National ID':
          formData.append('national_id_document', item.doc);
          break;
        case 'Driver’s License':
          formData.append('driver_license_document', item.doc);
          break;
        case 'Passport':
          formData.append('passport_document', item.doc);
          break;
        default:
          break;
      }
    });
    // Physical address
    formData.append(
      'physical_address_of_principle_place_of_business_line1',
      physicalAddressData.address1,
    );
    formData.append(
      'physical_address_of_principle_place_of_business_line2',
      physicalAddressData.address2 || '',
    );
    if (physicalAddressData.postalCode) {
      formData.append(
        'physical_address_of_principle_place_of_business_postal_code',
        physicalAddressData.postalCode,
      );
    }
    formData.append(
      'physical_address_of_principle_place_of_business_city',
      physicalAddressData.city,
    );
    formData.append(
      'physical_address_of_principle_place_of_business_province',
      physicalAddressData.province,
    );
    formData.append(
      'physical_address_of_principle_place_of_business_country',
      physicalAddressData.country,
    );

    // Postal address
    formData.append('postal_address_line1', postalAddressData.address1);
    formData.append('postal_address_line2', postalAddressData.address2 || '');
    if (postalAddressData?.postalCode) {
      formData.append('postal_address_postal_code', postalAddressData?.postalCode);
    }
    formData.append('postal_address_city', postalAddressData.city);
    formData.append('postal_address_province', postalAddressData.province);
    formData.append('postal_address_country', postalAddressData.country);

    formData.append('additional_information', additionalInformationData.additionalInfo);
    formData.append('license_application_id', applicationId);
    formData.append('preferred_address_of_service', preferredAddressData.type || '');

    // Additional Supporting Docs (IDs only)
    const docIds = [];
    for (const file of additionalInformationData.additionalSupportDocs || []) {
      if (file instanceof File) {
        const additionalFormData = new FormData();
        additionalFormData.append('document', file);
        additionalFormData.append('name', file.name);
        if (individualId) {
          additionalFormData.append('individual_applicant_id', individualId);
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

    try {
      if (individualId) {
        const res = await updateIndividualApplicant(formData);
        if (res.id) {
          setIsLoading(true);
          setTimeout(async () => {
            await saveDraft({
              applicant_type: 'Individual',
              capital_market_representative_license_holder_id: res.id,
            });
            refetch();
            setIsLoading(false);
            onNext();
          }, 1000);
        }
      } else {
        const res = await createIndividualApplicant(formData);
        if (res.id) {
          Cookies.set('individual_id', res.id);
          setIsLoading(true);
          setTimeout(async () => {
            await saveDraft({
              applicant_type: 'Individual',
              capital_market_representative_license_holder_id: res.id,
            });
            refetch();
            setIsLoading(false);
            onNext();
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
        Section 03: For Individual
      </Heading>
      <div className="flex items-center justify-between mt-8 mb-4 flex-col">
        <IndividualDetail form={individualForm} />
        <ValidPersonalIdentification key={individualData?.id} form={personalIdForm} />
        <PostalAddress form={postalAddressForm} />
        <PhysicalAddress form={physicalAddressForm} preferredAddressForm={preferredAddressForm} />
        <AdditionalInformation
          form={additionalInformationForm}
          documents={individualData?.additional_supporting_documents}
        />
        <div className="flex justify-between w-full">
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
              // onClick={() => saveDraft(form.getValues())}
              variant="outline"
              className="w-38.5 bg-white text-[#2D3139]"
            >
              Save as Draft
            </Button>
            <Button
              className="w-38.5 bg-[#C4C4C4] disabled:bg-[#C4C4C4]"
              onClick={() => {
                handleSubmitIndividual();
              }}
              loading={isLoading || isPending || updatePending || uploadAdditionalDocPending}
              disabled={isDisable || isPending || updatePending}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForIndividual;
