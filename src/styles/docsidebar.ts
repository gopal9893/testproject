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
  fontSize: fontSize.font_2,
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

export const style = {
  mainContainer: {
    width: "38rem",
    padding: "1rem 0",
    backgroundColor: "#FAFAFA",
    height: "100vh",
  },
  card: {
    width: "32rem",
    padding: "0.5rem",
    borderRadius: "1rem",
  },
  cardContainer: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
  },
  cardDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    ...commonHeading,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "3rem",
    marginTop: "1rem",
  },
  labelData: {
    ...commonLabelHeading,
    color: "#222222",
    fontWeight: fontWeight.font_600,
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
  iconTag: {
    fontSize: "2.5rem",
    padding: "0.5rem",
    cursor: "pointer",
    color: colors.primary,
  },
  addDocumentCon: {
    border: "1px dashed black ",
    width: "32rem",
    borderRadius: "0.5rem",
    textAlign: "center" as "center",
    padding: "1rem",
    marginBottom: "2rem",
  },
  linkHeading: {
    fontSize: fontSize.font_1_4,
    color: colors.blue,
    textDecoration: "underline",
    cursor: "pointer",
  },
};
