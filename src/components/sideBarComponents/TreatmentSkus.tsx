import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { style } from "../../styles/initateDischarge";
import Heading from "../heading";
import AccordionComponents from "../Accordion";
import TableComponent from "../Table";

type Props = {
  changingSideContent: number;
  steps: string[];
  itemsArray: any;
  patientItemsArray: any;
  addRoomQty: any;
  deleteTretmentSkus: any;
};

const TreatmentSkus = (props: Props) => {
  return (
    <>
      <div style={style.cardContainer}>
        <div>
          <Stepper activeStep={props.changingSideContent - 1}>
            {props.steps.map((label) => (
              <Step
                key={label}
                title={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "#3CC39A", // circle color (COMPLETED)
                    fontSize: "1.8rem",
                    borderRadius: "0.5rem",
                  },
                  // "& .MuiStepLabel-iconContainer .Mui-disabled": {
                  //   borderRadius: "0 !important",
                  // },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "grey.500", // Just text label (COMPLETED)
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "transparent", // circle color (ACTIVE)
                    borderRadius: "0.5rem",
                    border: "1px solid #3CC39A", // border color (ACTIVE)
                    fontSize: "1.8rem",
                  },
                  "& .css-vnkopk-MuiStepLabel-iconContainer": {
                    paddingRight: "0",
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "common.white", // Just text label (ACTIVE)
                    },
                  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                    fill: "black", // circle's number (ACTIVE)
                  },
                }}
              >
                <StepLabel></StepLabel>
              </Step>
            ))}
          </Stepper>
          <br />
          <div>
            <br />
            <div style={style.seprateContainer}>
              <Heading style={style.heading}>
                {props.changingSideContent === 1
                  ? "1. Medicines & equipment"
                  : props.changingSideContent === 2
                  ? "2. Room Cost"
                  : props.changingSideContent === 3
                  ? "3. Consultation cost"
                  : props.changingSideContent === 4
                  ? "4. Oxygen cost"
                  : props.changingSideContent === 5
                  ? "5. Blood Work cost"
                  : ""}
              </Heading>
              <br />
              <AccordionComponents
                style={style.accordionDiv}
                titleStyle={style.labelHead}
                title={
                  props.changingSideContent === 1
                    ? "medicines"
                    : props.changingSideContent === 2
                    ? "room"
                    : props.changingSideContent === 3
                    ? "consultation"
                    : props.changingSideContent === 4
                    ? "oxygen"
                    : props.changingSideContent === 5
                    ? "blood work"
                    : ""
                }
              >
                <>
                  {props.itemsArray.map((item: any) => {
                    return (
                      <div style={style.insideContainer}>
                        <Heading style={style.labelHead}>{item.name}</Heading>
                        <Heading style={style.labelData}>
                          ₹
                          {item.cost
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          {props.changingSideContent === 2 && "/night"}
                        </Heading>
                        {item.quantity === 0 ? (
                          <Heading
                            style={style.linkHeading}
                            onClick={() => props.addRoomQty(item, 1)}
                          >
                            add
                          </Heading>
                        ) : (
                          <div style={style.countDiv}>
                            <div
                              style={style.countButton}
                              onClick={() => {
                                item.quantity > 1 && props.addRoomQty(item, -1);
                              }}
                            >
                              -
                            </div>
                            <div style={style.countButton}>{item.quantity}</div>
                            <div
                              style={style.countButton}
                              onClick={() => props.addRoomQty(item, +1)}
                            >
                              +
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              </AccordionComponents>
            </div>
          </div>
        </div>
      </div>
      {props.patientItemsArray.length > 0 && (
        <div style={style.tableContainer}>
          <div>
            <TableComponent
              style={style.tableDiv}
              headCell={["Item", "Qty.", "Cost (₹)", ""]}
              bodyCell={props.patientItemsArray}
              deleteTretmentSkus={props.deleteTretmentSkus}
            ></TableComponent>
          </div>
        </div>
      )}
    </>
  );
};

export default TreatmentSkus;
