import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

function FileUpload({ image, handleDeleteImage, handleAddImage }) {
  const [hovered, setHovered] = useState(false);

  const handleBoxClick = () => {
    document.getElementById("file-input").click();
  };

  const renderImage = () => {
    if (typeof image === "object") {
      const imageUrl = URL.createObjectURL(image);
      return imageUrl;
    } else {
      return image;
    }
  };

  return (
    <div className="relative w-36 h-36  cursor-pointer border border-gray-400 rounded-lg">
      <div className="absolute bg-red-500 rounded-full -top-4 -right-4 p-2 cursor-pointer">
        <RiDeleteBinLine
          className={`text-sm text-white `}
          onClick={handleDeleteImage}
        />
      </div>

      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          handleAddImage(e);
        }}
      />

      <figure
        className={`transition-all duration-300 flex items-center justify-center h-full ${
          hovered ? "filter grayscale hover:grayscale-0" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a href="#">
          <img
            className="rounded-lg object-cover w-full h-full"
            src={renderImage()} // Use the rendered image URL
            alt="image description"
          />
        </a>
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-center" onClick={handleBoxClick}>
              <p className="text-xs">UPDATE IMAGE</p>
            </div>
          </div>
        )}
      </figure>
    </div>
  );
}

export default FileUpload;
