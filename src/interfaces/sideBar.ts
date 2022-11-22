interface PatientsDetails {
  id?: number;
  status?: string;
  treatment_name?: string;
  createdAt?: string;
  updatedAt?: string;
  hospital_id?: number;
  user_id?: number;
  user: {
    id?: number;
    full_name?: string;
    email?: string;
    dob?: string;
    gender?: string;
    createdAt?: string;
    updatedAt?: string;
    docs?: {
      id?: number;
      user_id?: number;
      doc_type?: string;
      doc_link?: string;
      createdAt?: string;
      updatedAt?: string;
    }[];
    userMedicalDetails: {
      id?: number;
      user_id?: number;
      hospital_id?: number;
      medical_conditions?: string;
      symptoms?: string;
      allergies?: string;
      createdAt?: string;
      updatedAt?: string;
    };
    userPhoneNumber: {
      id?: number;
      user_id?: number;
      phone_number?: string;
      otp?: string;
      otp_valid_till?: string;
      createdAt?: string;
      updatedAt?: string;
    };
    userSurgeries: {
      id?: number;
      user_id?: number;
      surgery_id?: number;
      createdAt?: string;
      updatedAt?: string;
      surgery?: {
        id?: number;
        name?: string;
        createdAt?: string;
        updatedAt?: string;
      };
    }[];
  };
}

export default PatientsDetails;
