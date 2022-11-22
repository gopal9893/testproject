import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../../styles/pendingSideBar";
import Heading from "../heading";
import ButtonComponent from "../button";
import CloseIcon from "@material-ui/icons/Close";
// import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Props } from "./props/PendingSideBar";
import Progress from "../progres";
import axios from "../../config/axios";

const PendingSideBar = (props: Props) => {
  const [depositAmount, setDepositAmount] = React.useState(0);
  const HospitalID = localStorage.getItem("HospitalID");
  const PatientID = sessionStorage.getItem("PatientID");

  React.useEffect(() => {
    const getDepositAmount = props.patient.treatmentSkus.filter((cur) => {
      return cur.category.name === "Deposit";
    });

    if (getDepositAmount.length > 0) {
      const totalDepositAmount = getDepositAmount.reduce((a, c) => {
        return a + c.total;
      }, 0);
      setDepositAmount(totalDepositAmount);
    }
  });

  const costHeading = {
    color: props.patient.eaScores[0].ea_score <= 70 ? "#EA4848" : "#3CC39A",
    fontSize: "1.6rem",
    fontWeight: "600",
  };

  const gotoDocs = () => {
    props.changeType("DocumentsDetails");
    props.handlePosiDocs(2);
  };

  const handleSendLink = async () => {
    // try {
    //   await axios.post(
    //     "/hospitals/" +
    //       localStorage.getItem("HospitalID") +
    //       "/" +
    //       sessionStorage.getItem("PatientID") +
    //       "/payment-link/razorpay"
    //   );
    //   props.isChanged();
    //   props.closeDrawer();
    // } catch (err: any) {
    //   // alert("Error: " + err.message);
    // }
    const res = await axios.post(`/${props.patient.id}/sendpaymentlink`, {
      name: props.patient.user.full_name,
      hospitalName: props.patient.hospital.name,
      amount: depositAmount,
      number: props.patient.user.userPhoneNumber.phone_number,
    });
    props.closeDrawer();
    props.isChanged();
  };

  const handlePaid = async () => {
    try {
      await axios.post(`/hospitals/${HospitalID}/${PatientID}/mark-as-paid`);
      props.isChanged();
      props.closeDrawer();
    } catch (err: any) {
      // alert("Error: " + err.message);
    }
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
                      PAYMENT PENDING
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
                  <Heading style={style.labelData}>
                    {props.patient.insurances.length > 0
                      ? props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].details
                      : "--"}
                  </Heading>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ ...style.cardContainer, marginBottom: "5rem" }}>
          <div>
            <div style={style.insideContainer}>
              <Heading style={style.heading}>Cost break-up</Heading>
            </div>
            <br />
            <Card style={style.card}>
              <CardContent>
                <div style={style.costContainer}>
                  <div style={style.progressDiv}>
                    0
                    <Progress
                      progress={
                        props.patient.eaScores[
                          props.patient.eaScores.length - 1
                        ].ea_score
                      }
                    />
                    100
                  </div>
                  <div>
                    <Heading style={costHeading}>
                      {props.patient.eaScores[props.patient.eaScores.length - 1]
                        .ea_score > 70
                        ? `₹ ${props.patient.eaScores[
                            props.patient.eaScores.length - 1
                          ].ea_approved_amount
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "NA"}
                    </Heading>
                    <Heading style={style.labelData}>Loan available</Heading>
                  </div>
                </div>
                <div style={style.lineDiv}></div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Insurance status</Heading>
                  <Heading style={style.labelHead}>
                    {props.patient.insurances.length > 0 &&
                    props.patient.insurances[
                      props.patient.insurances.length - 1
                    ].availability
                      ? "Yes"
                      : "No"}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Policy name</Heading>
                  <Heading style={style.labelHead}>
                    {props.patient.insurances.length > 0
                      ? props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].details
                      : "--"}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>
                    Insurance applicability
                  </Heading>
                  <Heading style={style.labelHead}>
                    {props.patient.insurances.length > 0 &&
                    props.patient.insurances[
                      props.patient.insurances.length - 1
                    ].applicability
                      ? "Yes"
                      : "No"}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>Insurance coverage</Heading>
                  <Heading style={style.labelHead}>
                    ₹{" "}
                    {props.patient.insurances.length > 0
                      ? props.patient.insurances[
                          props.patient.insurances.length - 1
                        ].sum_insured
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "-"}
                  </Heading>
                </div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelHead}>
                    Total expenses estimate
                  </Heading>
                  <Heading style={style.labelData}>
                    ₹{" "}
                    {props.patient.eaScores[0].total_estimated_cost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Heading>
                </div>
                <div style={style.lineDiv}></div>
                <div style={style.insideContainer}>
                  <Heading style={style.labelData}>
                    Net amount to be paid
                  </Heading>
                  <Heading style={style.labelData}>
                    ₹{" "}
                    {props.patient.insurances.length > 0
                      ? (
                          props.patient.eaScores[
                            props.patient.eaScores.length - 1
                          ].total_estimated_cost -
                          props.patient.insurances[
                            props.patient.insurances.length - 1
                          ].sum_insured
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "-"}
                  </Heading>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div style={style.totalDiv}>
        <ButtonComponent
          onClick={() => handleSendLink()}
          style={style.paymentButton}
          buttontext='Resend payment link'
        />
        <ButtonComponent
          onClick={() => handlePaid()}
          style={style.priceButton}
          buttontext='Mark as paid'
        />
      </div>
    </div>
  );
};

export default PendingSideBar;
