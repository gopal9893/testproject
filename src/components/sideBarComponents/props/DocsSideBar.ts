export type Props = {
  closeDrawer?: () => void;
  patient: {
    user_id: number;
    user: {
      docs: {
        doc_type: string;
        doc_link: string;
      }[];
    };
  };
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
