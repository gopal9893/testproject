import { colors, fonts, fontSize, fontWeight, lineHeight } from "./theme";

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
  fontSize: fontSize.font_1_6,
  lineHeight: lineHeight.line_2_4,
};

export const style = {
  modal: {
    outline: "none",
    // backdropFilter: "blur(5px)",
  },
  upDiv: {
    position: "relative" as "relative",
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  iconDiv: {
    fontSize: "6rem",
    padding: "1.5rem 2rem",
    cursor: "pointer",
    color: colors.white,
  },
  labelData: {
    ...commonLabelHeading,
    color: "white",
  },
  cardDivContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  cardMiddleDiv: {
    width: "50%",
    maxHeight: "80vh",
    position: "relative" as "relative",
    overflowY: "scroll" as "scroll",
    padding: "0.5rem",
    borderRadius: "1rem",
    backgroundColor: colors.white,
  },
};
