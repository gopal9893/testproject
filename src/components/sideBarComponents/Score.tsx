import React, { useContext, useState, useEffect } from "react";
import { style } from "../../styles/listsidebar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Props } from "./props/Score";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import axios from "../../config/axios";
import Heading from "../heading";
import { Checkbox } from "@material-ui/core";
import { template } from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

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

interface ScoreInterface {
  handleIsInsurance: (value: boolean) => void;
  isHasMedicalInsurance: boolean;
  setIsHasMedicalInsurance: (value: boolean) => void;
  setPatientInsuranceDetails: (value: any) => void;
}

const ScoreBarComponent = ({
  handleIsInsurance,
  isHasMedicalInsurance,
  setIsHasMedicalInsurance,
  setPatientInsuranceDetails,
}: ScoreInterface) => {
  const insuranceList = [
    { label: "Ako Insurance", contact: 12345678 },
    { label: "Bajaj Allianz", contact: 8765432 },
    { label: "Neo", contact: 1234465 },
    { label: "ABC", contact: 9876889 },
  ];

  const DiseaseList = [
    { label: "Hernia", contact: 12345678 },
    { label: "Piles", contact: 8765432 },
    { label: "XYZ", contact: 1234465 },
  ];

  const classes = useStyles();
  //useEffect(() => {

  //}, []);

  const [typestate, setTypeState] = React.useState<{
    age: string | number;
    name: string;
  }>({
    age: "",
    name: "hai",
  });
  const [incometype, setIncomeType] = React.useState("");
  const [treatmenttype, setTreatmentType] = React.useState("");
  const [diseasetype, setDiseaseType] = React.useState("");
  const [insurancetype, setInsuranceType] = React.useState("");
  const [cappingtype, setCappingType] = React.useState("");
  const [roomtype, setRoomType] = React.useState("");
  const [copaytype, setCopayType] = React.useState("");
  const [policytype, setPolicyType] = React.useState("");
  const [waitingtype, setWaitingType] = React.useState("");
  const [avaibilitytype, setAvailabilityType] = React.useState("yes");
  const [applicabilitytype, setApplicabilityType] = React.useState("yes");
  const [insurancename, setInsuranceName] = React.useState("");
  const [suminsured, setSumInsuredName] = React.useState<number>();
  const [coPay, setCoPay] = React.useState<number>();
  const [availabilityboolean, setAvailabilityBoolean] = React.useState(true);
  const [applicabilityboolean, setApplicabilityBoolean] = React.useState(true);
  const [insuranceID, setInsuranceID] = React.useState(0);
  const HospitalID = localStorage.getItem("HospitalID");
  const PatientID = sessionStorage.getItem("PatientID");

  React.useEffect(() => {
    axios.get(`/hospitals/${HospitalID}/patient/${PatientID}`).then((res) => {
      const tempPatientInsuranceDetails =
        res.data.patient.insurances[res.data.patient.insurances.length - 1];
      setInsuranceName(tempPatientInsuranceDetails.details);
      setSumInsuredName(tempPatientInsuranceDetails.sum_insured);
      setCoPay(tempPatientInsuranceDetails.co_pay);
      setAvailabilityBoolean(tempPatientInsuranceDetails.availability);
      setApplicabilityBoolean(tempPatientInsuranceDetails.applicability);
      setInsuranceID(tempPatientInsuranceDetails.id);
    });
  }, []);

  React.useEffect(() => {
    isHasMedicalInsurance ? handleIsInsurance(false) : handleIsInsurance(true);
  }, [isHasMedicalInsurance]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof typestate;
    //alert(event.target.value)
    setTypeState({
      ...typestate,
      [name]: event.target.value,
    });
  };

  const IncomehandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIncomeType(event.target.value as string);
  };

  const TreatmenthandleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTreatmentType(event.target.value as string);
  };

  const DiseasehandleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setDiseaseType(event.target.value as string);
  };

  const InsurancehandleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setInsuranceType(event.target.value as string);
  };

  const CappingehandleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCappingType(event.target.value as string);
  };

  const RoomhandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoomType(event.target.value as string);
  };

  const CopayhandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCopayType(event.target.value as string);
  };

  const PolicyhandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPolicyType(event.target.value as string);
  };

  const WaitinghandleChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setWaitingType(event.target.value as string);
  };

  const handleAvailibiltyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvailabilityType((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "yes") {
      setAvailabilityBoolean(true);
    } else {
      setAvailabilityBoolean(false);
    }
  };

  const handleApplicabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApplicabilityType((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "yes") {
      setApplicabilityBoolean(true);
    } else {
      setApplicabilityBoolean(false);
    }
  };

  const handleInsuranceName = (e: any) => {
    setInsuranceName(e);
  };

  const handleSumInsured = (e: any) => {
    setSumInsuredName(e);
  };

  const handleCoPay = (e: any) => {
    setCoPay(e);
  };

  const calculateScore = async (e: any) => {
    e.preventDefault();
    // if (insuranceID !== 0) {
    //   const res = await axios.patch(`/insurance/${insuranceID}`, {
    //     details: insurancename,
    //     sum_insured: suminsured && +suminsured,
    //     availability: availabilityboolean,
    //     applicability: applicabilityboolean,
    //     coPay: coPay && +coPay,
    //   });
    //   setPatientInsuranceDetails(res.data);
    //   setInsuranceName(res.data.details);
    //   setSumInsuredName(res.data.sum_insured);
    //   setCoPay(res.data.co_pay);
    //   setAvailabilityBoolean(res.data.availability);
    //   setApplicabilityBoolean(res.data.applicability);
    //   setInsuranceID(res.data.id);
    //   handleIsInsurance(true);
    // } else {
    const res = await axios.post(
      "/insurance/" + sessionStorage.getItem("PatientID"),
      {
        details: insurancename,
        sum_insured: suminsured && +suminsured,
        availability: availabilityboolean,
        applicability: applicabilityboolean,
        coPay: coPay && +coPay,
      }
    );
    setPatientInsuranceDetails(res.data);
    setInsuranceName(res.data.details);
    setSumInsuredName(res.data.sum_insured);
    setCoPay(res.data.co_pay);
    setAvailabilityBoolean(res.data.availability);
    setApplicabilityBoolean(res.data.applicability);
    setInsuranceID(res.data.id);
    handleIsInsurance(true);
    // }
  };

  return (
    // <DrawerComponents style={style.sideBar} open={true}>
    <>
      <div style={style.mainContainer}>
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='center'
        >
          <form onSubmit={calculateScore}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Heading style={{ ...style.subHeading }}>
                Medical Insurance
              </Heading>
              <StyledCheckbox
                checked={isHasMedicalInsurance}
                onClick={() => setIsHasMedicalInsurance(!isHasMedicalInsurance)}
              />
            </div>
            <br />
            <Heading style={{ ...style.heading }}>
              Name of the Insurance
            </Heading>
            <br />
            <TextField
              id='standard-basic'
              placeholder='Name of the Insurance'
              style={{ width: "32rem" }}
              value={insurancename}
              variant='outlined'
              onChange={(e) => handleInsuranceName(e.target.value)}
              required
            />
            <br />
            <br />
            <Heading style={style.heading}>Total Sum Insured</Heading>
            <br />
            <TextField
              id='standard-basic'
              placeholder='Total Sum Insured'
              type='number'
              variant='outlined'
              style={{ width: "32rem" }}
              value={suminsured}
              onChange={(e) => handleSumInsured(e.target.value)}
              required
            />
            <br />
            <br />
            <Heading style={style.heading}>Co Pay</Heading>
            <br />
            <TextField
              id='standard-basic'
              placeholder='Total Sum Insured'
              type='number'
              variant='outlined'
              style={{ width: "32rem" }}
              value={coPay}
              onChange={(e) => handleCoPay(e.target.value)}
              required
            />
            <br />
            <br />
            <FormControl>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                Is Insurance Availabale
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={avaibilitytype}
                onChange={handleAvailibiltyChange}
              >
                <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <FormControl>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                Is Insurance Applicabale
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={applicabilitytype}
                onChange={handleApplicabilityChange}
              >
                <FormControlLabel value='yes' control={<Radio />} label='Yes' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
            <br />
            {/*<FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                            Type
                        </InputLabel>
                        <NativeSelect
                            value={typestate.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-label-placeholder',
                            }}
                        >
                            <option value="reimburse">Reimbursement Insurance</option>
                            <option value="no">No Insurance</option>
                        </NativeSelect>
                    </FormControl>
                    <br />
                    {typestate.age === 'no' &&
                        <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Income Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={incometype}
                                    onChange={IncomehandleChange}
                                >
                                    <MenuItem value="salaried">Salaried</MenuItem>
                                    <MenuItem value="non_salaried">Non Salaried</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <TextField id="standard-basic" label="Total Estimated Amount" type="number" />
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Treatment Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={treatmenttype}
                                    onChange={TreatmenthandleChange}
                                >
                                    <MenuItem value="surgical">Surgical</MenuItem>
                                    <MenuItem value="medical">Medical</MenuItem>
                                </Select>
                            </FormControl>
                            <br />

                            {treatmenttype === 'surgical' &&
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Disease Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={diseasetype}
                                            onChange={DiseasehandleChange}>
                                            <MenuItem value="hernia">Hernia</MenuItem>
                                            <MenuItem value="piles">Piles</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            }
                        </div>
                    }

                    <br />

                    {typestate.age === 'reimburse' &&
                        <div>
                            <FormControl className={classes.formControl}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={insuranceList}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Name of the Insurance" />}
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Capping</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cappingtype}
                                    onChange={CappingehandleChange}
                                >
                                    <MenuItem value="disease">Disease wise</MenuItem>
                                    <MenuItem value="maternity">Maternity</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={roomtype}
                                    onChange={RoomhandleChange}
                                >
                                    <MenuItem value="icu">ICU</MenuItem>
                                    <MenuItem value="general">General</MenuItem>
                                    <MenuItem value="sharing">Sharing</MenuItem>
                                    <MenuItem value="single">Single</MenuItem>
                                </Select>
                            </FormControl>
                            <br /><br />
                            <TextField id="standard-basic" label="Total Sum Insured" type="number" />
                            <br /><br />
                            <TextField id="standard-basic" label="Eligible Room" type="number" />
                            <br /><br />
                            <TextField id="standard-basic" label="Total Estimated Amount" type="number" />
                            <br /><br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Treatment Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={treatmenttype}
                                    onChange={TreatmenthandleChange}>
                                    <MenuItem value="surgical">Surgical</MenuItem>
                                    <MenuItem value="medical">Medical</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={DiseaseList}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Name of the Disease" />}
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Co-Pay</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={copaytype}
                                    onChange={CopayhandleChange}>
                                    <MenuItem value={0}>0%</MenuItem>
                                    <MenuItem value={5}>5%</MenuItem>
                                    <MenuItem value={10}>10%</MenuItem>
                                    <MenuItem value={15}>15%</MenuItem>
                                    <MenuItem value={20}>20%</MenuItem>
                                    <MenuItem value={25}>25%</MenuItem>
                                    <MenuItem value={30}>30%</MenuItem>
                                    <MenuItem value={35}>35%</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Policy Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={policytype}
                                    onChange={PolicyhandleChange}>
                                    <MenuItem value="corporate">Corporate</MenuItem>
                                    <MenuItem value="retail">Retail</MenuItem>
                                </Select>
                            </FormControl>
                            <br />

                            {policytype === 'corporate' &&
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Waiting Period</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={waitingtype}
                                            onChange={WaitinghandleChange}>
                                            <MenuItem value="yes">Yes</MenuItem>
                                            <MenuItem value="no">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            }
                        </div>
                    }*/}
            {/* <br /> */}
            <br />
            <Button
              variant='contained'
              style={{
                ...style.priceButton,
                backgroundColor: !isHasMedicalInsurance ? "#D9D9D9" : "#4D24CD",
              }}
              type='submit'
              disabled={!isHasMedicalInsurance}
            >
              Save
            </Button>
            <br />
            <br />
          </form>
        </Grid>
      </div>
    </>
  );
};

export default ScoreBarComponent;
