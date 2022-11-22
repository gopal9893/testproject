import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import { style } from "../../styles/sidebar";
import clsx from "clsx";
import Heading from "../heading";
import ButtonComponent from "../button";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Props } from "./props/SideBar";
import { Checkbox, TextField } from "@material-ui/core";
import Progress from "../progres";
import AccordionComponents from "../Accordion";
import TableComponent from "../Table";
import axios from "../../config/axios";
import ScoreBarComponent from "./Score";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { error } from "console";
// import
const costProg = 71;

interface RoomCostItem {
  id: number;
  name: string;
  cost: number;
  status: boolean;
  quantity: number;
}
interface PatientRoomCostItems {
  id: number;
  item: string;
  price: number;
  quantity: number;
  total: number;
  paid: number;
  category: {
    id: number;
    name: string;
  };
}

const dummyInsurannce = {
  details: "-",
  sum_insured: 0,
  availability: false,
  applicability: false,
};

const dummyEaScore = {
  id: 0,
  total_estimated_cost: 0,
  ea_score: 0,
  ea_approved_amount: 0,
  createdAt: "2022-09-16 14:38:31",
  updatedAt: "2022-09-16 14:38:31",
  patient_id: 0,
};

const useStylesCheck = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 3,
    width: 20,
    height: 20,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#4D24CD",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

function StyledCheckbox(props: any) {
  const classCheck = useStylesCheck();

  return (
    <Checkbox
      className={classCheck.root}
      disableRipple
      color='default'
      checkedIcon={
        <span className={clsx(classCheck.icon, classCheck.checkedIcon)} />
      }
      icon={<span className={classCheck.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  );
}

const SideBarComponent = (props: Props) => {
  const [mediDesc, setMediDesc] = React.useState("");
  const [medicalDetails, setMedicalDetails] = React.useState([
    {
      title: "1. Medical condition",
      description: props.patient.user.userMedicalDetails?.medical_conditions,
      status: false,
    },
    {
      title: "2. Allergies",
      description: props.patient.user.userMedicalDetails?.allergies,
      status: false,
    },
  ]);
  const [changingSideContent, setChangingSideContent] =
    React.useState<number>(0);
  const token = localStorage.getItem("token");
  const HospitalID = localStorage.getItem("HospitalID");
  const [roomsItems, setRoomsItems] = React.useState<RoomCostItem[]>([]);
  const [patientRoomItems, setPatientRoomItems] = React.useState<
    PatientRoomCostItems[]
  >([]);
  const [totalGrandPayment, setTotalGrandPayment] = React.useState<any>(0);
  const [approxTreatmentCost, setApproxTreatmentCost] = React.useState("");
  const [depositAmount, setDepositAmount] = React.useState<number>();
  const [allSymptoms, setAllSymptoms] = React.useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [allAllergies, setAllAllergies] = React.useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [selectedAllergies, setSelectedAllergies] = React.useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [patientInsuranceDetails, setPatientInsuranceDetails] = React.useState<{
    sum_insured: number;
    applicability: boolean;
    details: string;
    availability: boolean;
  }>(dummyInsurannce);
  const [patientEaScoreDetails, setPatientEaScoreDetails] = React.useState<{
    id: number;
    total_estimated_cost: number;
    ea_score: number;
    ea_approved_amount: number;
    patient_id: number;
  }>(dummyEaScore);
  const [userToken, setUserToken] = React.useState("");
  const [isInsuaranceSubmited, setIsInsuaranceSubmited] = React.useState(false);
  const [isHasMedicalInsurance, setIsHasMedicalInsurance] =
    React.useState(true);
  const [isBnplTrue, setIsBnplTrue] = React.useState(true);
  const [showAllergies, setShowAllergies] = React.useState(false);
  const [showSymptoms, setShowSymptoms] = React.useState(false);
  const [showSurgeries, setShowSurgeries] = React.useState(false);
  const [isSurgeryHas, setIsSurgeryHas] = React.useState(false);
  const [surgeries, setSurgeries] = React.useState("");
  // const [oldAllergies, setOldAllergies] = React.useState([]);

  React.useEffect(() => {
    if (props.posiOfDocument === 1) {
      setChangingSideContent(1);
    }
    if (props.patient.insurances.length > 0) {
      (props.patient.insurances[props.patient.insurances.length - 1]
        .sum_insured !== 0 ||
        props.patient.insurances[props.patient.insurances.length - 1].co_pay !==
          0) &&
        setChangingSideContent(1);
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`/patient-allergies/${props.patient.id}`)
      .then((res) => {
        console.log("first", res);
        const getAllergies = res.data.patientAllergies.map((cur: any) => {
          return cur.allergy;
        });
        console.log("1", getAllergies);
        setSelectedAllergies(getAllergies);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    axios
      .get(`/patient-symptoms/${props.patient.id}/getAll`)
      .then((res) => {
        const getSymptoms = res.data.patientSymptoms.map((cur: any) => {
          return cur.symptom;
        });

        const ids = getSymptoms.map((o: any) => o.id);
        const filtered = getSymptoms.filter(
          ({ id }: any, index: number) => !ids.includes(id, index + 1)
        );
        setSelectedSymptoms(filtered);

        // setSelectedSymptoms(array);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    axios.get(`/user-surgeries/${props.patient.user_id}`).then((res) => {
      setSurgeries(res.data.patientSurgeries[0].surgery_name);
      res.data.patientSurgeries.length > 0 && setIsSurgeryHas(true);
    });

    axios
      .get("/symptoms")
      .then((res) => {
        setAllSymptoms(res.data);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    axios
      .get("/allergies")
      .then((res) => {
        setAllAllergies(res.data);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
  }, []);

  const costHeading = {
    color: patientEaScoreDetails.ea_score <= 70 ? "#EA4848" : "#3CC39A",
    fontSize: "1.6rem",
    fontWeight: "600",
  };

  const handleMedicalDetails = (index: number) => {
    const filtered = medicalDetails.filter((e, id) => {
      return id === index
        ? { ...e, status: (e.status = !e.status) }
        : { ...e, status: (e.status = false) };
    });
    setMedicalDetails(filtered);
  };

  const saveMediDesc = (index: number) => {
    const filteredData = medicalDetails.filter((e, id) => {
      return id === index
        ? {
            ...e,
            description: (e.description = mediDesc),
            status: (e.status = !e.status),
          }
        : e;
    });
    setMedicalDetails(filteredData);

    props.patient.user.userMedicalDetails?.id &&
      axios
        .patch(
          `/hospitals/${props.patient.id}/medicalDetails/${props.patient.user.userMedicalDetails?.id}`,
          {
            medicalConditions: filteredData[0].description,
            allergies: filteredData[1].description,
          }
        )
        .catch((err) => {
          // alert("Error " + err.message);
        });
  };

  const gotoDocs = () => {
    props.changeType("DocumentsDetails");
    props.handlePosiDocs(1);
  };

  const goToCostPage = () => {
    setChangingSideContent(changingSideContent + 1);
    axios
      .get("/rooms")
      .then((res) => {
        const tempRoomsItemsClone = res.data.map((cur: any) => {
          return { ...cur, quantity: 0 };
        });
        setRoomsItems(tempRoomsItemsClone);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });

    const newRoomsItems =
      props.patient.treatmentSkus &&
      props.patient.treatmentSkus.filter((item) => {
        return (
          item.category.name === "Room Cost" ||
          item.category.name === "Treatment Cost"
        );
      });
    newRoomsItems && setPatientRoomItems(newRoomsItems);

    const grandTotal =
      newRoomsItems &&
      newRoomsItems.reduce((a, c) => {
        return a + c.quantity * c.price;
      }, 0);

    setTotalGrandPayment(grandTotal && grandTotal);
  };

  const handleTreatmentsCost = async (e: any) => {
    // e.preventDefault();
    const value = e.target.value;
    setApproxTreatmentCost(value);

    const toBeDeleteItem = patientRoomItems.filter((cur: any) => {
      return cur.item === "Total treatment cost";
    });

    if (value === "") {
      toBeDeleteItem.forEach((cur: any) => {
        axios
          .delete("treatment_skus/" + cur.id)
          .then((res) => {
            // setPatientRoomItems(res.data.treatmentSkus);
            // const grandTotal = res.data.treatmentSkus.reduce(
            //   (a: any, c: any) => {
            //     return a + c.quantity * c.price;
            //   },
            //   0
            // );

            // setTotalGrandPayment(grandTotal && grandTotal);
            const newRoomsItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return (
                  item.category.name === "Room Cost" ||
                  item.category.name === "Treatment Cost"
                );
              });
            newRoomsItems && setPatientRoomItems(newRoomsItems);

            const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalGrandPayment(grandTotal && grandTotal);
          })
          .catch((err) => {
            // alert("Error " + err.message);
          });
      });
    } else if (value.length === 1) {
      toBeDeleteItem.forEach((cur: any) => {
        axios
          .delete("treatment_skus/" + cur.id)
          .then((res) => {
            // setPatientRoomItems(res.data.treatmentSkus);
            // const grandTotal = res.data.treatmentSkus.reduce(
            //   (a: any, c: any) => {
            //     return a + c.quantity * c.price;
            //   },
            //   0
            // );

            // setTotalGrandPayment(grandTotal && grandTotal);
            const newRoomsItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return (
                  item.category.name === "Room Cost" ||
                  item.category.name === "Treatment Cost"
                );
              });
            newRoomsItems && setPatientRoomItems(newRoomsItems);

            const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalGrandPayment(grandTotal && grandTotal);
          })
          .catch((err) => {
            // alert("Error " + err.message);
          });
      });

      await axios
        .post("/treatment_skus", {
          patientId: props.patient.id,
          categoryId: 1,
          item: "Total treatment cost",
          price: value,
          quantity: 1,
        })
        .then((res) => {
          // setPatientRoomItems(res.data.treatmentSkus);
          // const grandTotal = res.data.treatmentSkus.reduce((a: any, c: any) => {
          //   return a + c.quantity * c.price;
          // }, 0);

          // setTotalGrandPayment(grandTotal && grandTotal);
          const newRoomsItems =
            res.data.treatmentSkus &&
            res.data.treatmentSkus.filter((item: any) => {
              return (
                item.category.name === "Room Cost" ||
                item.category.name === "Treatment Cost"
              );
            });
          newRoomsItems && setPatientRoomItems(newRoomsItems);

          const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
            return a + c.quantity * c.price;
          }, 0);

          setTotalGrandPayment(grandTotal && grandTotal);
        })
        .catch((err) => {
          // alert("Error " + err.message);
        });
    } else if (value.length > 1 && value !== "") {
      const getTreatmentCostItem = patientRoomItems.find(
        (p) => p.item === "Total treatment cost"
      );

      const getTreatmentCostId =
        getTreatmentCostItem && getTreatmentCostItem.id;

      await axios
        .patch(`/treatment_skus/${getTreatmentCostId}`, {
          patientId: props.patient.id,
          categoryId: 1,
          item: "Total treatment cost",
          price: value,
          quantity: 1,
        })
        .then((res) => {
          // setPatientRoomItems(res.data.treatmentSkus);
          // const grandTotal = res.data.treatmentSkus.reduce((a: any, c: any) => {
          //   return a + c.quantity * c.price;
          // }, 0);

          // setTotalGrandPayment(grandTotal && grandTotal);
          const newRoomsItems =
            res.data.treatmentSkus &&
            res.data.treatmentSkus.filter((item: any) => {
              return (
                item.category.name === "Room Cost" ||
                item.category.name === "Treatment Cost"
              );
            });
          newRoomsItems && setPatientRoomItems(newRoomsItems);

          const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
            return a + c.quantity * c.price;
          }, 0);

          setTotalGrandPayment(grandTotal && grandTotal);
        })
        .catch((err) => {
          // alert("Error " + err.message);
        });
    }
  };

  const addRoomQty = (item: any, value: number) => {
    if (item.quantity === 0) {
      const roomsItemsClone = roomsItems.filter((cur: any) => {
        return cur.id === item.id
          ? { ...cur, quantity: (cur.quantity = 1) }
          : cur;
      });
      setRoomsItems(roomsItemsClone);
      axios
        .post("/treatment_skus", {
          patientId: props.patient.id,
          categoryId: 2,
          item: item.name,
          price: item.cost,
          quantity: 1,
        })
        .then((res) => {
          const newRoomsItems =
            res.data.treatmentSkus &&
            res.data.treatmentSkus.filter((item: any) => {
              return (
                item.category.name === "Room Cost" ||
                item.category.name === "Treatment Cost"
              );
            });
          newRoomsItems && setPatientRoomItems(newRoomsItems);

          const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
            return a + c.quantity * c.price;
          }, 0);

          setTotalGrandPayment(grandTotal && grandTotal);
        })
        .catch((err) => {
          // alert("Error " + err.message);
        });
    } else {
      const roomsItemsClone = roomsItems.filter((cur: any) => {
        return cur.id === item.id
          ? { ...cur, quantity: (cur.quantity = item.quantity + value) }
          : cur;
      });

      const getItemsId = patientRoomItems.find((cur: any) => {
        return cur.item === item.name;
      });

      setRoomsItems(roomsItemsClone);
      axios
        .patch(`/treatment_skus/${getItemsId && getItemsId.id}`, {
          patientId: props.patient.id,
          categoryId: 2,
          item: item.name,
          price: item.cost,
          quantity: item.quantity,
        })
        .then((res) => {
          const newRoomsItems =
            res.data.treatmentSkus &&
            res.data.treatmentSkus.filter((item: any) => {
              return (
                item.category.name === "Room Cost" ||
                item.category.name === "Treatment Cost"
              );
            });
          newRoomsItems && setPatientRoomItems(newRoomsItems);
          const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
            return a + c.quantity * c.price;
          }, 0);

          setTotalGrandPayment(grandTotal && grandTotal);
        })
        .catch((err) => {
          // alert("Error " + err.message);
        });
    }
  };

  const deleteTretmentSkus = async (id: number, item: string) => {
    const res = await axios.delete("treatment_skus/" + id);

    const newRoomsItems =
      res.data.treatmentSkus &&
      res.data.treatmentSkus.filter((item: any) => {
        return (
          item.category.name === "Room Cost" ||
          item.category.name === "Treatment Cost"
        );
      });
    newRoomsItems && setPatientRoomItems(newRoomsItems);

    const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
      return a + c.quantity * c.price;
    }, 0);

    setTotalGrandPayment(grandTotal && grandTotal);

    const getItemsId = res.data.treatmentSkus.find((cur: any) => {
      return cur.id === id;
    });

    !getItemsId && setApproxTreatmentCost("");

    const roomsItemsClone = roomsItems.filter((cur: any) => {
      return cur.name === item ? { ...cur, quantity: (cur.quantity = 0) } : cur;
    });
    setRoomsItems(roomsItemsClone);

    // const roomsItemsClone = roomsItems.filter((cur: any) => {
    //   return cur.name === tempItemsName
    //     ? { ...cur, quantity: (cur.quantity = 0) }
    //     : cur;
    // });
    // setRoomsItems(roomsItemsClone);
    // .then((res) => {
    //   const newRoomsItems = res.data.treatmentSkus.filter((item: any) => {
    //     return item.category.name === "Room Cost";
    //   });
    //   setPatientRoomItems(newRoomsItems);
    // });
  };

  const sharePaymentLink = async () => {
    await axios.post(
      `/hospitals/${HospitalID}/${props.patient.id}/change-bnpl`,
      {
        isBnpl: isBnplTrue,
      }
    );
    const SaveAdmissionDet = await axios.post("/treatment_skus", {
      patientId: sessionStorage.getItem("PatientID"),
      categoryId: 5,
      item: "initial_deposit",
      price: depositAmount,
      quantity: 1,
    });
    // const res = await axios.post(
    //   `/hospitals/${HospitalID}/${sessionStorage.getItem(
    //     "PatientID"
    //   )}/payment-link/razorpay`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    const res = await axios.post(`/${props.patient.id}/sendpaymentlink`, {
      name: props.patient.user.full_name,
      hospitalName: props.patient.hospital.name,
      amount: depositAmount,
      number: props.patient.user.userPhoneNumber.phone_number,
    });
    await axios.post(
      `/hospitals/${HospitalID}/${props.patient.id}/change-status`,
      {
        updatedStatus: "payment_of_admission_pending",
      }
    );
    props.closeDrawer();
    props.isChanged();
  };

  // // const getSelectedSurgeries = async () => {
  // //   const res = await axios.get(`/user-surgeries`, {
  // //     headers: {
  // //       authorization: `Bearer ${userToken}`,
  // //     },
  // //   });

  // //   const surgeryList = res.data.userSurgeries;

  // //   surgeryList.forEach((item: any) => {
  // //     axios.delete(`/user-surgeries/${item.id}`, {
  // //       headers: {
  // //         authorization: `Bearer ${userToken}`,
  // //       },
  // //     });
  // //   });

  // //   const getAllIds = selectedSurgeries.map((cur: any) => {
  // //     return cur.id;
  // //   });

  // //   axios
  // //     .post(
  // //       `/user-surgeries`,
  // //       {
  // //         surgeryIds: getAllIds,
  // //       },
  // //       {
  // //         headers: {
  // //           authorization: `Bearer ${userToken}`,
  // //         },
  // //       }
  // //     )
  // //     .catch((err) => {
  // //       // alert("Error " + err.message);
  // //     });
  // //   setShowSurgeries(false);
  // };

  const getSelectedSurgeries = async () => {
    if (isSurgeryHas) {
      await axios.patch(`/user-surgeries/${props.patient.user_id}`, {
        name: surgeries,
      });
    } else {
      await axios.post(`/user-surgeries/${props.patient.user_id}`, {
        name: surgeries,
      });
    }
    setShowSurgeries(false);
  };

  const getSelectedSymptoms = async () => {
    const res = await axios.get(`/patient-symptoms/${props.patient.id}/getAll`);

    const allSymptopms = res.data.patientSymptoms;

    allSymptopms.forEach((cur: any) => {
      axios.delete(`/patient-symptoms/${cur.id}`).catch((err) => {
        // alert("Error " + err.message);
      });
    });

    const getAllIds = selectedSymptoms.map((cur: any) => {
      return cur.id;
    });

    axios
      .post(`/patient-symptoms/${props.patient.id}/create`, {
        symptomIds: getAllIds,
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    setShowSymptoms(false);
  };

  const getSelectedAllergies = async () => {
    const res = await axios.get(`/patient-allergies/${props.patient.id}`);

    console.log("744", res);

    const allAllergies = res.data;

    console.log("748", allAllergies);
    if (allAllergies.length > 0) {
      allAllergies.forEach((cur: any) => {
        axios.delete(`/patient-allergies/${cur.id}`).catch((err) => {
          // alert("Error " + err.message);
        });
      });
    }

    const getAllIds = selectedAllergies.map((cur: any) => {
      return cur.id;
    });

    console.log("759", getAllIds);

    const response = await axios
      .post(`/patient-allergies/${props.patient.id}`, {
        allergyIds: getAllIds,
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    console.log("768", response);
    setShowAllergies(false);
  };

  const generateEaScore = async () => {
    const res = await axios.post(
      `/hospitals/${props.patient.id}/create-ea-score`
    );
    console.log(res);
    res.data.patient.eaScores.length > 0 &&
      setPatientEaScoreDetails(
        res.data.patient.eaScores[res.data.patient.eaScores.length - 1]
      );
    res.data.patient.insurances.length > 0 &&
      setPatientInsuranceDetails(
        res.data.patient.insurances[res.data.patient.insurances.length - 1]
      );
    const getDepositAmount = res.data.patient.treatmentSkus.filter(
      (cur: any) => {
        return cur.category.name === "Deposit";
      }
    );

    if (getDepositAmount.length > 0) {
      const totalDepositAmount = getDepositAmount.reduce((a: any, c: any) => {
        return a + c.total;
      }, 0);
      setDepositAmount(totalDepositAmount);
    }
    setChangingSideContent(changingSideContent + 1);
  };

  const handleIsInsurance = (value: boolean) => {
    setIsInsuaranceSubmited(value);
  };

  const goBack = () => {
    if (changingSideContent !== 0) {
      setChangingSideContent(changingSideContent - 1);
    }
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
          <KeyboardBackspaceIcon style={style.iconContainer} onClick={goBack} />
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

      {changingSideContent === 1 ? (
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
                        : patientInsuranceDetails.details}
                    </Heading>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div style={{ ...style.cardContainer, marginBottom: "5rem" }}>
            <div>
              <Heading style={style.heading}>Medical details</Heading>
              <br />
              <Card style={style.card}>
                <CardContent>
                  <div>
                    <div style={style.insideContainer}>
                      <Heading style={style.labelData}>1. Allergies</Heading>
                      <div onClick={() => setShowAllergies(!showAllergies)}>
                        {showAllergies ? (
                          <Heading style={style.linkCancel}>cancel</Heading>
                        ) : (
                          <Heading style={style.linkHeading}>edit</Heading>
                        )}
                      </div>
                    </div>
                    <div>
                      <br />
                      <Autocomplete
                        multiple
                        id='tags-outlined'
                        options={allAllergies}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        value={selectedAllergies}
                        onChange={(e, v) => {
                          setSelectedAllergies(v);
                        }}
                        disabled={!showAllergies}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={style.textContainer}
                            placeholder='mention'
                            variant='outlined'
                          />
                        )}
                      />
                    </div>
                    {showAllergies && (
                      <>
                        <div
                          style={style.saveButtonDiv}
                          onClick={getSelectedAllergies}
                        >
                          <ButtonComponent
                            style={style.saveButton}
                            buttontext='Save'
                          />
                        </div>
                      </>
                    )}
                    <div style={style.lineDiv}></div>
                  </div>
                  <div>
                    <div style={style.insideContainer}>
                      <Heading style={style.labelData}>2. Symptoms</Heading>
                      <div onClick={() => setShowSymptoms(!showSymptoms)}>
                        {showSymptoms ? (
                          <Heading style={style.linkCancel}>cancel</Heading>
                        ) : (
                          <Heading style={style.linkHeading}>edit</Heading>
                        )}
                      </div>
                    </div>
                    <div>
                      <br />
                      <Autocomplete
                        multiple
                        id='tags-outlined'
                        options={allSymptoms}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        value={selectedSymptoms}
                        onChange={(e, v) => {
                          setSelectedSymptoms(v);
                        }}
                        disabled={!showSymptoms}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={style.textContainer}
                            placeholder='mention'
                            variant='outlined'
                          />
                        )}
                      />
                    </div>
                    {showSymptoms && (
                      <>
                        <div
                          style={style.saveButtonDiv}
                          onClick={getSelectedSymptoms}
                        >
                          <ButtonComponent
                            style={style.saveButton}
                            buttontext='Save'
                          />
                        </div>
                      </>
                    )}
                    <div style={style.lineDiv}></div>
                  </div>
                  <div>
                    <div style={style.insideContainer}>
                      <Heading style={style.labelData}>3. Surgeries</Heading>
                      <div onClick={() => setShowSurgeries(!showSurgeries)}>
                        {showSurgeries ? (
                          <Heading style={style.linkCancel}>cancel</Heading>
                        ) : (
                          <Heading style={style.linkHeading}>edit</Heading>
                        )}
                      </div>
                    </div>
                    <div>
                      <br />
                      {/* <Autocomplete
                        multiple
                        id='tags-outlined'
                        options={allSurgeries}
                        getOptionLabel={(option) => option.name}
                        filterSelectedOptions
                        value={selectedSurgeries}
                        onChange={(e, v) => {
                          setSelectedSurgeries(v);
                        }}
                      renderInput={(params) => ( */}
                      <TextField
                        disabled={!showSurgeries}
                        onChange={(e) => setSurgeries(e.target.value)}
                        value={surgeries}
                        style={style.textContainer}
                        placeholder='mention'
                        variant='outlined'
                      />
                      {/* )} */}
                      {/* /> */}
                    </div>
                    {showSurgeries && (
                      <>
                        <div
                          style={style.saveButtonDiv}
                          // onClick={() => setShowSurgeries(false)}
                          onClick={getSelectedSurgeries}
                        >
                          <ButtonComponent
                            style={style.saveButton}
                            buttontext='Save'
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : changingSideContent === 2 ? (
        <div style={style.mainContainer}>
          <div style={style.cardContainer}>
            <div>
              <div style={style.seprateContainer}>
                <Heading style={style.heading}>
                  Total treatment cost (approx.)
                </Heading>
                <br />
                {/* <form onSubmit={handleTreatmentsCost}> */}
                <TextField
                  style={style.inputContainer}
                  type='number'
                  placeholder='mention'
                  variant='outlined'
                  value={approxTreatmentCost}
                  onChange={handleTreatmentsCost}
                />
                {/* </form> */}
              </div>
              <br />
              <div style={style.seprateContainer}>
                <Heading style={style.heading}>Room Cost</Heading>
                <br />
                <AccordionComponents
                  style={style.accordionDiv}
                  titleStyle={style.labelHead}
                  title='room'
                >
                  <>
                    {roomsItems.map((item: any) => {
                      return (
                        <div style={style.insideContainer}>
                          <Heading style={style.labelHead}>{item.name}</Heading>
                          <Heading style={style.labelData}>
                            ₹
                            {item.cost
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            /night
                          </Heading>
                          {item.quantity === 0 ? (
                            <Heading
                              style={style.linkHeading}
                              onClick={() => addRoomQty(item, 1)}
                            >
                              add
                            </Heading>
                          ) : (
                            <div style={style.countDiv}>
                              <div
                                style={style.countButton}
                                onClick={() => {
                                  item.quantity > 1 && addRoomQty(item, -1);
                                }}
                              >
                                -
                              </div>
                              <div style={style.countButton}>
                                {item.quantity}
                              </div>
                              <div
                                style={style.countButton}
                                onClick={() => addRoomQty(item, +1)}
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
          {patientRoomItems.length > 0 && (
            <div style={style.tableContainer}>
              <div>
                <TableComponent
                  style={style.tableDiv}
                  headCell={["Item", "Qty.", "Cost (₹)", ""]}
                  bodyCell={patientRoomItems}
                  deleteTretmentSkus={deleteTretmentSkus}
                ></TableComponent>
              </div>
            </div>
          )}
        </div>
      ) : changingSideContent === 0 ? (
        <ScoreBarComponent
          handleIsInsurance={handleIsInsurance}
          setIsHasMedicalInsurance={setIsHasMedicalInsurance}
          isHasMedicalInsurance={isHasMedicalInsurance}
          setPatientInsuranceDetails={setPatientInsuranceDetails}
        />
      ) : (
        <div style={style.mainContainer}>
          <div style={style.cardContainer}>
            <div>
              <div style={style.insideContainer}>
                <Heading style={style.heading}>Patient details</Heading>
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
                      {patientInsuranceDetails.details}
                    </Heading>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div style={style.cardContainer}>
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
                      <Progress progress={patientEaScoreDetails.ea_score} />
                      100
                    </div>
                    <div>
                      <Heading style={costHeading}>
                        {patientEaScoreDetails.ea_score > 70
                          ? `₹ ${patientEaScoreDetails.ea_approved_amount
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
                      {patientInsuranceDetails.availability ? "Yes" : "No"}
                    </Heading>
                  </div>
                  <div style={style.insideContainer}>
                    <Heading style={style.labelHead}>Policy name</Heading>
                    <Heading style={style.labelHead}>
                      {patientInsuranceDetails.details}
                    </Heading>
                  </div>
                  <div style={style.insideContainer}>
                    <Heading style={style.labelHead}>
                      Insurance applicability
                    </Heading>
                    <Heading style={style.labelHead}>
                      {patientInsuranceDetails.applicability ? "Yes" : "No"}
                    </Heading>
                  </div>
                  <div style={style.insideContainer}>
                    <Heading style={style.labelHead}>
                      Insurance coverage
                    </Heading>
                    <Heading style={style.labelHead}>
                      {patientInsuranceDetails.sum_insured !== 0
                        ? `₹ ${patientInsuranceDetails.sum_insured
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                        : "--"}
                    </Heading>
                  </div>
                  <div style={style.insideContainer}>
                    <Heading style={style.labelHead}>
                      Total expenses estimate
                    </Heading>
                    <Heading style={style.labelData}>
                      ₹{" "}
                      {patientEaScoreDetails.total_estimated_cost
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
                      {(
                        patientEaScoreDetails.total_estimated_cost -
                        patientInsuranceDetails.sum_insured
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Heading>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div style={{ ...style.cardContainer, marginBottom: "5rem" }}>
            <div>
              <div style={style.seprateContainer}>
                <Heading style={style.heading}>
                  Initial deposit to be collected
                </Heading>
                <br />
                {/* <form onSubmit={handleTreatmentsCost}> */}
                <TextField
                  style={style.inputContainer}
                  type='number'
                  placeholder='Enter amount or percentage'
                  variant='outlined'
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(+e.target.value)}
                />
                {/* </form> */}
              </div>
              {patientEaScoreDetails.ea_score > 70 && (
                <>
                  <br />
                  <br />
                  <div style={style.insideContainer}>
                    <Heading style={style.heading}>
                      Allow ‘Buy now pay later’
                    </Heading>
                    <StyledCheckbox
                      checked={isBnplTrue}
                      onClick={() => setIsBnplTrue(!isBnplTrue)}
                    />
                  </div>
                  <div style={style.insideContainer}>
                    <Heading style={style.labelHead}>
                      Patient can make the payment to hospital <br /> once he
                      receives claim reimbursement <br /> from insurance company
                    </Heading>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {changingSideContent === 1 ? (
        <div style={style.downDiv}>
          <ButtonComponent
            style={style.buttonDown}
            buttontext='Generate initial estimate'
            onClick={goToCostPage}
          />
        </div>
      ) : changingSideContent === 2 ? (
        <div style={style.totalDiv}>
          <Heading style={style.labelHeading}>
            Grand total: ₹{" "}
            {totalGrandPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Heading>
          <ButtonComponent
            style={style.priceButton}
            buttontext='Generate EA Score'
            onClick={generateEaScore}
          />
        </div>
      ) : changingSideContent === 0 ? (
        <div style={style.downDiv}>
          <ButtonComponent
            style={{
              ...style.buttonDown,
              backgroundColor: !isInsuaranceSubmited ? "#D9D9D9" : "#4D24CD",
              padding: "0 6rem",
            }}
            buttontext='Next'
            disabled={!isInsuaranceSubmited}
            onClick={() => setChangingSideContent(changingSideContent + 1)}
          />
        </div>
      ) : (
        <div style={style.totalDiv}>
          <Heading style={style.labelHeading}>
            Net total: ₹{" "}
            {totalGrandPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Heading>
          <ButtonComponent
            style={{
              ...style.priceButton,
              backgroundColor:
                depositAmount === 0 || !depositAmount ? "#D9D9D9" : "#4D24CD",
            }}
            buttontext='Share Payment Link'
            disabled={depositAmount === 0}
            onClick={sharePaymentLink}
          />
        </div>
      )}
    </div>
  );
};

export default SideBarComponent;
