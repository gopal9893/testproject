import { style } from "../../styles/docsidebar";
import Heading from "../heading";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DocumentDetails from "./DocumentDetails";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "./props/DocsSideBar";
import { curryRight, update } from "lodash";
import axios from "../../config/axios";
import { error } from "console";

const DocumentsSideBar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState({
    doc_type: "",
    doc_link: "",
  });
  const [updatedDocuments, setUpdatedDocuments] = useState<any>([]);
  const navigate = useNavigate();

  const handleDocuments = (value: any) => {
    setOpen(true);
    setDocuments({
      doc_type: props.patient.user.docs[value].doc_type,
      doc_link: props.patient.user.docs[value].doc_link,
    });
  };

  // const onDocUpload = async (e: any) => {
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0], e.target.files[0].name);
  //   formData.append("docType", "additional_doc");
  //   axios
  //     .post(
  //       "/hospitals/" + sessionStorage.getItem("PatientID") + "/upload",
  //       formData
  //     )
  //     .then((res) => {
  //       setUpdatedDocuments(res.data.userDocs);
  //     })
  //     .catch((err) => {
  //       // alert("Error uploading " + err.message);
  //     });
  // };

  const toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onFileUpload = async (docType: any, file: any) => {
    // console.log("file.name",file.name);
    const res = await axios.get(`/users/${props.patient.user_id}`);

    console.log("res.data", res.data);
    var base = await toBase64(file);
    //  console.log("base",base);
    var config = {
      attachment: base,
      name: file.name,
      doctype: docType,
    };
    await axios
      .post(
        "https://fintech-cloudsql-7k5qcren2q-el.a.run.app/api/userdocs/upload",
        config,
        {
          headers: {
            authorization: `Bearer ${res.data.token}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data.docId", res.data);
        console.log(props.patient.user);
        setUpdatedDocuments([
          ...props.patient.user.docs,
          {
            doc_link: res.data.doclink,
            doc_type: docType,
            id: res.data.docId,
          },
        ]);
      });
  };

  return (
    // <DrawerComponents style={style.mainContainer} open={true}>
    <>
      <div style={style.headingContainer}>
        <div style={style.iconDiv}>
          <KeyboardBackspaceIcon
            style={style.iconContainer}
            onClick={() => {
              props.changeType(
                props.posiOfDocument === 2
                  ? "PendingDetails"
                  : props.posiOfDocument === 3
                  ? "AdmitDetails"
                  : props.posiOfDocument === 4
                  ? "InitiateDischarge"
                  : props.posiOfDocument === 5
                  ? "Discharged"
                  : "PatientDetails"
              );
            }}
          />
        </div>
        <Heading style={style.heading}>Documents</Heading>
        <div style={style.iconDiv}>
          <CloseIcon style={style.iconContainer} onClick={props.closeDrawer} />
        </div>
      </div>
      {updatedDocuments.length > 0
        ? updatedDocuments.map((cur: any, i: any) => {
            return (
              <div style={style.cardContainer}>
                <Card style={style.card}>
                  <CardContent style={style.cardDiv}>
                    <Heading style={style.labelData}>
                      {(i + 1).toString()}.{" "}
                      {cur.doc_type.charAt(0).toUpperCase() +
                        (cur.doc_type.includes("_")
                          ? cur.doc_type.split("_")[0].slice(1) +
                            " " +
                            cur.doc_type.split("_")[1].charAt(0).toUpperCase() +
                            cur.doc_type.split("_")[1].slice(1)
                          : cur.doc_type.slice(1))}{" "}
                      {cur.doc_type === "pan" || cur.doc_type === "aadhar"
                        ? "Card"
                        : ""}
                    </Heading>
                    <div>
                      <VisibilityOutlinedIcon
                        style={style.iconTag}
                        onClick={() => handleDocuments(i)}
                      />
                      <a href={cur.doc_link} download>
                        <GetAppIcon style={style.iconTag} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })
        : props.patient.user.docs.map((cur, i) => {
            return (
              <div style={style.cardContainer}>
                <Card style={style.card}>
                  <CardContent style={style.cardDiv}>
                    <Heading style={style.labelData}>
                      {(i + 1).toString()}.{" "}
                      {cur.doc_type.charAt(0).toUpperCase() +
                        (cur.doc_type.includes("_")
                          ? cur.doc_type.split("_")[0].slice(1) +
                            " " +
                            cur.doc_type.split("_")[1].charAt(0).toUpperCase() +
                            cur.doc_type.split("_")[1].slice(1)
                          : cur.doc_type.slice(1))}{" "}
                      {cur.doc_type === "pan" || cur.doc_type === "aadhar"
                        ? "Card"
                        : ""}
                    </Heading>
                    <div>
                      <VisibilityOutlinedIcon
                        style={style.iconTag}
                        onClick={() => handleDocuments(i)}
                      />
                      <a href={cur.doc_link} download>
                        <GetAppIcon style={style.iconTag} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
      <div style={style.cardContainer}>
        {/* <Card style={style.card}>
          <CardContent style={style.cardDiv}> */}
        <input
          type='file'
          name='myImage'
          //   style={style.addDocumentCon}
          id='upload'
          style={{ display: "none" }}
          onChange={(e: any) =>
            onFileUpload("additional_doc", e.target.files[0])
          }
        />
        <div style={style.addDocumentCon}>
          <label htmlFor='upload' style={style.linkHeading}>
            + Add document
          </label>
        </div>
      </div>
      <DocumentDetails
        open={open}
        onClick={() => setOpen(false)}
        patDoc={documents}
      />
    </>
    //  </DrawerComponents>
  );
};

export default DocumentsSideBar;
