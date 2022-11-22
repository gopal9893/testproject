import Typography from "@material-ui/core/Typography";
import { Variant } from "@material-ui/core/styles/createTypography";
import useStyles from "../styles/heading";
import { Props } from "../props/heading";

const Heading = (props: Props) => {
  const classes = useStyles();
  return (
    <Typography
      onClick={props.onClick}
      className={classes.h}
      variant={props.variant}
      style={props.style}
    >
      {props.children}
    </Typography>
  );
};

export default Heading;
