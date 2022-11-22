import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { colors,fonts,fontSize,lineHeight,borderRadius} from './theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    defaultButton: {
        fontFamily: fonts.primary,
        fontStyle: fonts.style,
        height: "5.6rem",
        width: "15rem",
        borderRadius: borderRadius.radius_1,
        fontWeight:600,
        fontSize:fontSize.font_1_2,
        lineHeight:lineHeight.line_2
    },

  }),
);

export default useStyles;