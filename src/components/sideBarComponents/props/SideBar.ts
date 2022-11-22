import { Variant } from "@material-ui/core/styles/createTypography";

export type Props = {
  patient: {
    id: number;
    patient_code: string | null;
    treatment_name: string;
    is_bnpl: boolean;
    netTotal?: number;
    user_id: number;
    user: {
      full_name: string;
      dob: string;
      gender: string;
      userMedicalDetails?: {
        id: number;
        medical_conditions: string;
        symptoms: string;
        allergies: string;
      };
      userPhoneNumber: {
        phone_number: string;
      };
      userSurgeries: {
        surgery: {
          name: string;
        };
      }[];
      docs: {
        doc_type: string;
        doc_link: string;
      }[];
    };
    hospital: {
      name: string;
    };
    symptoms: {
      id: number;
      patient_id: number;
      symptom_id: number;
    }[];
    treatmentSkus?: {
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
    eaScores: {
      id: number;
      total_estimated_cost: number;
      ea_score: number;
      ea_approved_amount: number;
      patient_id: number;
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
  };
  closeDrawer: () => void;
  isChanged: () => void;
  handlePosiDocs: (e: number) => void;
  // changeType?: () => void;
  changeType: (type: any) => void;
  posiOfDocument: number;

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
