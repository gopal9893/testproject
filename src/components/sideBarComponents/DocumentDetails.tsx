import { Backdrop, Button, Card, Fade, Modal } from "@material-ui/core";
import React from "react";
import { style } from "../../styles/docdetails";
import GetAppIcon from "@material-ui/icons/GetApp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Heading from "../heading";
import { Props } from "./props/DocDetails";

const DocumentDetails = (props: Props) => {
  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={props.open}
        onClose={props.onClick}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open} style={style.modal}>
          <div>
            <div style={style.upDiv}>
              <KeyboardBackspaceIcon
                style={style.iconDiv}
                onClick={props.onClick}
              />
              <Heading style={style.labelData}>
                {props.patDoc.doc_type.charAt(0).toUpperCase() +
                  props.patDoc.doc_type.slice(1).replaceAll("_", " ")}{" "}
                {props.patDoc.doc_type === "pan" ||
                props.patDoc.doc_type === "aadhar"
                  ? "Card"
                  : ""}
              </Heading>
              <a href={props.patDoc.doc_link} download>
                <GetAppIcon style={style.iconDiv} />
              </a>
            </div>
            <div style={style.cardDivContainer}>
              <Card style={style.cardMiddleDiv}>
                <img
                  width='100%'
                  src={props.patDoc.doc_link}
                  alt='Aadhar Card'
                />
              </Card>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default DocumentDetails;
