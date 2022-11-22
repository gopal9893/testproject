import {
  colors,
  fonts,
  fontSize,
  fontWeight,
  lineHeight,
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
  fontSize: fontSize.font_1_6,
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
  // width: "auto",
  fontSize: "1rem",
  height: "3.5rem",
  borderRadius: borderRadius.radius_0_5,
};

export const style = {
  sideBar: {
    width: "38rem",
    height: "100vh",
    padding: "1rem 0",
    backgroundColor: "#FAFAFA",
  },
  mainContainer: {
    // height: "80vh",
  },
  accordionDiv: {
    width: "33rem",
    borderRadius: "1rem",
  },
  countDiv: {
    display: "flex",
    gap: "1rem",
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
  labelHeading: {
    ...commonLabelHeading,
    color: "#222222",
    fontWeight: fontWeight.font_600,
    padding: "1rem 0",
  },
  tableContainer: {
    ...commonStyling,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  tableDiv: {
    width: "34rem",
    margin: "2rem",
  },
  linkHeading: {
    fontSize: fontSize.font_1_4,
    color: colors.blue,
    textDecoration: "underline",
  },
  headingDiv: {
    ...commonStyling,
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
  },
  insideContainer: {
    ...commonStyling,
    padding: "0 3rem",
  },
  lineDiv: {
    borderBottom: "1px solid #E6E4E7",
    margin: "1rem 0",
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
    marginBottom: "10rem",
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
};
