interface PatientsData {
  id: number;
  patient_code?: string | null;
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
    dob: string;
    gender?: string;
    createdAt?: string;
    updatedAt?: string;
    userPhoneNumber: {
      id?: number;
      user_id?: number;
      phone_number: string;
      otp?: string;
      otp_valid_till?: string;
      createdAt?: string;
      updatedAt?: string;
    };
  };
}

export default PatientsData;
