import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

const RoomCost = () => {
  const classes = useStyles();

  const [roomDetails, setRoomDetails] = useState({
    name: "",
    cost: "",
  });

  const handleRoomDetails = (event: any) => {
    setRoomDetails({ ...roomDetails, [event.target.id]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete='off'>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='ADD Room Cost' />
        <CardContent>
          <div>
            <TextField
              fullWidth
              id='name'
              type='text'
              label='Enter Room Name'
              margin='normal'
              onChange={handleRoomDetails}
              //   onKeyPress={handleKeyPress}
            />
            <TextField
              fullWidth
              id='cost'
              type='number'
              label='Enter Room Cost'
              margin='normal'
              //   helperText={state.helperText}
              onChange={handleRoomDetails}
              //   onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            size='large'
            className={classes.loginBtn}
            // onClick={handleLogin}
            // disabled={state.isButtonDisabled}
          >
            ADD ROOM
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default RoomCost;
