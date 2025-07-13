export interface Application {
  id: number;
  applicant_type: string;
  application_id: string;
  application_status: string;
  application_type: string;
  consultation_date?: string;
  regulated_activity: string;
  corporation_name: string;
  days_remaining: number;
  responsible_assignee_name: string;
}

export interface ViewApplicationDetail {
  id: number;
  name: string;
  business_name: string;
  license_application_id: number;
  license_application_ids?: number[];

  created_at: string;
  updated_at?: string;

  additional_information?: string;

  additional_supporting_document_ids?: number[];
  additional_supporting_documents?: SupportingDocument[];

  expression_of_interest_document?: string;
  expression_of_interest_document_name?: string;
  expression_of_interest_document_size?: number;
  declaration_document?: string;
  declaration_document_name?: string;
  declaration_document_size?: number;

  ipa_extract_document?: string;
  ipa_extract_document_uploaded_at?: string;
  ipa_registration_number?: string;

  email_for_service?: string;
  phone_for_service?: string;

  contact_first_name?: string;
  contact_middle_name?: string;
  contact_surname?: string;

  address_of_branch_where_business_is_conducted_line1?: string;
  address_of_branch_where_business_is_conducted_line2?: string;
  address_of_branch_where_business_is_conducted_city?: string;
  address_of_branch_where_business_is_conducted_province?: string;
  address_of_branch_where_business_is_conducted_postal_code?: string;
  address_of_branch_where_business_is_conducted_country?: string;

  physical_address_of_principle_place_of_business_line1?: string;
  physical_address_of_principle_place_of_business_line2?: string;
  physical_address_of_principle_place_of_business_city?: string;
  physical_address_of_principle_place_of_business_province?: string;
  physical_address_of_principle_place_of_business_postal_code?: string;
  physical_address_of_principle_place_of_business_country?: string;

  preferred_address_of_service?: string;

  director_ids?: number[];
  directors?: Person[];

  secretary_ids?: number[];
  secretaries?: Person[];

  shareholder_ids?: number[];
  shareholders?: Shareholder[];
}

// Nested interfaces
export interface SupportingDocument {
  id: number;
  name: string;
  document: string;
  created_at: string;
  updated_at: string;
  corporation_applicant_id: number;
  individual_applicant_id: number;
  capital_market_representative_license_holder_id: number;
}

export interface Person {
  id: number;
  first_name: string;
  middle_name?: string;
  surname: string;
  created_at: string;
  updated_at: string;
  corporation_applicant_id: number;
}

export interface Shareholder extends Person {
  number_of_shares: number;
  type_of_shares: string;
  capital_market_representative_license_holder_id: number;
}

export type ApplicationType = { name: string };

export interface GrantApplicationDraft {
  id: number;
  application_type: string;
  application_status: 'Draft' | 'Submitted' | string;
  application_id: string;
  responsible_assignee_id: number;
  responsible_division_unit: string;
  effective_application_fee: number | null;
  responsible_assignee_name: string;
}

export interface ApplicationDraft {
  id: number;
  application_id: string;
  application_status: 'Draft' | string;
  application_type: string;
  consultation_date: string; // format: YYYY-MM-DD
  physical_submission_date: string; // format: YYYY-MM-DD
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  days_remaining: number;
  effective_application_fee: number | null;
  effective_application_fee_id: number | null;
  responsible_assignee_id: number;
  responsible_assignee_name: string;
  responsible_division_unit: string;
  expression_of_interest_document: string;
  expression_of_interest_document_uploaded_at: string;
  applicant_type: string;
  regulated_activity: string;
  corporation_applicant_id: number;
  individual_applicant_id: number;
  capital_market_representative_license_holder_id: number;
  declaration_name: string;
  declaration_document: string;
  declaration_date: string;
  corporation_name?: string;
}

export interface ApplicationLog {
  action: string;
  category: string;
  created_at: string;
  email: string;
  entity_id: number;
  entity_type: string;
  first_name: string;
  id: number;
  ip_address: string;
  surname: string;
  user_id: number;
}
export interface Step {
  id: number;
  title: string;
}
