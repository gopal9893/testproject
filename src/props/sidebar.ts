import { Variant } from "@material-ui/core/styles/createTypography";

export type Props = {
  patient: {
    treatment_name: string;
    user: {
      full_name: string;
      dob: string;
      gender: string;
      userMedicalDetails: {
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
    };
  };
  closeDrawer?: () => void;
  changeType: () => void;

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
