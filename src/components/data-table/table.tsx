import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Card from "@material-ui/core/Card";
import PatientInterface from "../../interfaces/table";
import DrawerComponents from "../../pages/drawer/drawer";
import axios from "../../config/axios";
import DocumentsSideBar from "../sideBarComponents/DocumentsSideBar";
// import ItemsSideBar from "../sideBarComponents/ItemsSideBar";
// import ListSideBarComponent from "../sideBarComponents/ListSideBar";
import SideBarComponent from "../sideBarComponents/SideBar";
import PendingSideBar from "../sideBarComponents/PendingSideBar";
import ProceedToADmit from "../sideBarComponents/ProceedToAdmit";
import { Popover } from "@material-ui/core";
import Heading from "../heading";
import { style } from "@mui/system";
import ScoreBarComponent from "../sideBarComponents/Score";
import InitiateDischarge from "../sideBarComponents/InitiateDischarge";
import DischargedPaid from "../sideBarComponents/DischargedPaid";
import DischargedPending from "../sideBarComponents/DischargedPending";
import Axios from "axios";
// import useMediaQuery from "@mui/material/useMediaQuery";

interface PatientData {
  data: PatientInterface[];
  isChanged: () => void;
  isDraft: boolean;
  draftPatient: any;
}

const patient = {
  id: 1,
  patient_code: "-",
  status: "active",
  is_bnpl: true,
  treatment_name: "Test",
  createdAt: "2022-08-19 13:52:16",
  updatedAt: "2022-08-21 12:07:54",
  hospital_id: 1,
  user_id: 1,
  netTotal: 0,
  treatmentCostTotal: 0,
  user: {
    id: 1,
    full_name: "Dhaval",
    email: "a@a.com",
    dob: "2000-01-01",
    gender: "male",
    createdAt: "2022-08-19 13:46:10",
    updatedAt: "2022-08-19 13:46:10",
    docs: [
      {
        id: 13,
        user_id: 1,
        doc_type: "pan",
        doc_link:
          "https://fintechstaging.s3.ap-south-1.amazonaws.com/7623037814577376-pb.jpg",
        createdAt: "2022-08-22 18:54:47",
        updatedAt: "2022-08-22 18:54:47",
      },
      {
        id: 14,
        user_id: 1,
        doc_type: "insurance",
        doc_link:
          "https://fintechstaging.s3.ap-south-1.amazonaws.com/8660251768600147-Screenshot%20%28459%29.png",
        createdAt: "2022-08-22 18:55:49",
        updatedAt: "2022-08-22 18:55:49",
      },
      {
        id: 15,
        user_id: 1,
        doc_type: "aadhar",
        doc_link:
          "https://fintechstaging.s3.ap-south-1.amazonaws.com/8033820052326324-Screenshot%20%28463%29.png",
        createdAt: "2022-08-23 09:28:46",
        updatedAt: "2022-08-23 09:28:46",
      },
    ],
    userMedicalDetails: {
      id: 1,
      user_id: 1,
      hospital_id: 1,
      medical_conditions: "string",
      symptoms: "string",
      allergies: "string",
      createdAt: "2022-08-19 13:52:16",
      updatedAt: "2022-08-26 06:22:32",
    },
    userPhoneNumber: {
      id: 27,
      user_id: 1,
      phone_number: "7456387654",
      otp: "4865",
      otp_valid_till: "2022-08-22 17:12:33",
      createdAt: "2022-08-22 17:11:33",
      updatedAt: "2022-08-22 17:11:33",
    },
    userSurgeries: [
      {
        id: 1,
        user_id: 1,
        surgery_id: 1,
        createdAt: "2022-08-25 14:32:13",
        updatedAt: "2022-08-25 14:32:13",
        surgery: {
          id: 1,
          name: "Diabetes",
          createdAt: "2022-08-25 14:31:38",
          updatedAt: "2022-08-25 14:31:38",
        },
      },
      {
        id: 2,
        user_id: 1,
        surgery_id: 2,
        createdAt: "2022-08-29 14:12:18",
        updatedAt: "2022-08-29 14:12:18",
        surgery: {
          id: 2,
          name: "Tumor",
          createdAt: "2022-08-25 14:31:45",
          updatedAt: "2022-08-25 14:31:45",
        },
      },
    ],
  },
  treatmentSkus: [
    {
      id: 14,
      item: "single room",
      price: 30000,
      quantity: 1,
      total: 30000,
      paid: 0,
      category: {
        id: 2,
        name: "Room Cost",
      },
    },
  ],
  symptoms: [
    {
      id: 51,
      patient_id: 58,
      symptom_id: 2,
    },
  ],
  eaScores: [
    {
      id: 31,
      total_estimated_cost: 5000,
      ea_score: 0,
      ea_approved_amount: 0,
      createdAt: "2022-09-15 11:34:56",
      updatedAt: "2022-09-15 11:34:56",
      patient_id: 22,
    },
  ],
  insurances: [
    {
      id: 21,
      patient_id: 22,
      details: "abcd",
      sum_insured: 5000,
      availability: true,
      applicability: true,
      co_pay: 0,
      createdAt: "2022-09-15 11:32:30",
      updatedAt: "2022-09-15 11:32:30",
    },
  ],
  payments: [
    {
      id: 222,
      order_id: "-",
      amount: 0,
      link: "https://rzp.io/i/wOCoi6dAuJ",
      transaction_id: null,
      status: "pending",
      createdAt: "2022-09-21 16:58:46",
      updatedAt: "2022-09-21 16:58:46",
      patient_id: 62,
      WFTP: "",
    },
  ],
  hospital: {
    email: "",
    name: "",
  },
};

export const PatientTable: React.FC<PatientData> = ({
  data,
  isChanged,
  isDraft,
  draftPatient,
}: PatientData) => {
  // const [rows, setRows] = useState(data);
  const [patientDetails, setPatientDetails] = useState(patient);
  const [state, setState] = useState(false);
  const token = localStorage.getItem("token");
  const HospitalID = localStorage.getItem("HospitalID");
  const [drawerType, setDrawerType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [selectID, setSelectedID] = useState(0);
  const [selectPatient, setSelectedPatient] = useState<any>();
  const [posiOfDocument, setPosiOfDocument] = useState(0);
  // const matches = useMediaQuery("(max-width:1490px)");

  // console.log(matches ? "Yes" : "No");

  useEffect(() => {
    if (isDraft) {
      Axios.get(
        `http://localhost:8080/fintech/getdraftstatus?hospital_id=${HospitalID}`
      ).then((res) => {
        // setfilteredData(res.data.patients);
        // setEndPages(res.data.totalPages);
        console.log(res.data);
      });
    }
  }, [isDraft]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClick = (event: any, patient: any) => {
    setSelectedID(patient.id);
    setSelectedPatient(patient);
    setAnchorEl(event.currentTarget);
  };

  const handleActiveClick = (event: any, patient: any) => {
    setSelectedID(patient.patient_id);
    setSelectedPatient(patient);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sideBar = {
    width: "38rem",
    // height: "100vh",
    padding: "1rem 0",
    backgroundColor: "#FAFAFA",
  };

  const toggleDrawer = (open: boolean) => {
    setState(open);
  };

  const closeDrawer = () => {
    setState(false);
  };

  const handleRowClick = async (
    event: React.MouseEvent<unknown>,
    id?: number
  ) => {
    const res = await axios.get(`/hospitals/${HospitalID}/patient/${id}`, {
      headers: {
        authorization:
          localStorage!.getItem("token") !== null
            ? `Bearer ${localStorage.getItem("token")}`!
            : false,
      },
    });
    sessionStorage.setItem("PatientID", res.data.patient.id);
    setPatientDetails(res.data.patient);
    if (
      res.data.patient.status === "generate_admission_payment_link" ||
      res.data.patient.status === "generate_discharge_payment_link"
    ) {
      setDrawerType("PatientDetails");
    } else if (res.data.patient.status === "payment_of_admission_pending") {
      setDrawerType("PendingDetails");
    } else if (res.data.patient.status === "proceed_to_admit") {
      setDrawerType("AdmitDetails");
    } else if (res.data.patient.status === "admitted") {
      setDrawerType("InitiateDischarge");
    } else if (res.data.patient.status === "payment_of_discharge_pending") {
      setDrawerType("DischargePending");
    } else if (res.data.patient.status === "discharged") {
      setDrawerType("Discharged");
    } else {
      setDrawerType("");
    }
    setState(true);
  };

  const changeType = (type: any) => {
    setDrawerType(type);
  };

  const handleAdmittedPatient = async () => {
    try {
      await axios.post(
        `/hospitals/${HospitalID}/${selectID}/change-status?status=initiate_discharge`,
        {
          updatedStatus: "generate_discharge_payment_link",
        }
      );
      isChanged();
      setAnchorEl(null);
    } catch (err: any) {
      // alert("Error: " + err.message);
    }
  };

  const handleActivePatient = async () => {
    try {
      await axios.post(
        `/hospitals/${HospitalID}/${selectID}/change-status?status=initiate_discharge`,
        {
          updatedStatus: "generate_admission_payment_link",
        }
      );
      await Axios.delete(
        `http://localhost:8080/fintech/deletedraftstatus?id=${selectPatient.id}`
      );
      isChanged();
      setAnchorEl(null);
    } catch (err: any) {
      // alert("Error: " + err.message);
    }
  };

  const handlePosiDocs = (value: any) => {
    setPosiOfDocument(value);
  };

  const handleDelete = async () => {
    try {
      await axios.post(
        `/hospitals/${HospitalID}/${selectID}/change-status?status=draft`,
        {
          updatedStatus: "draft",
        }
      );
      await Axios.post("http://localhost:8080/fintech/insertdraftstatus", {
        patient_id: selectPatient.id,
        hospital_id: selectPatient.hospital_id,
        user_id: selectPatient.user_id,
        status: "draft",
        is_policyholder: selectPatient.is_policyholder,
        is_bnpl: selectPatient.is_bnpl,
        treatment_name: selectPatient.treatment_name,
        discharge_initiated_at: selectPatient.discharge_initiated_at,
        detail_feedback: selectPatient.detail_feedback,
        full_name: selectPatient.user.full_name,
        email: selectPatient.user.email,
        dob: selectPatient.user.dob,
        gender: selectPatient.user.gender,
        phone_number:
          selectPatient.user.phoneNumbers[
            selectPatient.user.phoneNumbers.length - 1
          ].phone_number,
        doctor_name: "",
        room_no: 0,
      });
      isChanged();
      setAnchorEl(null);
    } catch (err: any) {
      // alert("Error: " + err.message);
    }
  };

  return (
    <>
      <div style={{ marginLeft: "5%", marginTop: "2%" }}>
        <DrawerComponents
          style={sideBar}
          open={state}
          onClose={() => toggleDrawer(false)}
        >
          {drawerType === "PatientDetails" ? (
            <SideBarComponent
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              isChanged={isChanged}
              handlePosiDocs={handlePosiDocs}
              posiOfDocument={posiOfDocument}
            />
          ) : drawerType === "PendingDetails" ? (
            <PendingSideBar
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              isChanged={isChanged}
              handlePosiDocs={handlePosiDocs}
            />
          ) : drawerType === "AdmitDetails" ? (
            <ProceedToADmit
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              isChanged={isChanged}
              handlePosiDocs={handlePosiDocs}
            />
          ) : drawerType === "InitiateDischarge" ? (
            <InitiateDischarge
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              isChanged={isChanged}
              handlePosiDocs={handlePosiDocs}
              posiOfDocument={posiOfDocument}
            />
          ) : drawerType === "Discharged" ? (
            <DischargedPaid
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              isChanged={isChanged}
              handlePosiDocs={handlePosiDocs}
              posiOfDocument={posiOfDocument}
            />
          ) : drawerType === "DischargePending" ? (
            <DischargedPending
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              isChanged={isChanged}
              handlePosiDocs={handlePosiDocs}
              posiOfDocument={posiOfDocument}
            />
          ) : drawerType === "DocumentsDetails" ? (
            <DocumentsSideBar
              patient={patientDetails}
              closeDrawer={closeDrawer}
              changeType={changeType}
              posiOfDocument={posiOfDocument}
            />
          ) : (
            // <SideBarComponent
            //   patient={patientDetails}
            //   closeDrawer={closeDrawer}
            //   changeType={changeType}
            // />
            <div></div>
            // <ScoreBarComponent handleIsInsurance={handleIsInsurance} />
          )}
        </DrawerComponents>

        <Card variant='outlined'>
          <TableContainer>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow style={{ background: "#F5F2FF" }}>
                  <TableCell align='center'>Token No.</TableCell>
                  <TableCell align='center'>Patient Name</TableCell>
                  <TableCell align='center'>Patient ID</TableCell>
                  <TableCell align='center'>Age</TableCell>
                  <TableCell align='center'>Gender</TableCell>
                  <TableCell align='center'>Contact No.</TableCell>
                  <TableCell align='center'>Medical Condition</TableCell>
                  <TableCell align='center'>
                    {isDraft ? "Delete On" : "Status"}
                  </TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isDraft
                  ? draftPatient.map((row: any) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell
                            align='center'
                            style={{ fontWeight: "500" }}
                          >
                            {row.patient_id}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                          >
                            {row.full_name}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                          >
                            {row.patient_code ? row.patient_code : "-"}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                          >
                            {new Date().getFullYear() - +row.dob.split("-")[0]}
                          </TableCell>
                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                          >
                            {row.gender}
                          </TableCell>
                          {/* {row.user.phoneNumbers?.map((option) => (
                            <TableCell
                              align='center'
                              style={{ fontWeight: "600", cursor: "pointer" }}
                              onClick={(event) => handleRowClick(event, row.patient_id)}
                            >
                              {option.phone_number}
                            </TableCell>
                          ))} */}
                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                          >
                            {row.treatment_name && row.treatment_name !== "null"
                              ? row.treatment_name
                              : "-"}
                          </TableCell>

                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                          >
                            {row.status}
                          </TableCell>

                          <TableCell
                            align='center'
                            // style={{ fontWeight: "500" }}
                          >
                            <div onClick={(e) => handleActiveClick(e, row)}>
                              <MoreHorizIcon />
                            </div>
                          </TableCell>
                          <Popover
                            id={anchorEl ? "simple-popover" : undefined}
                            open={anchorEl ? true : false}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                          >
                            <div
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              onClick={handleActivePatient}
                            >
                              <Heading
                                style={{
                                  fontWeight: "500",
                                  padding: "0.5rem 1rem",
                                  backgroundColor: isHover
                                    ? "#f3f3f3"
                                    : "transparent",
                                  cursor: "pointer",
                                }}
                              >
                                Move to Active
                              </Heading>
                            </div>
                          </Popover>
                        </TableRow>
                      );
                    })
                  : data?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align='center' style={{ fontWeight: "500" }}>
                          {row.id}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "600", cursor: "pointer" }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {row.user.full_name}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "600", cursor: "pointer" }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {row.patient_code ? row.patient_code : "-"}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "600", cursor: "pointer" }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {new Date().getFullYear() -
                            +row.user.dob.split("-")[0]}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "600", cursor: "pointer" }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {row.user.gender}
                        </TableCell>
                        {/* {row.user.phoneNumbers?.map((option) => (
                          <TableCell
                            align='center'
                            style={{ fontWeight: "600", cursor: "pointer" }}
                            onClick={(event) => handleRowClick(event, row.id)}
                          >
                            {option.phone_number}
                          </TableCell>
                        ))} */}
                        <TableCell
                          align='center'
                          style={{ fontWeight: "600", cursor: "pointer" }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {row.user.userPhoneNumber
                            ? row.user.userPhoneNumber.phone_number
                            : "-"}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ fontWeight: "600", cursor: "pointer" }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {row.treatment_name ? row.treatment_name : "-"}
                        </TableCell>

                        <TableCell
                          align='center'
                          style={{
                            color:
                              row.status ===
                                "generate_admission_payment_link" ||
                              row.status === "generate_discharge_payment_link"
                                ? "red"
                                : row.status === "proceed_to_admit" ||
                                  row.status === "admitted"
                                ? "green"
                                : "black",
                            fontWeight: "600",
                          }}
                          onClick={(event) => handleRowClick(event, row.id)}
                        >
                          {row.status === "generate_admission_payment_link"
                            ? "Generate link"
                            : row.status === "proceed_to_admit"
                            ? " Proceed to Admit"
                            : row.status === "payment_of_admission_pending"
                            ? "Pending"
                            : row.status === "generate_discharge_payment_link"
                            ? "Generate link"
                            : row.status === "payment_of_discharge_pending"
                            ? "Pending"
                            : row.status === "admitted"
                            ? "Initiate discharge"
                            : row.status === "discharged"
                            ? "Discharged"
                            : ""}
                        </TableCell>

                        {/* {row.status === "generate_admission_payment_link" && (
                    <TableCell align='center' style={{ color: "red" }}>
                      Generate link
                    </TableCell>
                  )}
                  {row.status === "proceed_to_admit" && (
                    <TableCell align='center' style={{ color: "green" }}>
                      Proceed to Admit
                    </TableCell>
                  )}
                  {row.status === "payment_of_admission_pending" && (
                    <TableCell align='center' style={{ fontWeight: "500" }}>
                      Pending
                    </TableCell>
                  )} */}
                        <TableCell
                          align='center'
                          // style={{ fontWeight: "500" }}
                        >
                          <div onClick={(e) => handleClick(e, row)}>
                            <MoreHorizIcon />
                          </div>
                        </TableCell>
                        <Popover
                          id={anchorEl ? "simple-popover" : undefined}
                          open={anchorEl ? true : false}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleAdmittedPatient}
                          >
                            <Heading
                              style={{
                                fontWeight: "500",
                                padding: "0.5rem 1rem",
                                backgroundColor: isHover
                                  ? "#f3f3f3"
                                  : "transparent",
                                cursor: "pointer",
                              }}
                            >
                              Move to admitted
                            </Heading>
                          </div>
                          <div>
                            <Heading
                              style={{
                                fontWeight: "500",
                                padding: "0.5rem 1rem",
                                color: "#EA4848",
                              }}
                              onClick={() => handleDelete()}
                            >
                              Delete
                            </Heading>
                          </div>
                        </Popover>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
};
