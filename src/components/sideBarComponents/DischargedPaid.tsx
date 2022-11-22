import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../../styles/initateDischarge";
import Heading from "../heading";
import ButtonComponent from "../button";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Props } from "./props/InitateDischarge";

const DischargedPaid = (props: Props) => {
  const [changingSideContent, setChangingSideContent] =
    React.useState<number>(0);
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

  const gotoDocs = () => {
    props.changeType("DocumentsDetails");
    props.handlePosiDocs(5);
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
                    <div style={style.paidDiv}>PAID</div>
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
                            Paid during{" "}
                            {cur.WFTP == "admission"
                              ? "admission"
                              : "discharge"}
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
                  {props.patient.insurances.length == 0 &&
                    props.patient.eaScores[0].ea_score > 70 && (
                      <>
                        <div
                          style={{
                            borderBottom: "1px dashed #E6E4E7",
                            margin: "1rem",
                          }}
                        ></div>
                        <div>
                          <div
                            style={{
                              ...style.insideContainer,
                              padding: "0 1rem",
                            }}
                          >
                            <Heading
                              style={{ ...style.labelHead, color: "#4D24CD" }}
                            >
                              Amount Covered by EA
                            </Heading>
                            <Heading style={style.labelData}>
                              ₹{" "}
                              {props.patient.eaScores[0].ea_approved_amount
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
                            <Heading style={style.labelData}>{"-"}</Heading>
                          </div>
                        </div>
                      </>
                    )}
                  {props.patient.insurances.length > 0 && (
                    <>
                      <div
                        style={{
                          borderBottom: "1px dashed #E6E4E7",
                          margin: "1rem",
                        }}
                      ></div>
                      <div>
                        <div
                          style={{
                            ...style.insideContainer,
                            padding: "0 1rem",
                          }}
                        >
                          <Heading
                            style={{ ...style.labelHead, color: "#4D24CD" }}
                          >
                            Amount Covered by insurance
                          </Heading>
                          <Heading style={style.labelData}>
                            ₹{" "}
                            {props.patient.insurances[0].sum_insured
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Heading>
                        </div>
                        {props.patient.insurances[0].sum_insured +
                          depositAmount <
                          props.patient.treatmentCostTotal &&
                          props.patient.eaScores[0].ea_score > 70 && (
                            <div
                              style={{
                                ...style.insideContainer,
                                padding: "0 1rem",
                              }}
                            >
                              <Heading
                                style={{ ...style.labelHead, color: "#4D24CD" }}
                              >
                                Amount Covered by EA
                              </Heading>
                              <Heading style={style.labelData}>
                                ₹{" "}
                                {props.patient.eaScores[0].ea_approved_amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </Heading>
                            </div>
                          )}
                        <div
                          style={{
                            ...style.insideContainer,
                            padding: "0 1rem",
                          }}
                        >
                          <Heading style={style.labelHead}>
                            Transaction ID
                          </Heading>
                          <Heading style={style.labelData}>{"-"}</Heading>
                        </div>
                      </div>
                    </>
                  )}
                  {props.patient.insurances[0].sum_insured + depositAmount >
                    props.patient.treatmentCostTotal && (
                    <>
                      <div
                        style={{
                          borderBottom: "1px dashed #E6E4E7",
                          margin: "1rem",
                        }}
                      ></div>
                      <div>
                        <div
                          style={{
                            ...style.insideContainer,
                            padding: "0 1rem",
                          }}
                        >
                          <Heading style={style.labelHead}>
                            To Be Refunded
                          </Heading>
                          <Heading
                            style={{ ...style.labelData, color: "#EA4848" }}
                          >
                            ₹{" "}
                            {Math.abs(
                              props.patient.insurances[0].sum_insured +
                                depositAmount -
                                props.patient.treatmentCostTotal
                            )
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
                          <Heading style={style.labelData}>{"-"}</Heading>
                        </div>
                      </div>
                    </>
                  )}
                </>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <div style={style.downDiv}>
        <ButtonComponent style={style.buttonDown} buttontext='--' />
      </div> */}
    </div>
  );
};

export default DischargedPaid;
