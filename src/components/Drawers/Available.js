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
            <p className="text-xs font-semibold text-gray-600">Marque</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-8 space-y-4 ">
                    {websiteData?.available?.marque?.map((item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div className="flex w-full items-center justify-between gap-3">
                          <div
                            key={index}
                            class="w-full transition-all duration-200 rounded-md bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                          >
                            <div>
                              <button
                                type="button"
                                id="question1"
                                data-state="closed"
                                class="flex items-center justify-between w-full px-3 py-2"
                                onClick={() => toggleAccordion(index)}
                              >
                                <span class="flex text-sm font-semibold text-black">
                                  {item?.heading}
                                </span>
                                <svg
                                  id="arrow1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className={`w-4 h-4 text-gray-400 transform transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                            <div
                              style={{ display: isOpen ? "block" : "none" }}
                              className=" pb-5  sm:pb-6"
                            >
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">
                                  Label
                                </p>
                                <div className="w-full">
                                  <input
                                    value={item?.heading}
                                    type="text"
                                    id="heading"
                                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                    placeholder="Write label"
                                    required
                                    onChange={(e) =>
                                      handleMarqueInputChange(
                                        index,
                                        "heading",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600 mb-4">
                                  Image
                                </p>
                                <div className="w-full">
                                  {item?.image ? (
                                    <FileUpload
                                      image={item.image}
                                      handleDeleteImage={handleDeleteImage}
                                      handleAddImage={handleAddImage}
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center w-full mt-4">
                                      <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-24 border border-[#E5E5EA] border-dashed rounded-lg cursor-pointer  hover:bg-[#fceed966] hover:border-[#F6D4A0] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                      >
                                        <div className="flex items-center justify-center pt-5 pb-6">
                                          <IoIosAddCircle className="text-gray-500" />
                                          <p className="ms-1 text-xs text-gray-500 dark:text-gray-400">
                                            ADD AN IMAGE
                                          </p>
                                        </div>
                                        <input
                                          id="dropzone-file"
                                          type="file"
                                          className="hidden"
                                          onChange={handleAddImage}
                                        />
                                      </label>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <RiDeleteBinLine
                            onClick={() => handleCategoryObject(index)}
                            className={` text-xl text-red-500 cursor-pointer`}
                          />
                        </div>
                      );
                    })}
                    <div
                      className="flex items-center gap-2 mt-6 cursor-pointer "
                      onClick={handleAddCategory}
                    >
                      <FaCirclePlus className="text-[#EEA941] text-lg" />
                      <p className="text-sm">Add Category</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div> */}
          <div className="flex flex-col items-start p-4 mt-4">
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
          </div>
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
            <p className="text-xs font-semibold text-gray-600">Hey</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.hey?.url}
                type="text"
                id="hey"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write here..."
                required
                onChange={(e) => handleInputChange("hey", e.target.value)}
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
