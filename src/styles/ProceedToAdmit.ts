import {
  colors,
  fonts,
  fontSize,
  fontWeight,
  lineHeight,
  Spacing,
  borderRadius,
} from "./theme";

const universalStyle = {
  fontFamily: fonts.primary,
  fontStyle: fonts.style,
};

const commonHeading = {
  ...universalStyle,
  fontWeight: fontWeight.font_600,
  fontSize: fontSize.font_1_6,
  color: colors.black,
};

const commonLabelHeading = {
  ...universalStyle,
  fontWeight: fontWeight.font_500,
  display: "inline-block",
  fontSize: fontSize.font_1_4,
  lineHeight: lineHeight.line_2_4,
  color: colors.blackShade,
};

const commonStyling = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const commonButton = {
  backgroundColor: "#4D24CD",
  color: colors.white,
  width: "auto",
  fontSize: "1rem",
  height: "3.5rem",
  borderRadius: borderRadius.radius_0_5,
};

const commonPaymentStatus = {
  ...commonStyling,
  color: colors.white,
  padding: "0.3rem 0.8rem",
  borderRadius: borderRadius.radius_0_5,
};

export const style = {
  sideBar: {
    width: "38rem",
    padding: "1rem 0",
    backgroundColor: "#FAFAFA",
  },
  mainContainer: {
    height: "73vh",
    overflowY: "scroll" as "scroll",
  },
  card: {
    width: "32rem",
    borderRadius: "1rem",
  },
  cardContainer: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  linkHeading: {
    fontSize: fontSize.font_1_4,
    color: colors.blue,
    textDecoration: "underline",
    cursor: "pointer",
  },
  linkCancel: {
    fontSize: fontSize.font_1_4,
    color: colors.tertiary,
    cursor: "pointer",
  },
  headingDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: "2rem",
    textAlign: "center" as "center",
  },
  subHeading: {
    ...commonLabelHeading,
  },
  heading: {
    ...commonHeading,
  },
  labelHead: {
    ...commonLabelHeading,
  },
  labelData: {
    ...commonLabelHeading,
    color: "#222222",
    fontWeight: fontWeight.font_600,
    // padding: '0 2rem'
  },
  labelDataNo: {
    ...commonLabelHeading,
    color: colors.tertiary,
  },
  insideContainer: {
    ...commonStyling,
    padding: "0.2rem 0",
  },
  paymentContainer: {
    ...commonStyling,
    padding: "1rem 3rem",
  },
  paymentSatusDiv: {
    ...commonPaymentStatus,
    backgroundColor: colors.green,
  },
  lineDiv: {
    borderBottom: "1px solid #E6E4E7",
    margin: "1rem 0",
  },
  downDiv: {
    position: "fixed" as "fixed",
    zIndex: "10",
    bottom: "0",
    width: "38rem",
    height: "6rem",
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  buttonDown: {
    ...commonButton,
    marginRight: "3rem",
    padding: "0 6rem",
  },
  iconDiv: {
    backgroundColor: "#F5F4F5",
    borderRadius: borderRadius.radius_0_5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3rem",
    width: "3rem",
    cursor: "pointer",
  },
  iconContainer: {
    fontSize: "2rem",
  },
  textContainer: {
    width: "30rem",
  },
  saveButtonDiv: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  saveButton: {
    ...commonButton,
  },
  costContainer: {
    ...commonStyling,
  },
  progressDiv: {
    ...commonStyling,
    alignItems: "end",
  },
  seprateContainer: {
    width: "32rem",
  },
  inputContainer: {
    width: "32rem",
  },
  accordionDiv: {
    width: "32rem",
    borderRadius: "0.5rem",
  },
  countDiv: {
    display: "flex",
    gap: "0.5rem",
  },
  countButton: {
    ...commonStyling,
    ...commonButton,
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    backgroundColor: "transparent",
    color: colors.blackShade,
    border: "0.1rem solid" + colors.secondaryLight,
  },
  tableContainer: {
    ...commonStyling,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    // overflowY: "scroll" as "scroll",
    height: "30vh",
  },
  tableDiv: {
    width: "32rem",
    // margin: "2rem",
  },
  totalDiv: {
    position: "fixed" as "fixed",
    zIndex: "10",
    bottom: "0",
    width: "38rem",
    height: "6rem",
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  priceButton: {
    ...commonButton,
  },
  paymentButton: {
    ...commonButton,
    backgroundColor: "transparent",
    color: colors.blackShade,
    border: "0.1rem solid" + colors.secondaryLight,
  },
  labelHeading: {
    ...commonLabelHeading,
    color: "#222222",
    fontWeight: fontWeight.font_600,
    padding: "1rem 0",
  },
};
