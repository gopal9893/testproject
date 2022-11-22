import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {fonts,fontSize,fontWeight,lineHeight,Spacing,borderRadius} from './theme';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h: {
        
        fontFamily: fonts.primary,
        fontStyle: fonts.style,
    }


  }),
);

export default useStyles;

