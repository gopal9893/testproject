import React, { useEffect, useState, useCallback } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { PatientTable } from "../../components/data-table/table";
import PatientInterface from "../../interfaces/table";
import axios from "../../config/axios";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { debounce } from "lodash";
import Axios from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [filteredData, setfilteredData] = React.useState<PatientInterface[]>(
    []
  );
  const [startpage, setStartPages] = useState(1);
  const [endpage, setEndPages] = useState(0);
  const token = localStorage.getItem("token");
  const HospitalID = localStorage.getItem("HospitalID");
  const [isChanged, setIsChanged] = useState(false);
  const [searchststatus, setSearchStatus] = useState("active");
  const [isDraft, setIsDraft] = useState(false);
  const [draftPatient, setDraftPatient] = useState<any[]>([]);

  const toggleIsChanged = () => {
    setIsChanged(!isChanged);
  };
  const debounceLoadData = useCallback(
    debounce((data, index) => {
      if (index === 0) {
        axios
          .get(
            "/hospitals/" +
              localStorage.getItem("HospitalID") +
              "/patients/search?status=active&search=" +
              data
          )
          .then((res) => {
            setfilteredData(res.data.patients);
            setEndPages(res.data.totalPages);
          });
      } else if (index === 1) {
        axios
          .get(
            "/hospitals/" +
              localStorage.getItem("HospitalID") +
              "/patients/search?status=admitted&search=" +
              data
          )
          .then((res) => {
            setfilteredData(res.data.patients);
            setEndPages(res.data.totalPages);
          });
      } else {
        axios
          .get(
            "/hospitals/" +
              localStorage.getItem("HospitalID") +
              "/patients/search?status=discharge&search=" +
              data
          )
          .then((res) => {
            setfilteredData(res.data.patients);
            setEndPages(res.data.totalPages);
          });
      }
    }, 300),
    []
  );
  useEffect(() => {
    axios
      .get(
        "hospitals/" + localStorage.getItem("HospitalID") + "/dashboard/active",
        {
          headers: {
            authorization:
              localStorage!.getItem("token") !== null
                ? `Bearer ${localStorage.getItem("token")}`!
                : false,
          },
        }
      )
      .then((res) => {
        // filteredData.length = 0;
        setValue(0);
        setfilteredData(res.data.patients);
        setEndPages(res.data.totalPages);
      });
  }, [isChanged]);
  const handleChange = async (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    if (newValue === 0) {
      setIsDraft(false);
      filteredData.length = 0;
      await axios
        .get(
          "hospitals/" +
            localStorage.getItem("HospitalID") +
            "/dashboard/active",
          {
            headers: {
              authorization:
                localStorage!.getItem("token") !== null
                  ? `Bearer ${localStorage.getItem("token")}`!
                  : false,
            },
          }
        )
        .then((res) => {
          setfilteredData(res.data.patients);
          setEndPages(res.data.totalPages);
        });
    } else if (newValue === 1) {
      setIsDraft(false);
      filteredData.length = 0;
      await axios
        .get(
          "hospitals/" +
            localStorage.getItem("HospitalID") +
            "/dashboard/admitted",
          {
            headers: {
              authorization:
                localStorage!.getItem("token") !== null
                  ? `Bearer ${localStorage.getItem("token")}`!
                  : false,
            },
          }
        )
        .then((res) => {
          setfilteredData(res.data.patients);
          setEndPages(res.data.totalPages);
        });
    } else if (newValue === 2) {
      setIsDraft(false);
      filteredData.length = 0;
      await axios
        .get(
          "hospitals/" +
            localStorage.getItem("HospitalID") +
            "/dashboard/discharged",
          {
            headers: {
              authorization:
                localStorage!.getItem("token") !== null
                  ? `Bearer ${localStorage.getItem("token")}`!
                  : false,
            },
          }
        )
        .then((res) => {
          setfilteredData(res.data.patients);
          setEndPages(res.data.totalPages);
        });
    } else {
      setIsDraft(true);
      filteredData.length = 0;
      await Axios.get(
        `http://localhost:8080/fintech/getdraftstatus?hospital_id=${HospitalID}`
      ).then((res) => {
        // setfilteredData(res.data.patients);
        // setEndPages(res.data.totalPages);
        setDraftPatient(res.data);
      });
    }
    setValue(newValue);
    const value = newValue;
  };
  const handlePreviousPage = () => {
    const PageNo = startpage - 1;
    if (value === 0) {
      setSearchStatus("active");
    } else if (value === 1) {
      setSearchStatus("admitted");
    } else if (value === 2) {
      setSearchStatus("discharge");
    } else {
      setSearchStatus("draft");
    }
    axios
      .get(
        "hospitals/" +
          localStorage.getItem("HospitalID") +
          "/dashboard?page=" +
          PageNo +
          "&status=" +
          searchststatus,
        {
          headers: {
            authorization:
              localStorage!.getItem("token") !== null
                ? `Bearer ${localStorage.getItem("token")}`!
                : false,
          },
        }
      )
      .then((res) => {
        // filteredData.length = 0;
        setfilteredData(res.data.patients);
        setStartPages(PageNo);
        setEndPages(res.data.totalPages);
      });
  };

  const handleNextPage = () => {
    const PageNo = startpage + 1;
    if (value === 0) {
      setSearchStatus("active");
    } else if (value === 1) {
      setSearchStatus("admitted");
    } else if (value === 2) {
      setSearchStatus("discharge");
    } else {
      setSearchStatus("draft");
    }
    axios
      .get(
        "hospitals/" +
          localStorage.getItem("HospitalID") +
          "/dashboard?page=" +
          PageNo +
          "&status=" +
          searchststatus,
        {
          headers: {
            authorization:
              localStorage!.getItem("token") !== null
                ? `Bearer ${localStorage.getItem("token")}`!
                : false,
          },
        }
      )
      .then((res) => {
        // filteredData.length = 0;
        setfilteredData(res.data.patients);
        setStartPages(PageNo);
        setEndPages(res.data.totalPages);
      });
  };
  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceLoadData(e.currentTarget.value, value);
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='flex-start'
        justify='center'
      >
        <Grid item xs={3} style={{ marginLeft: "5%" }}>
          <h1>Patients</h1>
        </Grid>
      </Grid>
      <Tabs
        style={{ marginLeft: "5%" }}
        value={value}
        onChange={handleChange}
        aria-label='simple tabs example'
      >
        <Tab label='Active' />
        <Tab label='Admitted' />
        <Tab label='Discharged' />
        <Tab label='Draft' />
      </Tabs>
      <TabPanel value={value} index={value}>
        <br />
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item xs style={{ marginLeft: "5%" }}>
            <div
              style={{
                border: "1px solid black",
                borderRadius: 5,
                width: "20rem",
              }}
            >
              <IconButton aria-label='search'>
                <SearchIcon />
              </IconButton>
              <InputBase placeholder='Search' onChange={onChangeSearch} />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              Page {startpage} of {endpage}
              {startpage === 1 ? (
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  disabled
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              ) : (
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  onClick={handlePreviousPage}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              )}
              {startpage === endpage ? (
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  disabled
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              ) : (
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  onClick={handleNextPage}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              )}
            </div>
          </Grid>
        </Grid>
        ​
        <PatientTable
          data={filteredData}
          isChanged={toggleIsChanged}
          isDraft={isDraft}
          draftPatient={draftPatient}
        />
      </TabPanel>
    </div>
  );
}
