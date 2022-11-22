import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { style } from "../../styles/initateDischarge";
import Heading from "../heading";
import ButtonComponent from "../button";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Props } from "./props/InitateDischarge";
import axios from "../../config/axios";
import TreatmentSkus from "./TreatmentSkus";
import TreatmentCategory from "./TreatmentCategory";
import Axios from "axios";

interface CostItem {
  id: number;
  name: string;
  cost: number;
  status: boolean;
  quantity: number;
}
interface PatientCostItems {
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
const steps = [
  "Medicine",
  "Room Details",
  "consultation",
  "Oxygen",
  "Bloodwork",
];

const tempMedicineItems = [
  {
    id: 1,
    name: "XYZ Medicine 1",
    cost: 5000,
    status: false,
    quantity: 0,
  },
  {
    id: 2,
    name: "XYZ Medicine 2",
    cost: 6000,
    status: false,
    quantity: 0,
  },
  {
    id: 3,
    name: "XYZ Medicine 3",
    cost: 7000,
    status: false,
    quantity: 0,
  },
  {
    id: 4,
    name: "XYZ Medicine 4",
    cost: 8000,
    status: false,
    quantity: 0,
  },
];

const tempConsultantItems = [
  {
    id: 1,
    name: "XYZ Consultant 1",
    cost: 5000,
    status: false,
    quantity: 0,
  },
  {
    id: 2,
    name: "XYZ Consultant 2",
    cost: 6000,
    status: false,
    quantity: 0,
  },
  {
    id: 3,
    name: "XYZ Consultant 3",
    cost: 7000,
    status: false,
    quantity: 0,
  },
  {
    id: 4,
    name: "XYZ Consultant 4",
    cost: 8000,
    status: false,
    quantity: 0,
  },
];

const tempOxygenItems = [
  {
    id: 1,
    name: "XYZ Oxygen 1",
    cost: 5000,
    status: false,
    quantity: 0,
  },
  {
    id: 2,
    name: "XYZ Oxygen 2",
    cost: 6000,
    status: false,
    quantity: 0,
  },
  {
    id: 3,
    name: "XYZ Oxygen 3",
    cost: 7000,
    status: false,
    quantity: 0,
  },
  {
    id: 4,
    name: "XYZ Oxygen 4",
    cost: 8000,
    status: false,
    quantity: 0,
  },
];

const tempBloodWorkItems = [
  {
    id: 1,
    name: "XYZ BloodWork 1",
    cost: 5000,
    status: false,
    quantity: 0,
  },
  {
    id: 2,
    name: "XYZ BloodWork 2",
    cost: 6000,
    status: false,
    quantity: 0,
  },
  {
    id: 3,
    name: "XYZ BloodWork 3",
    cost: 7000,
    status: false,
    quantity: 0,
  },
  {
    id: 4,
    name: "XYZ BloodWork 4",
    cost: 8000,
    status: false,
    quantity: 0,
  },
];

const InitiateDischarge = (props: Props) => {
  const [changingSideContent, setChangingSideContent] =
    React.useState<number>(0);
  const [medicineItems, setMedicineItems] =
    React.useState<CostItem[]>(tempMedicineItems);
  const [patientMedicineItems, setPatientMedicineItems] = React.useState<
    PatientCostItems[]
  >([]);
  const [roomsItems, setRoomsItems] = React.useState<CostItem[]>([]);
  const [patientRoomItems, setPatientRoomItems] = React.useState<
    PatientCostItems[]
  >([]);
  const [consultantItems, setConsultantItems] =
    React.useState<CostItem[]>(tempConsultantItems);
  const [patientConsultantItems, setPatientConsultantItems] = React.useState<
    PatientCostItems[]
  >([]);
  const [oxygenItems, setOxygenItems] =
    React.useState<CostItem[]>(tempOxygenItems);
  const [patientOxygenItems, setPatientOxygenItems] = React.useState<
    PatientCostItems[]
  >([]);
  const [bloodWorkItems, setBloodWorkItems] =
    React.useState<CostItem[]>(tempBloodWorkItems);
  const [patientBloodWorkItems, setPatientBloodWorkItems] = React.useState<
    PatientCostItems[]
  >([]);
  const [totalRoomCostPayment, setTotalRoomCostPayment] =
    React.useState<any>(0);
  const [totalMedicineCostPayment, setTotalMedicineCostPayment] =
    React.useState<any>(0);
  const [totalConsultantCostPayment, setTotalConsultantCostPayment] =
    React.useState<any>(0);
  const [totalOxygenCostPayment, setTotalOxygenCostPayment] =
    React.useState<any>(0);
  const [totalBloodWorkCostPayment, setTotalBloodWorkCostPayment] =
    React.useState<any>(0);
  const [depositAmount, setDepositAmount] = React.useState(0);
  const [otherAmount, setOtherAmount] = React.useState(0);
  const HospitalID = localStorage.getItem("HospitalID");
  const PatientID = sessionStorage.getItem("PatientID");
  const token = localStorage.getItem("token");

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

  const gotoDocs: any = () => {
    props.changeType("DocumentsDetails");
    props.handlePosiDocs(4);
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
    axios
      .get("/bloodwork")
      .then((res) => {
        const tempBloodWorksItemsClone = res.data.map((cur: any) => {
          return { ...cur, quantity: 0 };
        });
        setBloodWorkItems(tempBloodWorksItemsClone);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    axios
      .get("/consultant")
      .then((res) => {
        const tempConsultantItemsClone = res.data.map((cur: any) => {
          return { ...cur, quantity: 0 };
        });
        setConsultantItems(tempConsultantItemsClone);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    axios
      .get("/medicines")
      .then((res) => {
        const tempMedicinesItemsClone = res.data.map((cur: any) => {
          return { ...cur, quantity: 0 };
        });
        setMedicineItems(tempMedicinesItemsClone);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });
    axios
      .get("/oxygen")
      .then((res) => {
        const tempOxygenItemsClone = res.data.map((cur: any) => {
          return { ...cur, quantity: 0 };
        });
        setOxygenItems(tempOxygenItemsClone);
      })
      .catch((err) => {
        // alert("Error " + err.message);
      });

    const newRoomsItems =
      props.patient.treatmentSkus &&
      props.patient.treatmentSkus.filter((item) => {
        return item.category.name === "Room Cost";
      });
    newRoomsItems && setPatientRoomItems(newRoomsItems);

    const newMedicineItems =
      props.patient.treatmentSkus &&
      props.patient.treatmentSkus.filter((item) => {
        return item.category.name === "Medicine Cost";
      });
    newMedicineItems && setPatientMedicineItems(newMedicineItems);

    const newConsultantItems =
      props.patient.treatmentSkus &&
      props.patient.treatmentSkus.filter((item) => {
        return item.category.name === "Consultant Cost";
      });
    newConsultantItems && setPatientConsultantItems(newConsultantItems);

    const newOxygenItems =
      props.patient.treatmentSkus &&
      props.patient.treatmentSkus.filter((item) => {
        return item.category.name === "Oxygen Cost";
      });
    newOxygenItems && setPatientOxygenItems(newOxygenItems);

    const newBloodWorkItems =
      props.patient.treatmentSkus &&
      props.patient.treatmentSkus.filter((item) => {
        return item.category.name === "Blood Work Cost";
      });
    newBloodWorkItems && setPatientBloodWorkItems(newBloodWorkItems);

    const grandConTotal =
      newConsultantItems &&
      newConsultantItems.reduce((a, c) => {
        return a + c.quantity * c.price;
      }, 0);

    setTotalConsultantCostPayment(grandConTotal && grandConTotal);

    const grandMediTotal =
      newMedicineItems &&
      newMedicineItems.reduce((a, c) => {
        return a + c.quantity * c.price;
      }, 0);

    setTotalMedicineCostPayment(grandMediTotal && grandMediTotal);

    const grandTotal =
      newRoomsItems &&
      newRoomsItems.reduce((a, c) => {
        return a + c.quantity * c.price;
      }, 0);

    setTotalRoomCostPayment(grandTotal && grandTotal);

    const grandOxyTotal =
      newOxygenItems &&
      newOxygenItems.reduce((a, c) => {
        return a + c.quantity * c.price;
      }, 0);

    setTotalOxygenCostPayment(grandOxyTotal && grandOxyTotal);

    const grandBloodTotal =
      newBloodWorkItems &&
      newBloodWorkItems.reduce((a, c) => {
        return a + c.quantity * c.price;
      }, 0);

    setTotalBloodWorkCostPayment(grandBloodTotal && grandBloodTotal);
  };

  const addRoomQty = (item: any, value: number) => {
    if (item.quantity === 0) {
      if (changingSideContent === 1) {
        const medicineItemsClone = medicineItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = 1) }
            : cur;
        });
        setMedicineItems(medicineItemsClone);
      } else if (changingSideContent === 2) {
        const roomsItemsClone = roomsItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = 1) }
            : cur;
        });
        setRoomsItems(roomsItemsClone);
      } else if (changingSideContent === 3) {
        const consultantItemsClone = consultantItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = 1) }
            : cur;
        });
        setConsultantItems(consultantItemsClone);
      } else if (changingSideContent === 4) {
        const oxygenItemsClone = oxygenItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = 1) }
            : cur;
        });
        setOxygenItems(oxygenItemsClone);
      } else if (changingSideContent === 5) {
        const bloodWorkItemsClone = bloodWorkItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = 1) }
            : cur;
        });
        setBloodWorkItems(bloodWorkItemsClone);
      }

      axios
        .post("/treatment_skus", {
          patientId: props.patient.id,
          categoryId:
            changingSideContent === 1
              ? 3
              : changingSideContent === 2
              ? 2
              : changingSideContent === 3
              ? 6
              : changingSideContent === 4
              ? 7
              : 8,
          item: item.name,
          price: item.cost,
          quantity: 1,
        })
        .then((res) => {
          if (changingSideContent === 1) {
            const newMedicineItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Medicine Cost";
              });
            newMedicineItems && setPatientMedicineItems(newMedicineItems);

            const grandTotal = newMedicineItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalMedicineCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 2) {
            const newRoomsItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Room Cost";
              });
            newRoomsItems && setPatientRoomItems(newRoomsItems);

            const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalRoomCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 3) {
            const newConsultantItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Consultant Cost";
              });
            newConsultantItems && setPatientConsultantItems(newConsultantItems);

            const grandTotal = newConsultantItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalConsultantCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 4) {
            const newOxygenItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Oxygen Cost";
              });
            newOxygenItems && setPatientOxygenItems(newOxygenItems);

            const grandTotal = newOxygenItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalOxygenCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 5) {
            const newBloodWorkItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Blood Work Cost";
              });
            newBloodWorkItems && setPatientBloodWorkItems(newBloodWorkItems);

            const grandTotal = newBloodWorkItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalBloodWorkCostPayment(grandTotal && grandTotal);
          }
        })
        .catch((err) => {
          // alert("Error " + err.message);
        });
    } else {
      let getItemsId;
      if (changingSideContent === 1) {
        const medicineItemsClone = medicineItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = item.quantity + value) }
            : cur;
        });
        setMedicineItems(medicineItemsClone);

        getItemsId = patientMedicineItems.find((cur: any) => {
          return cur.item === item.name;
        });
      } else if (changingSideContent === 2) {
        const roomsItemsClone = roomsItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = item.quantity + value) }
            : cur;
        });
        setRoomsItems(roomsItemsClone);

        getItemsId = patientRoomItems.find((cur: any) => {
          return cur.item === item.name;
        });
      } else if (changingSideContent === 3) {
        const consultantItemsClone = consultantItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = item.quantity + value) }
            : cur;
        });
        setConsultantItems(consultantItemsClone);

        getItemsId = patientConsultantItems.find((cur: any) => {
          return cur.item === item.name;
        });
      } else if (changingSideContent === 4) {
        const oxygenItemsClone = oxygenItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = item.quantity + value) }
            : cur;
        });
        setOxygenItems(oxygenItemsClone);

        getItemsId = patientOxygenItems.find((cur: any) => {
          return cur.item === item.name;
        });
      } else if (changingSideContent === 5) {
        const bloodWorkItemsClone = bloodWorkItems.filter((cur: any) => {
          return cur.id === item.id
            ? { ...cur, quantity: (cur.quantity = item.quantity + value) }
            : cur;
        });
        setBloodWorkItems(bloodWorkItemsClone);

        getItemsId = patientBloodWorkItems.find((cur: any) => {
          return cur.item === item.name;
        });
      }

      axios
        .patch(`/treatment_skus/${getItemsId && getItemsId.id}`, {
          patientId: props.patient.id,
          categoryId:
            changingSideContent === 1
              ? 3
              : changingSideContent === 2
              ? 2
              : changingSideContent === 3
              ? 6
              : changingSideContent === 4
              ? 7
              : 8,
          item: item.name,
          price: item.cost,
          quantity: item.quantity,
        })
        .then((res) => {
          if (changingSideContent === 1) {
            const newMedicineItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Medicine Cost";
              });
            newMedicineItems && setPatientMedicineItems(newMedicineItems);

            const grandTotal = newMedicineItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalMedicineCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 2) {
            const newRoomsItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Room Cost";
              });
            newRoomsItems && setPatientRoomItems(newRoomsItems);

            const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalRoomCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 3) {
            const newConsultantItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Consultant Cost";
              });
            newConsultantItems && setPatientConsultantItems(newConsultantItems);

            const grandTotal = newConsultantItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalConsultantCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 4) {
            const newOxygenItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Oxygen Cost";
              });
            newOxygenItems && setPatientOxygenItems(newOxygenItems);

            const grandTotal = newOxygenItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalOxygenCostPayment(grandTotal && grandTotal);
          } else if (changingSideContent === 5) {
            const newBloodWorkItems =
              res.data.treatmentSkus &&
              res.data.treatmentSkus.filter((item: any) => {
                return item.category.name === "Blood Work Cost";
              });
            newBloodWorkItems && setPatientBloodWorkItems(newBloodWorkItems);

            const grandTotal = newBloodWorkItems.reduce((a: any, c: any) => {
              return a + c.quantity * c.price;
            }, 0);

            setTotalBloodWorkCostPayment(grandTotal && grandTotal);
          }
        })
        .catch((err) => {
          // alert("Error " + err.message);
        });
    }
  };

  const deleteTretmentSkus = async (id: number, item: string) => {
    const res = await axios.delete("treatment_skus/" + id);

    if (changingSideContent === 1) {
      const newMedicineItems =
        res.data.treatmentSkus &&
        res.data.treatmentSkus.filter((item: any) => {
          return item.category.name === "Medicine Cost";
        });
      newMedicineItems && setPatientMedicineItems(newMedicineItems);

      const grandTotal = newMedicineItems.reduce((a: any, c: any) => {
        return a + c.quantity * c.price;
      }, 0);

      setTotalMedicineCostPayment(grandTotal && grandTotal);

      const medicineItemsClone = medicineItems.filter((cur: any) => {
        return cur.name === item
          ? { ...cur, quantity: (cur.quantity = 0) }
          : cur;
      });
      setMedicineItems(medicineItemsClone);
    } else if (changingSideContent === 2) {
      const newRoomsItems =
        res.data.treatmentSkus &&
        res.data.treatmentSkus.filter((item: any) => {
          return item.category.name === "Room Cost";
        });
      newRoomsItems && setPatientRoomItems(newRoomsItems);

      const grandTotal = newRoomsItems.reduce((a: any, c: any) => {
        return a + c.quantity * c.price;
      }, 0);

      setTotalRoomCostPayment(grandTotal && grandTotal);

      const roomsItemsClone = roomsItems.filter((cur: any) => {
        return cur.name === item
          ? { ...cur, quantity: (cur.quantity = 0) }
          : cur;
      });
      setRoomsItems(roomsItemsClone);
    } else if (changingSideContent === 3) {
      const newConsultantItems =
        res.data.treatmentSkus &&
        res.data.treatmentSkus.filter((item: any) => {
          return item.category.name === "Consultant Cost";
        });
      newConsultantItems && setPatientConsultantItems(newConsultantItems);

      const grandTotal = newConsultantItems.reduce((a: any, c: any) => {
        return a + c.quantity * c.price;
      }, 0);

      setTotalConsultantCostPayment(grandTotal && grandTotal);

      const consultantItemsClone = consultantItems.filter((cur: any) => {
        return cur.name === item
          ? { ...cur, quantity: (cur.quantity = 0) }
          : cur;
      });
      setConsultantItems(consultantItemsClone);
    } else if (changingSideContent === 4) {
      const newOxygenItems =
        res.data.treatmentSkus &&
        res.data.treatmentSkus.filter((item: any) => {
          return item.category.name === "Oxygen Cost";
        });
      newOxygenItems && setPatientOxygenItems(newOxygenItems);

      const grandTotal = newOxygenItems.reduce((a: any, c: any) => {
        return a + c.quantity * c.price;
      }, 0);

      setTotalOxygenCostPayment(grandTotal && grandTotal);

      const oxygenItemsClone = oxygenItems.filter((cur: any) => {
        return cur.name === item
          ? { ...cur, quantity: (cur.quantity = 0) }
          : cur;
      });
      setOxygenItems(oxygenItemsClone);
    } else if (changingSideContent === 5) {
      const newBloodWorkItems =
        res.data.treatmentSkus &&
        res.data.treatmentSkus.filter((item: any) => {
          return item.category.name === "Blood Work Cost";
        });
      newBloodWorkItems && setPatientBloodWorkItems(newBloodWorkItems);

      const grandTotal = newBloodWorkItems.reduce((a: any, c: any) => {
        return a + c.quantity * c.price;
      }, 0);

      setTotalBloodWorkCostPayment(grandTotal && grandTotal);

      const bloodWorkItemsClone = bloodWorkItems.filter((cur: any) => {
        return cur.name === item
          ? { ...cur, quantity: (cur.quantity = 0) }
          : cur;
      });
      setBloodWorkItems(bloodWorkItemsClone);
    }
  };

  const sharePaymentLink = async () => {
    // await axios.post(
    //   `/hospitals/${HospitalID}/${PatientID}/payment-link/razorpay`
    // );
    // await axios.post(
    //   `/hospitals/${HospitalID}/${sessionStorage.getItem(
    //     "PatientID"
    //   )}/payment-link/razorpay`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // await Axios.post(
    //   "https://bk2-7k5qcren2q-el.a.run.app/payments/sharefintechpaymentlink",
    //   {
    //     amount:
    //       totalMedicineCostPayment +
    //       totalRoomCostPayment +
    //       totalConsultantCostPayment +
    //       totalOxygenCostPayment +
    //       totalBloodWorkCostPayment,
    //     name: props.patient.user.full_name,
    //     email: props.patient.hospital.email,
    //     contact: props.patient.user.userPhoneNumber.phone_number,
    //   }
    // );
    const res = await axios.post(
      `/${props.patient.id}/sendpaymentlinkDischarge`,
      {
        name: props.patient.user.full_name,
        hospitalName: props.patient.hospital.name,
        amount:
          totalMedicineCostPayment +
          totalRoomCostPayment +
          totalConsultantCostPayment +
          totalOxygenCostPayment +
          totalBloodWorkCostPayment,
        number: props.patient.user.userPhoneNumber.phone_number,
      }
    );
    // localStorage.setItem("rzpid", sharePaymentLik.data.message);
    await axios.post(
      `/hospitals/${HospitalID}/${props.patient.id}/change-status`,
      {
        updatedStatus: "payment_of_discharge_pending",
      }
    );
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

      {changingSideContent === 0 ? (
        <div style={style.mainContainer}>
          <div style={style.cardContainer}>
            <div>
              <div style={style.insideContainer}>
                <Heading style={style.heading}>Payment details</Heading>
              </div>
              <br />
              <Card style={style.card}>
                <CardContent>
                  <div style={style.insideContainer}>
                    <div style={style.paymentSatusDiv}>
                      <Heading
                        style={{ fontSize: "0.9rem", fontWeight: "500" }}
                      >
                        PAYMENT RECEIVED
                      </Heading>
                    </div>
                  </div>
                  <div style={style.insideContainer}>
                    <div>
                      <Heading style={style.labelHead}>
                        Admission charge
                      </Heading>
                    </div>
                    <div>
                      <Heading style={style.labelData}>
                        {` ₹ ${depositAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      </Heading>
                    </div>
                  </div>
                  <div style={style.insideContainer}>
                    <div>
                      <Heading style={style.labelHead}>
                        EasyAspataal charges
                      </Heading>
                    </div>
                    <div>
                      <Heading style={style.labelData}>
                        {otherAmount !== 0
                          ? `₹ ${otherAmount
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                          : "-"}
                      </Heading>
                    </div>
                  </div>
                  <div style={style.insideContainer}>
                    <div>
                      <Heading style={style.labelHead}>Transaction ID</Heading>
                    </div>
                    <div>
                      <Heading style={style.labelData}>
                        {props.patient.payments.length > 0
                          ? props.patient.payments[
                              props.patient.payments.length - 1
                            ].order_id
                          : "-"}
                      </Heading>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div style={{ ...style.cardContainer, marginBottom: "5rem" }}>
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
                        : "-"}
                    </Heading>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : changingSideContent === 6 ? (
        <div style={style.mainContainer}>
          <div style={{ marginBottom: "5rem" }}>
            <TreatmentCategory
              title={"1. Medicine cost"}
              patientItems={patientMedicineItems}
              deleteTretmentSkus={deleteTretmentSkus}
              totalCostPayment={totalMedicineCostPayment}
              handleChangeSideContent={() => setChangingSideContent(1)}
            />
            <TreatmentCategory
              title={"2. Room cost"}
              patientItems={patientRoomItems}
              deleteTretmentSkus={deleteTretmentSkus}
              totalCostPayment={totalRoomCostPayment}
              handleChangeSideContent={() => setChangingSideContent(2)}
            />
            <TreatmentCategory
              title={"3. Consultant cost"}
              patientItems={patientConsultantItems}
              deleteTretmentSkus={deleteTretmentSkus}
              totalCostPayment={totalConsultantCostPayment}
              handleChangeSideContent={() => setChangingSideContent(3)}
            />
            <TreatmentCategory
              title={"4. Oxygen cost"}
              patientItems={patientOxygenItems}
              deleteTretmentSkus={deleteTretmentSkus}
              totalCostPayment={totalOxygenCostPayment}
              handleChangeSideContent={() => setChangingSideContent(4)}
            />
            <TreatmentCategory
              title={"5. Blood Work cost"}
              patientItems={patientBloodWorkItems}
              deleteTretmentSkus={deleteTretmentSkus}
              totalCostPayment={totalBloodWorkCostPayment}
              handleChangeSideContent={() => setChangingSideContent(5)}
            />
          </div>
        </div>
      ) : (
        <div style={style.mainContainer}>
          {/* <div style={style.cardContainer}>
            <div>
              <Stepper activeStep={changingSideContent - 1}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <br />
              <div>
                <br />
                <div style={style.seprateContainer}>
                  <Heading style={style.heading}>
                    {changingSideContent === 1
                      ? "1. Medicines & equipment"
                      : changingSideContent === 2
                      ? "2. Room Cost"
                      : changingSideContent === 3
                      ? "3. Consultation cost"
                      : changingSideContent === 4
                      ? "4. Oxygen cost"
                      : changingSideContent === 5
                      ? "5. BloodWork cost"
                      : ""}
                  </Heading>
                  <br />
                  <AccordionComponents
                    style={style.accordionDiv}
                    titleStyle={style.labelHead}
                    title={
                      changingSideContent === 1
                        ? "medicines"
                        : changingSideContent === 2
                        ? "room"
                        : changingSideContent === 3
                        ? "consultation"
                        : changingSideContent === 4
                        ? "oxygen"
                        : changingSideContent === 5
                        ? "bloodWork"
                        : ""
                    }
                  >
                    <>
                      {roomsItems.map((item: any) => {
                        return (
                          <div style={style.insideContainer}>
                            <Heading style={style.labelHead}>
                              {item.name}
                            </Heading>
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
          )} */}
          <TreatmentSkus
            changingSideContent={changingSideContent}
            steps={steps}
            itemsArray={
              changingSideContent === 1
                ? medicineItems
                : changingSideContent === 2
                ? roomsItems
                : changingSideContent === 3
                ? consultantItems
                : changingSideContent === 4
                ? oxygenItems
                : bloodWorkItems
            }
            addRoomQty={addRoomQty}
            patientItemsArray={
              changingSideContent === 1
                ? patientMedicineItems
                : changingSideContent === 2
                ? patientRoomItems
                : changingSideContent === 3
                ? patientConsultantItems
                : changingSideContent === 4
                ? patientOxygenItems
                : patientBloodWorkItems
            }
            deleteTretmentSkus={deleteTretmentSkus}
          />
        </div>
      )}

      {changingSideContent === 0 ? (
        <div style={style.downDiv}>
          <ButtonComponent
            style={style.buttonDown}
            buttontext='Update treatment details'
            onClick={goToCostPage}
          />
        </div>
      ) : changingSideContent === 6 ? (
        <div style={style.totalDiv}>
          <Heading style={style.labelHeading}>
            Grand total: ₹{" "}
            {(
              totalMedicineCostPayment +
              totalRoomCostPayment +
              totalConsultantCostPayment +
              totalOxygenCostPayment +
              totalBloodWorkCostPayment
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Heading>
          <ButtonComponent
            style={style.priceButton}
            buttontext='Share Payment Link'
            onClick={sharePaymentLink}
          />
        </div>
      ) : (
        <div style={style.totalDiv}>
          <Heading style={style.labelHeading}>
            Sub total: ₹
            {changingSideContent === 1
              ? totalMedicineCostPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : changingSideContent === 2
              ? totalRoomCostPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : changingSideContent === 3
              ? totalConsultantCostPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : changingSideContent === 4
              ? totalOxygenCostPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : totalBloodWorkCostPayment
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Heading>
          <ButtonComponent
            style={style.priceButton}
            buttontext='Next'
            onClick={() => setChangingSideContent((prev) => prev + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default InitiateDischarge;
