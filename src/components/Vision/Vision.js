import React from "react";
import "./vision.css";
import { useSelector } from "react-redux";
function Vision({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content);

  return (
    <div
      className="border hover:border-gray-400 cursor-pointer"
      onClick={() => setIsOpen("vision")}
    >
      <div className="vision_container" id="vision">
        <div className="inner-container">
          <h1>{websiteData?.vision?.title}</h1>
          <p>{websiteData?.vision?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Vision;
