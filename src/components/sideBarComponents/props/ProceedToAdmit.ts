export type Props = {
  patient: {
    id: number;
    patient_code: string | null;
    admissionDetails?: {
      id: number;
      doctor_name: string;
      room_no: string;
    }[];
    treatment_name: string;
    netTotal?: number;
    user: {
      full_name: string;
      dob: string;
      gender: string;
      userMedicalDetails?: {
        medical_conditions?: string;
        symptoms: string;
        allergies?: string;
      };
      userPhoneNumber: {
        phone_number: string;
      };
      userSurgeries: {
        surgery: {
          name: string;
        };
      }[];
    };
    treatmentSkus: {
      id: number;
      item: string;
      price: number;
      quantity: number;
      total: number;
      paid: number;
      category: {
        id: number;
        name: string;
      };
    }[];
    insurances: {
      id: number;
      patient_id: number;
      details: string;
      sum_insured: number;
      availability: boolean;
      applicability: boolean;
      co_pay: number;
    }[];
    payments: {
      id: number;
      order_id: string;
      amount: number;
      link: string;
      transaction_id: null;
      status: string;
      patient_id: number;
    }[];
  };
  closeDrawer: () => void;
  isChanged: () => void;
  // changeType?: () => void;
  changeType: (type: any) => void;
  handlePosiDocs: (e: number) => void;

  style?: {
    color?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    borderRadius?: string;
    padding?: string;
    marginRight?: string;
    fontSize?: string;
    background?: string;
    border?: string;
    justifyContent?: string;
    alignItems?: string;
    fontWeight?: string;
    gap?: string;
    display?: string;
    fontStyle?: string;
    lineHeight?: string;
  };
};
