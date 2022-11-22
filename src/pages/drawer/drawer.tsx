import { Box, Drawer } from "@material-ui/core";
import { Props } from "../../props/drawer";
// import "./drawer.css";

const DrawerComponents = (props: Props) => {
  return (
    <Drawer
      anchor={"right"}
      style={{ width: "100%" }}
      open={props.open}
      onClose={props.onClose}
    >
      <Box style={props.style} role='presentation'>
        {props.children}
      </Box>
    </Drawer>
  );
};

export default DrawerComponents;
