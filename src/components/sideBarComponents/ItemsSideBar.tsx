import { style } from "../../styles/itemsidebar";
import Heading from "../heading";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CloseIcon from "@material-ui/icons/Close";
import { Props } from "./props/ItemSideBar";
import TableComponent from "../Table";
import ButtonComponent from "../button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import { PatientDetailsContext } from "../context/PatientDetailsContext";

// const medicine = [
//   {
//     medicine: "xyz medicine",
//     qty: "2 X",
//     cost: "5,000",
//   },
//   {
//     medicine: "xyz medicine",
//     qty: "2 X",
//     cost: "5,000",
//   },
//   {
//     medicine: "xyz medicine",
//     qty: "2 X",
//     cost: "5,000",
//   },
//   {
//     medicine: "xyz medicine",
//     qty: "2 X",
//     cost: "5,000",
//   },
//   {
//     medicine: "xyz medicine",
//     qty: "2 X",
//     cost: "5,000",
//   },
// ];

const ItemsSideBar = (props: Props) => {
  const [medicine, setMedicines] = useState([]);
  const [selectedMedi, setSelectedMedi] = useState({
    item: "",
    quantity: 0,
    price: 0,
  });
  const navigate = useNavigate();
  const [tretmentSkus, setTretmentSkus] = useState<
    { id: number; item: string; quantity: number; price: number }[]
  >([]);

  useEffect(() => {
    (async () => {
      await axios.get("/treatment_skus").then((res) => {
        setMedicines(res.data);
      });

      await axios
        .get(
          "/patients/" + sessionStorage.getItem("PatientID") + "/treatment_skus"
        )
        .then((res) => {
          setTretmentSkus(res.data.patient[0].treatmentSkus);
        });
    })();
  }, []);

  const handleAutoData = () => {
    // console.log(v);
    const obj = {
      id: 1,
      item: selectedMedi.item,
      quantity: selectedMedi.quantity,
      price: selectedMedi.price,
    };

    setTretmentSkus([...tretmentSkus, obj]);
  };

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
        <div>
          <Heading style={style.labelHeading}>Add treatment skus</Heading>
          {/* <AccordionComponents
            style={style.accordionDiv}
            titleStyle={style.labelHead}
            title='xyz medicine'
          >
            <div style={style.insideContainer}>
              <Heading style={style.labelHead}>xyz medicine</Heading>
              <Heading style={style.labelData}>₹5,000</Heading>
              <Heading style={style.linkHeading}>add</Heading>
            </div>
            <div style={style.lineDiv}></div>
            <div style={style.insideContainer}>
              <Heading style={style.labelHead}>xyz medicine</Heading>
              <Heading style={style.labelData}>₹5,000</Heading>
              <Heading style={style.linkHeading}>add</Heading>
            </div>
            <div style={style.lineDiv}></div>
            <div style={style.insideContainer}>
              <Heading style={style.labelHead}>xyz medicine</Heading>
              <Heading style={style.labelData}>₹5,000</Heading>
              <div style={style.countDiv}>
                <div style={style.countButton}>-</div>
                <div style={style.countButton}>2</div>
                <div style={style.countButton}>+</div>
              </div>
            </div>
          </AccordionComponents> */}
          {/* <AutoComplete
            medicine={medicine}
            onChange={(e) => handleAutoData(e)}
          /> */}
          <Autocomplete
            id='free-solo-2-demo'
            disableClearable
            options={medicine.map((option) => option)}
            onChange={(e, v) => {
              setSelectedMedi({
                ...selectedMedi,
                item: (selectedMedi.item = v),
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search Medicine'
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />

          <TextField
            label='Enter QTY'
            onChange={(e) => {
              setSelectedMedi({
                ...selectedMedi,
                quantity: (selectedMedi.quantity = +e.target.value),
              });
            }}
          />
          <TextField
            label='Enter Price'
            onChange={(e) => {
              setSelectedMedi({
                ...selectedMedi,
                price: (selectedMedi.price = +e.target.value),
              });
            }}
          />
          <ButtonComponent
            style={style.conButton}
            buttontext='Add'
            onClick={handleAutoData}
          />
        </div>
      </div>
      <div style={style.tableContainer}>
        <div>
          <TableComponent
            style={style.tableDiv}
            headCell={["Item", "Qty.", "Cost (₹)", ""]}
            bodyCell={tretmentSkus}
          ></TableComponent>
        </div>
      </div>
      <div style={style.conDiv}>
        <ButtonComponent
          style={style.conButton}
          buttontext='Continue'
          onClick={() => props.changeType("ListSideBar")}
        />
      </div>
    </>
    // </DrawerComponents>
  );
};

export default ItemsSideBar;
