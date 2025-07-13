import type { UserFormValues } from '~/pages/dashboard/admin/user-management/schema/create-user-schema';

const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: any,
  fieldName: string,
  handleSetData?: (fieldName: keyof UserFormValues, file: File) => void,
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    form.setError(fieldName as keyof UserFormValues, {
      type: 'manual',
      message: 'Please upload a JPEG or PNG file',
    });
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    form.setError(fieldName as keyof UserFormValues, {
      type: 'manual',
      message: 'File size should be less than 10MB',
    });
    return;
  }
  form.setValue(fieldName as keyof UserFormValues, file);
  form.trigger(fieldName as keyof UserFormValues);
  handleSetData?.(fieldName as keyof UserFormValues, file);
};
const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: any,
  fieldName: string,
  allowedTypes: string[],
  maxSizeInMB = 10,
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!allowedTypes.includes(file.type)) {
    form.setError(fieldName, {
      type: 'manual',
      message: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
    });
    return;
  }

  if (file.size > maxSizeInMB * 1024 * 1024) {
    form.setError(fieldName, {
      type: 'manual',
      message: `File size should be less than ${maxSizeInMB}MB`,
    });
    return;
  }

  form.setValue(fieldName, file);
  form.clearErrors(fieldName);
  form.trigger(fieldName);
};

export { handleImageUpload, handleFileUpload };
