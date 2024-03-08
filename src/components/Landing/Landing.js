import React from "react";
import "./landing.css";
import { useState } from "react";
import girl from "../../Images/girl.png";
import arrow from "../../Images/arrow-right.svg";
import { useSelector } from "react-redux";
function Landing({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content);
  console.log(websiteData);
  // const [hideState, sethide] = useState(false);
  // function handelHide() {
  //   sethide((hideState) => !hideState);
  // }
  //   const generateCategory = () => {
  //     const elements = [];

  //     for (let i = 0; i < items.length; i++) {

  //     }
  // for (const category in allContent.categories) {
  //   if (allContent.categories.hasOwnProperty(category)) {
  //     const value = allContent.categories[category];
  //     console.log(`${category}: ${value}`);
  //     elements.push(<li key={i}>{items[i]}</li>);
  //   }
  // }
  //     return elements;
  //   };
  // let contentss = allContent.heading.split("SPLIT");

  return (
    <div
      id="landing_container"
      className="border hover:border-gray-400"
      onClick={() => setIsOpen("landing")}
    >
      <div className="landing_innerContainer">
        <div className="landing_info">
          <h1 className="landing_heading">
            {/* I’m <span className="special_heading">{props.name}</span>,<br /> */}
            {websiteData?.landing?.title}
            <br />
            {/* {allContent.heading} */}
            {websiteData?.landing?.subTitle}
            {/* {contentss[0]}
            <br />
            {contentss[1]}
            <br />
            {contentss[2]} */}
          </h1>
          <div className="stand_box">
            <span className="border"></span>
            <p className="standbox_title">
              {websiteData?.landing?.hashTagTitle}
            </p>
            <div className="tags">
              {websiteData?.landing?.hashTags?.length &&
                websiteData?.landing?.hashTags?.map((hash) => <p>#{hash}</p>)}
            </div>
          </div>
          <div className="animation_region animation_region_pc">
            {websiteData?.landing?.categories?.map((value, index) => {
              return (
                <div className="anim" key={index}>
                  <div className="inner_anim">
                    <p className="top_hide">{value.title}</p>
                    <p className="special_hide">{value.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="animation_region animation_region_mobile">
            {websiteData?.landing?.categories.map((value, index) => (
              <div className="anim">
                <div className="inner_anim">
                  <p className="top_hide">
                    {value.title}{" "}
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="arrow-right-02">
                          <path
                            id="Vector"
                            d="M20 12L3 12"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            id="Vector_2"
                            d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                  </p>
                  <p className="special_hide">
                    <span>{value.text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="landing_img">
          {websiteData?.landing?.userimg &&
            (typeof websiteData?.landing?.userimg === "object" ? (
              <img
                src={URL.createObjectURL(websiteData?.landing?.userimg)}
                alt="image"
              />
            ) : (
              <img src={websiteData?.landing?.userimg} alt="image" />
            ))}

          {/* <img src={websiteData?.landing?.userimg} /> */}
          <div className={`img_name ${websiteData?.landing?.name}`}>
            <p>{websiteData?.landing?.name}</p>
            <small>({websiteData?.landing?.pronoun})</small>
          </div>
        </div>
      </div>

      <div className="marquee_outer_wrapper">
        <div className="marquee">
          <div className="track">
            <div className="content">
              {websiteData?.landing?.marquee?.map((item, index) => {
                return (
                  <>
                    <h1 key={index}>{item} </h1>
                    <h1>~</h1>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
