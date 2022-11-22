import axios from "axios";
import React, { useState } from "react";
import PatientsDetails from "../interfaces/sideBar";
import DrawerComponents from "../pages/drawer/drawer";
import PendingSideBar from "./sideBarComponents/PendingSideBar";
import ProceedToADmit from "./sideBarComponents/ProceedToAdmit";
import ScoreBarComponent from "./sideBarComponents/Score";
import SideBarComponent from "./sideBarComponents/SideBar";

const sideBar = {
  width: "38rem",
  padding: "1rem 0",
  backgroundColor: "#FAFAFA",
};

const patient = {
  id: 1,
  patient_code: "-",
  status: "active",
  treatment_name: "Test",
  createdAt: "2022-08-19 13:52:16",
  updatedAt: "2022-08-21 12:07:54",
  hospital_id: 1,
  user_id: 1,
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
};

const Show = () => {
  const [open, setOpen] = useState(false);
  const [patientDetails, setPatient] = useState(patient);

  const getData = async () => {
    setOpen(true);

    await axios
      .get(
        "https://fintech-backend-staging.easyaspataal.com/api/hospitals/1/patient/1",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNDY5MjAwfQ.PB5eCjYwhoPwO5jJyWd_5O1O_e6xaRZrdEkEt0L6YM4`,
          },
        }
      )
      .then((res) => {
        setPatient(res.data.patient);
      });
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleIsInsurance = () => {};
  const changeType = (type: any) => {};
  const isChanged = () => {};

  return (
    <>
      <button onClick={getData}>open</button>
      <DrawerComponents
        style={sideBar}
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* <SideBarComponent patient={patientDetails} closeDrawer={closeDrawer} /> */}
        {/* <ScoreBarComponent handleIsInsurance={handleIsInsurance} /> */}
        {/* <SideBarComponent
          patient={patientDetails}
          closeDrawer={closeDrawer}
          changeType={changeType}
          isChanged={isChanged}
        /> */}
        {/* <ProceedToADmit
          patient={patientDetails}
          closeDrawer={closeDrawer}
          changeType={changeType}
          isChanged={isChanged}
        /> */}
      </DrawerComponents>
    </>
  );
};

export default Show;
