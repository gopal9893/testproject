import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../../styles/DischargedPending";
import Heading from "../heading";
import ButtonComponent from "../button";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Props } from "./props/InitateDischarge";
import axios from "../../config/axios";

const DischargedPending = (props: Props) => {
  const [changingSideContent, setChangingSideContent] =
    React.useState<number>(0);
  const HospitalID = localStorage.getItem("HospitalID");
  const PatientID = sessionStorage.getItem("PatientID");
  const token = localStorage.getItem("token");

  const gotoDocs = () => {
    props.changeType("DocumentsDetails");
    props.handlePosiDocs(5);
  };

  const handleSendLink = async () => {
    try {
      const res = await axios.post(
        `/${props.patient.id}/sendpaymentlinkDischarge`,
        {
          name: props.patient.user.full_name,
          hospitalName: props.patient.hospital.name,
          amount: props.patient.treatmentCostTotal,
          number: props.patient.user.userPhoneNumber.phone_number,
        }
      );
      props.isChanged();
      props.closeDrawer();
    } catch (err: any) {
      // alert("Error: " + err.message);
    }
  };

  const handlePaid = async () => {
    await axios.post(`/hospitals/${HospitalID}/${PatientID}/mark-as-paid`);
    props.isChanged();
    props.closeDrawer();
  };

  return (
    <div>
      <div style={style.headingDiv}>
        <div
          style={{
            ...style.iconDiv,
            visibility: changingSideContent !== 0 ? "visible" : "hidden",
          }}
        >
          <KeyboardBackspaceIcon
            style={style.iconContainer}
            onClick={() => setChangingSideContent(changingSideContent - 1)}
          />
        </div>
        <div>
          <Heading style={style.heading}>
            {props.patient?.user.full_name}
          </Heading>
          <Heading style={style.subHeading}>
            {props.patient?.patient_code ? props.patient?.patient_code : "-"}
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
                    {props.patient?.patient_code
                      ? props.patient?.patient_code
                      : "-"}
                  </Heading>
                </div>
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
                      : "-"}
                  </Heading>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ ...style.cardContainer, marginBottom: "5rem" }}>
          <div>
            <div style={style.insideContainer}>
              <Heading style={style.heading}>Payment details</Heading>
            </div>
            <br />
            <Card style={style.card}>
              <CardContent style={{ padding: "0 0 1rem 0" }}>
                <>
                  <div style={style.totalBillDiv}>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: "600" }}>
                        TOTAL BILL AMOUNT
                      </div>
                      <div style={style.totalBillAmount}>
                        ₹{" "}
                        {props.patient.treatmentCostTotal
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                    </div>
                    <div style={style.paidDiv}>PENDING</div>
                  </div>
                  {props.patient.payments.map((cur, i) => {
                    return (
                      <div>
                        <div
                          style={{
                            ...style.insideContainer,
                            padding: "0 1rem",
                          }}
                        >
                          <Heading style={style.labelHead}>
                            Paid during admission
                          </Heading>
                          <Heading style={style.labelData}>
                            ₹{" "}
                            {cur.amount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Heading>
                        </div>
                        <div
                          style={{
                            ...style.insideContainer,
                            padding: "0 1rem",
                          }}
                        >
                          <Heading style={style.labelHead}>
                            Transaction ID
                          </Heading>
                          <Heading style={style.labelData}>
                            {cur.order_id ? cur.order_id : "-"}
                          </Heading>
                        </div>
                        {i !== props.patient.payments.length - 1 && (
                          <div
                            style={{
                              borderBottom: "1px dashed #E6E4E7",
                              margin: "1rem",
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </>
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

export default DischargedPending;
