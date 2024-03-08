import React from "react";
import "./value.css";
import watermark from "../../Images/watermark1.svg";
import rupay from "../../Images/rupay.png";
import power from "../../Images/Powered By.svg";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

function Value({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content);
  const renderVideo = () => {
    if (typeof websiteData?.value?.video === "object") {
      const videoUrl = URL.createObjectURL(websiteData?.value?.video);
      console.log(videoUrl);
      return videoUrl;
    } else {
      return websiteData?.value?.video;
    }
  };
  return (
    <div
      className="border hover:border-gray-400 cursor-pointer"
      onClick={() => setIsOpen("value")}
    >
      <div className="value_container " id="value">
        <div className="value_content">
          <h1 className="value_heading">{websiteData?.value?.title}</h1>
          <p>{websiteData?.value?.description}</p>
        </div>

        <div className="value_media" id="media">
          <div className="video_box">
            <div className="video-heading">
              <h1>{websiteData?.value?.TVName}</h1>
              <div className="lines">
                <span className="bold_line"></span>
                <span className="light_line"></span>
              </div>
              <small>
                <img
                  src="https://kara.siher.eth.limo/images/Powered%20by%20Livepeer.png"
                  alt=""
                />
              </small>
            </div>
            <div className="video">
              {/* <iframe
                src={websiteData?.value?.video}
                frameborder="0"
                allowfullscreen
                allow="autoplay; encrypted-media; picture-in-picture;cover"
                sandbox="allow-same-origin allow-scripts"
                width="100"
                height="100"
              ></iframe> */}
              <video className="h-full w-full rounded-lg" controls>
                <source src={renderVideo()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="value_links">
          {websiteData?.value?.links?.map((value, index) => (
            <a href={value?.link}> {value.title}</a>
          ))}
          {/* <a href=""> WeAreSi3</a>
        <a href="">Unlocking NFT´s for Meta Impact</a>
        <a href="">Diversity in the New Economy</a> */}
        </div>
        <div className="pay_btns">
          <button className="support">{websiteData?.value?.buttonText}</button>
          {/* <button className="Rupay">
          <img src={rupay} alt="" />
        </button> */}
        </div>
      </div>
    </div>
  );
}

export default Value;
