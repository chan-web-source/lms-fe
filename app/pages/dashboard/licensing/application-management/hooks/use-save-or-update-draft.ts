import Cookies from 'js-cookie';
import { useSaveGrantApplicationDraft } from './use-save-grant-application-draft';
import { useUpdateGrantApplicationDraft } from './use-update-grant-application-draft';
import { useGetOneApplicationDraft } from './use-get-one-applocation-draft';
import { useEffect } from 'react';

interface UseSaveOrUpdateDraftOptions {
  sectionMapper: (formValues: Record<string, any>, mergedDraft: Record<string, any>) => FormData;
}
export function useSaveOrUpdateDraft({ sectionMapper }: UseSaveOrUpdateDraftOptions) {
  const draftId = Cookies.get('application_draft') || '';
  const { data: draft, refetch } = useGetOneApplicationDraft(draftId);
  const saveDraftMutation = useSaveGrantApplicationDraft();
  const updateDraftMutation = useUpdateGrantApplicationDraft(draftId);
  const corporationId = Cookies.get('corporation_id') || '';
  const individualId = Cookies.get('individual_id') || '';
  const capitalMarketId = Cookies.get('capital_market_id') || '';

  useEffect(() => {
    if (draftId !== '') {
      refetch();
    }
  }, [draftId, refetch]);

  const saveDraft = async (formValues: Record<string, any>) => {
    // Merge new form values with existing draft values
    let mergedDraft = { ...formValues };

    // Only merge with the existing draft if the draft ID exists
    if (draft?.id) {
      mergedDraft = {
        ...(draft || {}),
        ...(formValues || {}),
      };
      const applicantType = mergedDraft.applicant_type;
      if (applicantType === 'Corporation') {
        delete mergedDraft.individual_applicant_id;
        mergedDraft.corporation_applicant_id = corporationId;
        delete mergedDraft.capital_market_representative_license_holder_id;
      } else if (applicantType === 'Individual') {
        mergedDraft.individual_applicant_id = individualId;
        delete mergedDraft.corporation_applicant_id;
        delete mergedDraft.capital_market_representative_license_holder_id;
      } else if (applicantType === 'Capital Market') {
        mergedDraft.capital_market_representative_license_holder_id = capitalMarketId;
        delete mergedDraft.individual_applicant_id;
        delete mergedDraft.corporation_applicant_id;
      }
    }

    // Start section mapping
    const formData = sectionMapper(formValues, mergedDraft);
    // Automatically append all other draft fields (only if not already appended)
    for (const key in mergedDraft) {
      if (
        !formData.has(key) &&
        (mergedDraft as Record<string, any>)[key] !== undefined &&
        (mergedDraft as Record<string, any>)[key] !== null
      ) {
        const value = (mergedDraft as Record<string, any>)[key];
        if (value instanceof File) {
          formData.append(key, value); // File input
        } else {
          formData.append(key, String(value));
        }
      }
    }

    // Required metadata
    // formData.set('application_status', 'Draft');
    formData.set('application_type', 'Application for Grant');

    // Add system fields if available
    if (draftId) {
      if (draft?.id && String(draft?.id) === draftId) {
        if (draft.responsible_assignee_id)
          formData.set('responsible_assignee_id', String(draft.responsible_assignee_id));

        if (draft.effective_application_fee_id != null)
          formData.set('effective_application_fee_id', String(draft.effective_application_fee_id));

        if (draft.responsible_division_unit != null)
          formData.set('responsible_division_unit', String(draft.responsible_division_unit));
      }
      return updateDraftMutation.mutateAsync(formData);
    } else {
      const res = await saveDraftMutation.mutateAsync(formData);
      if (res.id) Cookies.set('application_draft', res.id);
      return res;
    }
  };

  return {
    draft,
    saveDraft,
    isLoading: saveDraftMutation.isPending || updateDraftMutation.isPending,
  };
}
