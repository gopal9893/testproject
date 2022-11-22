import { Variant } from "@material-ui/core/styles/createTypography";

export type Props = {
  headCell: string[];
  bodyCell: {
    id: number;
    item: string;
    quantity: number;
    price: number;
  }[];
  deleteTretmentSkus?: (id: number, item: string) => void;

  // children?: JSX.Element | JSX.Element[];

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
