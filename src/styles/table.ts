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
  fontSize: fontSize.font_1_4,
  lineHeight: lineHeight.line_2_4,
  color: colors.blackShade,
};

export const style = {
  tableHead: {
    ...commonLabelHeading,
  },
  tableData: {
    ...commonLabelHeading,
    color: "#222222",
    fontWeight: fontWeight.font_600,
  },
  iconContain: {
    backgroundColor: "rgba(234, 72, 72, 0.12)",
    borderRadius: borderRadius.radius_0_5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem 0",
    cursor: "pointer",
  },
  deleteIcon: {
    color: colors.tertiary,
  },
};
