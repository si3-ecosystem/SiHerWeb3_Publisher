import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import VideoUpload from "../FileUpload/videoUpload";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";

function MyCVFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const dispatch = useDispatch();
  const handleDeleteImage = () => {
    const updatedValueData = { ...websiteData.value };
    updatedValueData.video = null;
    dispatch(handleWebsiteData({ ...websiteData, value: updatedValueData }));
  };
  const handleAddVideo = (e) => {
    if (e.target.files.length > 0) {
      const updatedValueData = { ...websiteData.value };
      updatedValueData.video = e.target.files[0];
      dispatch(handleWebsiteData({ ...websiteData, value: updatedValueData }));
    }
  };
  const handleInputChange = (fieldName, value) => {
    const updatedMyValueData = { ...websiteData.CV };
    updatedMyValueData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, CV: updatedMyValueData }));
  };
  const handleHighlightsYear = (index, field, value) => {
    const updatedHighlights = websiteData?.CV?.highlights.map(
      (highlight, idx) => {
        if (idx === index) {
          return {
            ...highlight,
            [field]: value,
          };
        }
        return highlight;
      }
    );
    const updatedCVHighlights = {
      ...websiteData?.CV,
      highlights: updatedHighlights,
    };
    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCVHighlights }));
  };
  const handleDeleteHighlights = (index) => {
    const updatedCVHighlights = { ...websiteData.CV };
    updatedCVHighlights.highlights = updatedCVHighlights.highlights.filter(
      (_, i) => i !== index
    );
    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCVHighlights }));
  };
  const handleAddHighlights = () => {
    const updatedCVHighlights = { ...websiteData.CV };
    const updatedHighlights = [...updatedCVHighlights.highlights, ""];
    updatedCVHighlights.highlights = updatedHighlights;
    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCVHighlights }));
  };
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">My CV Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" onC />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-10">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Title</p>
            <div className="w-full">
              <input
                value={websiteData?.CV?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write title here..."
                required
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">Links</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-8 space-y-4 ">
                    {websiteData?.CV?.highlights?.map((item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div
                          key={index}
                          className="flex w-full items-center justify-between gap-3"
                        >
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
                                  {item?.year?.length > 25
                                    ? item?.year.slice(0, 25) + "..."
                                    : item?.year}
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
                                  Year
                                </p>
                                <div className="w-full">
                                  <input
                                    value={item?.year}
                                    type="text"
                                    id="year"
                                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                    placeholder="Write year here..."
                                    required
                                    onChange={(e) =>
                                      handleHighlightsYear(
                                        index,
                                        "year",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">
                                  Text
                                </p>
                                <div className="w-full">
                                  <textarea
                                    value={item?.text}
                                    type="text"
                                    id="subTitle"
                                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                    placeholder="Write text here..."
                                    required
                                    rows={4}
                                    onChange={(e) =>
                                      handleHighlightsYear(
                                        index,
                                        "text",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <RiDeleteBinLine
                            onClick={() => handleDeleteHighlights(index)}
                            className={` text-xl text-red-500 cursor-pointer`}
                          />
                        </div>
                      );
                    })}
                    {websiteData?.value?.links.length < 10 && (
                      <div
                        className="flex items-center gap-2 mt-6 cursor-pointer "
                        onClick={handleAddHighlights}
                      >
                        <FaCirclePlus className="text-[#EEA941] text-lg" />
                        <p className="text-sm">Add Highlight</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyCVFields;
