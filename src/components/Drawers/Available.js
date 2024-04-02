import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
function AvailableFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);

  const dispatch = useDispatch();
  const handleDeleteMarque = (index) => {
    const updatedAvailableData = { ...websiteData.available };
    updatedAvailableData.marque = updatedAvailableData.marque?.filter(
      (_, i) => i !== index
    );
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };
  const handleMarqueInputChange = (index, field, value) => {
    const updatedMarque = websiteData?.available?.marque.map((marque, idx) => {
      if (idx === index) {
        return {
          ...marque,
          [field]: value,
        };
      }
      return marque;
    });
    const updatedAvailableData = {
      ...websiteData?.available,
      marque: updatedMarque,
    };
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };
  const handleInputChange = (fieldName, value) => {
    const updatedAvailableData = { ...websiteData.available };
    updatedAvailableData[fieldName] = value;
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };

  const handleAddMarque = () => {
    const updatedAvailableData = { ...websiteData.available };
    const updatedMarque = [
      ...updatedAvailableData.marque,
      { heading: "", image: "eye_logo.png" },
    ];
    updatedAvailableData.marque = updatedMarque;
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };

  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Available Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-10">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Title</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="I’M AVAILABLE FOR"
                required
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Marque</p>
            {websiteData?.available?.marque?.map((item, index) => {
              return (
                <div className="w-full flex items-center gap-4 " key={index}>
                  <input
                    value={item?.heading}
                    type="text"
                    id="hashTagTitle"
                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                    placeholder="EQUITY"
                    required
                    onChange={(e) =>
                      handleMarqueInputChange(index, "heading", e.target.value)
                    }
                  />
                  <RiDeleteBinLine
                    onClick={() => handleDeleteMarque(index)}
                    className={`mt-2 text-xl text-red-500 cursor-pointer`}
                  />
                </div>
              );
            })}
            <div
              className="flex items-center gap-2 mt-6 cursor-pointer "
              onClick={handleAddMarque}
            >
              <FaCirclePlus className="text-[#EEA941] text-lg" />
              <p className="text-sm">Add Marque</p>
            </div>
          </div>
          {/* <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Description</p>
            <div className="w-full">
              <textarea
                value={websiteData?.available?.description}
                type="text"
                id="description"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="& I CREATE EQUITABLE PLATFORMS FOR THE NEW ECONOMY."
                required
                rows={8}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div> */}
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">linkedin</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.linkedin?.url}
                type="text"
                id="linkedin"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write here..."
                required
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Instagram</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.instagram?.url}
                type="text"
                id="instagram"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write here..."
                required
                onChange={(e) => handleInputChange("instagram", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 ">
            <p className="text-xs font-semibold text-gray-600">Twitter</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.twitter?.url}
                type="text"
                id="twitter"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write  here..."
                required
                onChange={(e) => handleInputChange("twitter", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">Email</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.email?.address}
                type="text"
                id="email"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write email here..."
                required
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AvailableFields;
