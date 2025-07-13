import { useSaveOrUpdateDraft } from '../../../hooks/use-save-or-update-draft';

export function useSaveApplicationDraft() {
  return useSaveOrUpdateDraft({
    sectionMapper: (formValues) => {
      const formData = new FormData();
      const applicantType = formValues.applicant_type;

      formData.set('application_status', 'Draft');
      formData.set('applicant_type', applicantType);

      // Only include the correct applicant ID field
      if (applicantType === 'Corporation' && formValues.corporation_applicant_id) {
        formData.set('corporation_applicant_id', String(formValues.corporation_applicant_id));
      }

      if (applicantType === 'Individual' && formValues.individual_applicant_id) {
        formData.set('individual_applicant_id', String(formValues.individual_applicant_id));
      }

      if (
        applicantType === 'Capital Market' &&
        formValues.capital_market_representative_license_holder_id
      ) {
        formData.set(
          'capital_market_representative_license_holder_id',
          String(formValues.capital_market_representative_license_holder_id),
        );
      }

      return formData;
    },
  });
}
