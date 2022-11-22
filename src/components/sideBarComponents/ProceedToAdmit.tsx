import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../../styles/ProceedToAdmit";
import Heading from "../heading";
import ButtonComponent from "../button";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Props } from "./props/ProceedToAdmit";
import { TextField } from "@material-ui/core";
import axios from "../../config/axios";

const ProceedToADmit = (props: Props) => {
  const [addmissionDetails, setAddmissionDetails] = React.useState(["", ""]);
  const [depositAmount, setDepositAmount] = React.useState(0);
  const [otherAmount, setOtherAmount] = React.useState(0);

  React.useEffect(() => {
    const getDepositAmount = props.patient.treatmentSkus.filter((cur) => {
      return cur.category.name === "Deposit";
    });
    const getOtherAmount = props.patient.treatmentSkus.filter((cur) => {
      return cur.category.name === "Others";
    });

    if (getDepositAmount.length > 0) {
      const totalDepositAmount = getDepositAmount.reduce((a, c) => {
        return a + c.total;
      }, 0);
      setDepositAmount(totalDepositAmount);
    }

    if (getOtherAmount.length > 0) {
      const totalOtherAmount = getOtherAmount.reduce((a, c) => {
        return a + c.total;
      }, 0);
      setOtherAmount(totalOtherAmount);
    }
    // setDepositAmount(getDepositAmount[getDepositAmount.length - 1].price);
  });

  const saveAddmissionDesc = async () => {
    try {
      const res = await axios.post("/admission-details", {
        patientId: props.patient.id,
        doctorName: addmissionDetails[0],
        roomNo: addmissionDetails[1],
      });
      props.isChanged();
      props.closeDrawer();
    } catch (err: any) {
      // alert("Error: " + err.message);
    }
  };

  const gotoDocs = () => {
    props.changeType("DocumentsDetails");
    props.handlePosiDocs(3);
  };

  return (
    <div>
      <div style={style.headingDiv}>
        <div style={{ ...style.iconDiv, backgroundColor: "transparent" }}>
          {/* <KeyboardBackspaceIcon style={style.iconContainer} /> */}
        </div>
        <div>
          <Heading style={style.heading}>
            {props.patient?.user.full_name}
          </Heading>
          <Heading style={style.subHeading}>
            {props.patient.patient_code ? props.patient.patient_code : "-"}
          </Heading>
        </div>
        <div style={style.iconDiv}>
          <CloseIcon style={style.iconContainer} onClick={props.closeDrawer} />
        </div>
      </div>

      <div style={style.mainContainer}>
        <div style={style.cardContainer}>
          <div>
            <div style={style.insideContainer}>
              <Heading style={style.heading}>Payment details</Heading>
            </div>
            <br />
            <Card style={style.card}>
              <CardContent>
                <div style={style.insideContainer}>
                  <div style={style.paymentSatusDiv}>
                    <Heading style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                      PAYMENT RECEIVED
                    </Heading>
                  </div>
                </div>
                <div style={style.insideContainer}>
                  <div>
                    <Heading style={style.labelHead}>Admission charge</Heading>
                  </div>
                  <div>
                    <Heading style={style.labelData}>
                      {` ₹ ${depositAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </Heading>
                  </div>
                </div>
                <div style={style.insideContainer}>
                  <div>
                    <Heading style={style.labelHead}>
                      EasyAspataal charges
                    </Heading>
                  </div>
                  <div>
                    <Heading style={style.labelData}>
                      {otherAmount !== 0
                        ? `₹ ${otherAmount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "-"}
                    </Heading>
                  </div>
                </div>
                <div style={style.insideContainer}>
                  <div>
                    <Heading style={style.labelHead}>Transaction ID</Heading>
                  </div>
                  <div>
                    <Heading style={style.labelData}>
                      {props.patient.payments.length > 0
                        ? props.patient.payments[
                            props.patient.payments.length - 1
                          ].order_id
                        : "-"}
                    </Heading>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={style.cardContainer}>
          <div>
            <div style={style.insideContainer}>
              <Heading style={style.heading}>Patient details</Heading>
              <Heading style={style.linkHeading} onClick={gotoDocs}>
                view documents
              </Heading>
            </div>
            <br />
            <Card style={style.card}>
              <CardContent>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Patient ID</Heading>
                  <Heading style={style.labelData}>
                    {props.patient.patient_code
                      ? props.patient.patient_code
                      : "-"}
                  </Heading>
                </div>
                {/* <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Treatment name</Heading>
                  <Heading style={style.labelData}>
                    {props.patient.treatment_name
                      ? props.patient.treatment_name
                      : "-"}
                  </Heading>
                </div> */}
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Age & Gender</Heading>
                  <Heading style={style.labelData}>
                    {(
                      new Date().getFullYear() -
                      +props.patient.user.dob.split("-")[0]
                    ).toString()}{" "}
                    / {props.patient.user.gender === "Male" ? "M" : "F"}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Contact</Heading>
                  <Heading style={style.labelData}>
                    {props.patient.user.userPhoneNumber.phone_number}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Insurance policy</Heading>
                  <Heading
                    style={{
                      ...style.labelData,
                      color:
                        props.patient.insurances.length > 0 &&
                        props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].details
                          ? "black"
                          : "red",
                    }}
                  >
                    {props.patient.insurances.length > 0
                      ? props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].details
                      : "-"}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>
                    Insurance applicability
                  </Heading>
                  <Heading
                    style={{
                      ...style.labelData,
                      color:
                        props.patient.insurances.length > 0 &&
                        props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].applicability
                          ? "black"
                          : "red",
                    }}
                  >
                    {props.patient.insurances.length > 0
                      ? props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].applicability
                        ? "Yes"
                        : "No"
                      : "-"}
                  </Heading>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ ...style.cardContainer, marginBottom: "5rem" }}>
          <div>
            <Heading style={style.heading}>Admission details</Heading>
            <br />
            <Card style={style.card}>
              <CardContent>
                {/* {addmissionDetails.map((cur, idx) => {
                  return (
                    <> */}
                <div style={style.insideContainer}>
                  <Heading style={style.labelData}>1. Doctor</Heading>
                </div>
                <TextField
                  style={style.textContainer}
                  type='text'
                  placeholder='mention'
                  variant='outlined'
                  id='doc'
                  onChange={(e) =>
                    setAddmissionDetails([e.target.value, addmissionDetails[1]])
                  }
                />
                <div style={style.lineDiv}></div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelData}>2. Room number</Heading>
                </div>
                <TextField
                  style={style.textContainer}
                  type='text'
                  placeholder='mention'
                  variant='outlined'
                  id='des'
                  onChange={(e) =>
                    setAddmissionDetails([addmissionDetails[0], e.target.value])
                  }
                />
                {/* <div style={style.saveButtonDiv} onClick={saveAddmissionDesc}>
                  <ButtonComponent style={style.saveButton} buttontext='Save' />
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div style={style.downDiv}>
        <ButtonComponent
          style={{
            ...style.buttonDown,
            backgroundColor:
              addmissionDetails[0] === "" || addmissionDetails[1] === ""
                ? "#D9D9D9"
                : "#4D24CD",
          }}
          disabled={addmissionDetails[0] === "" || addmissionDetails[1] === ""}
          onClick={saveAddmissionDesc}
          buttontext='Admit'
        />
      </div>
    </div>
  );
};

export default ProceedToADmit;
