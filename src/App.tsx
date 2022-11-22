import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import PatientTabs from "./components/tabs/tab";
import Login from "./components/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Show from "./components/Show";
import RoomCost from "./pages/roomCost/RoomCost";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["General Sans", "sans-serif"].join(","),
    },
  });
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            {/* <Route path="/dashboard/docs" element={<D} /> */}
            <Route path='/show' element={<Show />} />
            <Route path='/cost' element={<RoomCost />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
