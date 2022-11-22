import { Variant } from "@material-ui/core/styles/createTypography";

export type Props = {
  children?: string | string[] | JSX.Element | JSX.Element[];
  variant?: Variant;
  onClick?: () => void;
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
