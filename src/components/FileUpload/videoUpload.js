import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

function VideoUpload({ video, handleDeleteImage }) {
  console.log(video);
  const [hovered, setHovered] = useState(false);

  const handleBoxClick = () => {
    document.getElementById("file-input").click();
  };

  const renderVideo = () => {
    if (typeof video === "object") {
      const videoUrl = URL.createObjectURL(video);
      console.log(videoUrl);
      return videoUrl;
    } else {
      return video;
    }
  };

  return (
    <div className="relative w-full h-44  cursor-pointer border border-gray-400 rounded-lg ">
      <div className="absolute bg-red-500 rounded-full -top-3 -right-3 p-2 cursor-pointer z-10">
        <RiDeleteBinLine
          className={`text-sm text-white `}
          onClick={handleDeleteImage}
        />
      </div>
      <figure
        className={`transition-all duration-300 flex items-center justify-center h-full ${
          hovered ? "filter grayscale hover:grayscale-0" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="h-full w-full relative">
          {/* <iframe
            src={renderVideo()}
            frameborder="0"
            allowfullscreen
            allow="autoplay; encrypted-media; picture-in-picture;cover"
            sandbox="allow-same-origin allow-scripts"
            width="100%"
            height="100%"
            className="rounded-lg"
            style={{ position: "absolute", top: 0, left: 0 }}
          ></iframe> */}
          <video className="h-full w-full rounded-lg" controls>
            <source src={renderVideo()} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </figure>
    </div>

    // <div className="relative w-full h-44  cursor-pointer border border-gray-400 rounded-lg">
    //   <div className="absolute bg-red-500 rounded-full -top-4 -right-4 p-2 cursor-pointer">
    //     <RiDeleteBinLine
    //       className={`text-sm text-white `}
    //       onClick={handleDeleteImage}
    //     />
    //   </div>

    //   <figure
    //     className={`transition-all duration-300 flex items-center justify-center h-full ${
    //       hovered ? "filter grayscale hover:grayscale-0" : ""
    //     }`}
    //     onMouseEnter={() => setHovered(true)}
    //     onMouseLeave={() => setHovered(false)}
    //   >
    //     <div className="h-full w-full relative">
    //       <iframe
    //         src={video}
    //         frameborder="0"
    //         allowfullscreen
    //         allow="autoplay; encrypted-media; picture-in-picture;cover"
    //         sandbox="allow-same-origin allow-scripts"
    //         width="100%"
    //         height="100%"
    //         style={{ position: "absolute", top: 0, left: 0 }}
    //       ></iframe>
    //     </div>
    //   </figure>
    // </div>
  );
}

export default VideoUpload;
