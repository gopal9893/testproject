import { Variant } from "@material-ui/core/styles/createTypography";

export type Props = {
  patient: {
    id: number;
    patient_code: string | null;
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
    hospital: {
      name: string;
    };
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
