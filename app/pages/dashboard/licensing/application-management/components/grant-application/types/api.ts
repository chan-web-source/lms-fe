export type DirectorDto = {
  first_name: string;
  surname: string;
  middle_name?: string;
  corporation_applicant_id?: number;
};

export type DirectorSecretariesDto = {
  first_name: string;
  surname: string;
  middle_name?: string;
};

export type ShareholdersDto = {
  first_name: string;
  surname: string;
  middle_name?: string;
  number_of_shares: number;
  type_of_shares: string;
  corporation_applicant_id?: number;
  capital_market_representative_license_holder_id?: number;
};

export interface CorporateDirectorResp {
  id: number;
  first_name: string;
  surname: string;
  middle_name?: string;
}

export interface CorporateResp {
  id: number;
  first_name: string;
  surname: string;
  middle_name?: string;
}
export interface CorporateDirector {
  name: any;
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  surname: string;
  middle_name?: string;
}

export interface CorporateSecretariesResp {
  id: number;
  first_name: string;
  surname: string;
  middle_name?: string;
}

export interface CorporateSecretaries {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  surname: string;
  middle_name?: string;
}

export interface CorporateShareholdersResp {
  id: number;
  first_name: string;
  surname: string;
  middle_name?: string;
  number_of_shares?: number;
  type_of_shares?: string;
  corporation_applicant_id?: string;
}

export interface CorporateShareholders {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  surname: string;
  middle_name?: string;
  number_of_shares?: number;
  type_of_shares?: string;
  corporation_applicant_id?: string;
}
export interface Person {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  middle_name?: string;
  surname: string;
  corporation_applicant_id: number;
}

export interface Shareholder extends Person {
  number_of_shares: number;
  type_of_shares: string;
}
export type AdditionalSupportingDocument = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  document: string | object; // Use 'object' if it's an unresolved object reference
  corporation_applicant_id: number;
};

export interface CorporationApplication {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  ipa_registration_number: string;
  ipa_extract_document: string;
  ipa_extract_document_uploaded_at: string;
  contact_first_name: string;
  contact_surname: string;
  email_for_service: string;
  phone_for_service: string;
  physical_address_of_principle_place_of_business_line1: string;
  physical_address_of_principle_place_of_business_line2: string;
  physical_address_of_principle_place_of_business_postal_code: string;
  physical_address_of_principle_place_of_business_city: string;
  physical_address_of_principle_place_of_business_province: string;
  physical_address_of_principle_place_of_business_country: string;
  address_of_branch_where_business_is_conducted_line1: string;
  address_of_branch_where_business_is_conducted_city: string;
  address_of_branch_where_business_is_conducted_province: string;
  address_of_branch_where_business_is_conducted_country: string;
  address_of_branch_where_business_is_conducted_postal_code: string;
  address_of_branch_where_business_is_conducted_line2: string;
  business_name: string;
  additional_information: string;
  license_application_ids: number[];
  directors: Person[];
  secretaries: Person[];
  shareholders: Shareholder[];
  preferred_address_of_service:
    | 'physical_address_of_principle_place_of_business'
    | 'address_of_branch_where_business_is_conducted'
    | '';
  additional_supporting_documents: AdditionalSupportingDocument[];
}
export interface IndividualApplicant {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  middle_name: string;
  surname: string;
  email: string;
  phone: string;
  nationality: string;
  national_id_document: string;
  passport_document: string;
  driver_license_document: string;
  postal_address_line1: string;
  postal_address_city: string;
  postal_address_province: string;
  postal_address_country: string;
  physical_address_of_principle_place_of_business_line1: string;
  physical_address_of_principle_place_of_business_city: string;
  physical_address_of_principle_place_of_business_province: string;
  physical_address_of_principle_place_of_business_country: string;
  additional_information: string;
  additional_supporting_documents: AdditionalSupportingDocument[];
  license_application_ids: number[];
  preferred_address_of_service:
    | 'physical_address_of_principle_place_of_business'
    | 'address_of_branch_where_business_is_conducted'
    | '';
  physical_address_of_principle_place_of_business_line2: string;
  physical_address_of_principle_place_of_business_postal_code: string;
  postal_address_line2: string;
  postal_address_postal_code: string;
}

export interface CapitalMarketRepresentativeLicenseHolder {
  id: number;
  created_at: string;
  updated_at: string;
  capital_market_license_number: string;
  individual_first_name?: string;
  individual_surname?: string;
  individual_middle_name?: string;
  corporation_name?: string;
  capital_market_license_holder_name: string;
  copy_of_cml_document: string;
  representative_type: 'Individual' | 'Corporation';
  supporting_letter_document: string;
  supporting_letter_document_uploaded_at: string;
  email_for_service: string;
  phone_for_service: string;
  physical_address_of_principle_place_of_business_line1: string;
  physical_address_of_principle_place_of_business_line2: string;
  physical_address_of_principle_place_of_business_city: string;
  physical_address_of_principle_place_of_business_province: string;
  physical_address_of_principle_place_of_business_country: string;
  physical_address_of_principle_place_of_business_postal_code: string;
  postal_address_line1: string;
  postal_address_line2: string;
  postal_address_city: string;
  postal_address_postal_code: string;
  postal_address_province: string;
  postal_address_country: string;
  additional_information: string;
  additional_supporting_documents: AdditionalSupportingDocument[];
  license_application_ids: number[];
  preferred_address_of_service:
    | 'physical_address_of_principle_place_of_business'
    | 'address_of_branch_where_business_is_conducted'
    | '';
}
