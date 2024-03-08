import "../CSS/App.css";
import "../CSS/responsive.css";
import navbarStyles from "../components/Navbar/navbar.css";
import Landing from "../components/Landing/Landing";
import Value from "../components/Value/Value";
import Vision from "../components/Vision/Vision";
import CV from "../components/CV/CV";
import Available from "../components/Available/Available";
import Navbar from "../components/Navbar/Navbar";
import contentData from "../DataFiles/6abc2.js";
import React, { Component, useEffect, useState } from "react";
import websiteData from "../DataFiles/6abc2.js";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../reducers/contentReducer.js";
function Preview() {
  const dispatch = useDispatch();
  const { websiteData } = useSelector((state) => state.content);
  console.log(websiteData);
  const getWebsiteContent = () => {
    try {
      dispatch(handleWebsiteData(contentData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!websiteData) {
      getWebsiteContent();
    }
  }, [websiteData]);

  return (
    <div className="App">
      <div className="flex   bg-[#d5d5e3]">
        <div className="w-full">
          <Navbar />

          <Landing />
          <Value />
          <Vision />
          <CV />
          <Available />
        </div>
      </div>
    </div>
  );
}

export default Preview;
