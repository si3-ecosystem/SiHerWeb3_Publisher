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
            {websiteData?.navbar?.logo?.path &&
              (typeof websiteData?.navbar?.logo?.path === "object" ? (
                <img
                  src={URL.createObjectURL(websiteData?.navbar?.logo?.path)}
                  alt={websiteData?.navbar?.imageAltText}
                />
              ) : (
                <img
                  src={websiteData?.navbar?.logo?.path}
                  alt={websiteData?.navbar?.imageAltText}
                />
              ))}

            <h1>{websiteData?.navbar?.websiteName}</h1>
          </div>
          <div className="menus" onClick={handelNav}>
            <ul>
              {websiteData?.navbar?.links?.map((item, index) => {
                return (
                  <li>
                    <a
                      href={`#${item.toString().toLowerCase()}`}
                      key={index}
                      className="text-red-500"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
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
