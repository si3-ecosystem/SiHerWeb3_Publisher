import React, { useEffect } from "react";
import { useState } from "react";
import "./navbar.css";
import "../../CSS/App.css";
import "../../CSS/responsive.css";
import { useSelector } from "react-redux";
function Navbar({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content);
  const [btnstate, setbtn] = useState(false);
  function handelClick() {
    setbtn((btnstate) => !btnstate);
  }

  function handelNav() {
    setbtn((btnstate) => false);
  }

  let checkClass = btnstate ? "active" : null;

  return (
    <div
      className="border hover:border-gray-400 hover:cursor-pointer"
      // onClick={() => setIsOpen("navbar")}
      onClick={() => setIsOpen && setIsOpen("navbar")}
    >
      <nav className={`nav ${checkClass} `}>
        <div className="nav_wrapper">
          <div className="logo">
            {websiteData?.navbar?.logo &&
              (typeof websiteData?.navbar?.logo === "object" ? (
                <img
                  src={URL.createObjectURL(websiteData?.navbar?.logo)}
                  alt={websiteData?.navbar?.imageAltText}
                />
              ) : (
                <img
                  src={websiteData?.navbar?.logo}
                  alt={websiteData?.navbar?.imageAltText}
                />
              ))}

            <h1>{websiteData?.navbar?.websiteName}</h1>
          </div>
          <div className="menus" onClick={handelNav}>
            <ul>
              <li>
                <a href="#value" className="text-red-500">
                  {websiteData?.navbar?.linkText1}
                </a>
              </li>
              <li>
                <a href="#media">{websiteData?.navbar?.linkText2}</a>
              </li>
              <li>
                <a href="#vision">{websiteData?.navbar?.linkText3}</a>
              </li>
              <li>
                <a href="#cv">{websiteData?.navbar?.linkText4}</a>
              </li>
              <li>
                <a href="#connect">{websiteData?.navbar?.linkText5}</a>
              </li>
            </ul>
          </div>
          <div className="connect-btn">
            <button>{websiteData?.navbar?.buttonText}</button>
          </div>
          <div className="menu-toggler" onClick={handelClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
