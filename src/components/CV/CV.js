import React from "react";
import "./cv.css";
import { useSelector } from "react-redux";
function CV({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content);

  return (
    <div
      id="cv"
      className="border hover:border-gray-400 cursor-pointer"
      onClick={() => setIsOpen("CV")}
    >
      <div className="cv_container">
        <h1>{websiteData?.CV?.title}</h1>
        {websiteData?.CV?.highlights?.map((item, index) => (
          <div className="highlights" key={index}>
            <div className="data">
              <div className="date">
                <p>{item?.year}</p>
              </div>
              <div className="info">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CV;
