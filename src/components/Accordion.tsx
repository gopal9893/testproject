import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Heading from "./heading";
import { Props } from "../props/Accordion";
import { style } from "../styles/Accordion";

const AccordionComponents = (props: Props) => {
  return (
    <Accordion style={props.style}>
      <AccordionSummary
        style={style.accordionSDiv}
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Heading style={props.titleStyle}>{props.title}</Heading>
      </AccordionSummary>
      <AccordionDetails style={style.accordionDetails}>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponents;
