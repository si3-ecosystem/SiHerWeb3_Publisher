import "../CSS/App.css";
import Landing from "../components/Landing/Landing";
import Value from "../components/Value/Value";
import Vision from "../components/Vision/Vision";
import CV from "../components/CV/CV";
import Available from "../components/Available/Available";
import Navbar from "../components/Navbar/Navbar";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import App from "./App";
import React, { Fragment } from "react";
import DynamicComponentsData from "./DynamicComponentsData";
import Error from "../components/404/Error";

function Rout() {
  let dynamicComponents = DynamicComponentsData;

  return (
    
    <Router>
      <Routes>
        {dynamicComponents.map((route) => (
          <Route
            key={route.index}
            path={route.url}
            exact
            element={<App dynamicData={route} title={route.title} />}
          />

        ))}
        <Route
          
            path="*"
            
            element={<Error/>}
          />

      </Routes>
    </Router>
  );
}

export default Rout;
