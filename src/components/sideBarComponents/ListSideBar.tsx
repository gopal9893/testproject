import React, { useContext, useState } from "react";
import { style } from "../../styles/listsidebar";
import Heading from "../heading";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CloseIcon from "@material-ui/icons/Close";
import TableComponent from "../Table";
import ButtonComponent from "../button";
import { useNavigate } from "react-router-dom";
import { Props } from "./props/ListSideBar";
// import { PatientDetailsContext } from "../context/PatientDetailsContext";

const ListSideBarComponent = (props: Props) => {
  const navigate = useNavigate();
  // const { tretmentSkus } = useContext(PatientDetailsContext);
  const [tretmentSkus, setTretmentSkus] = useState<
  { id: number, item: string; quantity: number; price: number }[]
  >([]);
  return (
    // <DrawerComponents style={style.sideBar} open={true}>
    <>
      <div style={style.headingDiv}>
        <div style={style.iconDiv}>
          <KeyboardBackspaceIcon
            style={style.iconContainer}
            onClick={() => props.changeType("PatientDetails")}
          />
        </div>
        <div>
          <Heading style={style.heading}>Akanksha Khanna</Heading>
          <Heading style={style.subHeading}>26 years . Female</Heading>
        </div>
        <div style={style.iconDiv}>
          <CloseIcon style={style.iconContainer} onClick={props.closeDrawer} />
        </div>
      </div>
      <div style={style.mainContainer}>
        <div style={style.insideContainer}>
          <Heading style={style.labelHeading}>List of services</Heading>
          <Heading style={style.linkHeading}>+ add Items</Heading>
        </div>
      </div>
      <div style={style.tableContainer}>
        <div>
          <TableComponent
            style={style.tableDiv}
            headCell={["Item", "Qty.", "Cost (₹)", ""]}
            bodyCell={tretmentSkus}
          ></TableComponent>
          <div style={style.insideContainer}>
            <Heading style={style.labelHeading}>Total estimate</Heading>
            <Heading style={style.labelHeading}>50,000</Heading>
          </div>
        </div>
      </div>
      <div style={style.totalDiv}>
        <Heading style={style.labelHeading}>Net Total: ₹ 50,000</Heading>
        <ButtonComponent
          style={style.priceButton}
          buttontext='Generate EA score'
          onClick={() => props.changeType("PatientDetails")}
        />
      </div>
    </>
    // </DrawerComponents>
  );
};

export default ListSideBarComponent;
