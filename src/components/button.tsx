import useStyles from "../styles/button";
import Button from "@material-ui/core/Button";
import { Props } from "../props/button";

const ButtonComponent = (props: Props) => {
  const classes = useStyles();

  return (
    <div>
      <br />
      <Button
        onClick={props.onClick}
        className={classes.defaultButton}
        style={props.style}
        variant='contained'
        disabled={props.disabled}
      >
        {props.buttontext}
      </Button>
      <br />
      <br />
    </div>
  );
};

export default ButtonComponent;
