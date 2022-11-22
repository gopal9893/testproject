import React from "react";
import Heading from "../heading";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../../styles/initateDischarge";
import TableComponent from "../Table";

type Props = {
  title: string;
  patientItems: any;
  deleteTretmentSkus: any;
  totalCostPayment: number;
  handleChangeSideContent: () => void;
};

const TreatmentCategory = (props: Props) => {
  return (
    <div style={style.cardContainer}>
      <div>
        <div style={style.insideContainer}>
          <Heading style={style.heading}>{props.title}</Heading>
          <Heading
            style={style.linkHeading}
            onClick={props.handleChangeSideContent}
          >
            edit
          </Heading>
        </div>
        <br />
        <Card style={style.card}>
          <CardContent>
            {props.patientItems.length > 0 && (
              <div
                style={{
                  ...style.tableContainer,
                  marginBottom: "0",
                  backgroundColor: "transparent",
                }}
              >
                <div>
                  <TableComponent
                    style={{ width: "30rem" }}
                    headCell={["Item", "Qty.", "Cost (₹)", ""]}
                    bodyCell={props.patientItems}
                    deleteTretmentSkus={props.deleteTretmentSkus}
                  ></TableComponent>
                </div>
              </div>
            )}
            <div
              style={{
                ...style.insideContainer,
                padding: "0.5rem 1rem 0rem",
              }}
            >
              <Heading style={style.labelData}>Sub Total</Heading>
              <Heading style={style.labelData}>
                ₹{" "}
                {props.totalCostPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Heading>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TreatmentCategory;
