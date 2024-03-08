import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import VideoUpload from "../FileUpload/videoUpload";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";

function MyValueFields({ toggleDrawer }) {
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
    const updatedMyValueData = { ...websiteData.value };
    updatedMyValueData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValueData }));
  };
  const handleLinkText = (index, field, value) => {
    const updatedLinks = websiteData?.value?.links.map((link, idx) => {
      if (idx === index) {
        return {
          ...link,
          [field]: value,
        };
      }
      return link;
    });
    const updatedMyValue = {
      ...websiteData?.value,
      links: updatedLinks,
    };
    dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValue }));
  };
  const handleDeleteLink = (index) => {
    const updatedMyValue = { ...websiteData.value };
    console.log(updatedMyValue);
    updatedMyValue.links = updatedMyValue.links.filter((_, i) => i !== index);
    dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValue }));
  };
  const handleAddLink = () => {
    const updatedMyValue = { ...websiteData.value };
    const updatedLinks = [...updatedMyValue.links, ""];
    updatedMyValue.links = updatedLinks;
    dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValue }));
  };
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">My Value Section</p>
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
                value={websiteData?.value?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write title here..."
                required
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Description</p>
            <div className="w-full">
              <textarea
                value={websiteData?.value?.description}
                type="text"
                id="description"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write description here..."
                required
                rows={8}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">TV Name</p>
            <div className="w-full">
              <input
                value={websiteData?.value?.TVName}
                type="text"
                id="TVName"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write tv name here..."
                required
                onChange={(e) => handleInputChange("TVName", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-sm font-semibold mb-4">VIDEO</p>
            {websiteData?.value?.video ? (
              <VideoUpload
                video={websiteData?.value?.video}
                handleDeleteImage={handleDeleteImage}
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
                      ADD AN VIDEO
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleAddVideo}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start p-4 mt-4 ">
            <p className="text-xs font-semibold text-gray-600">Links</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-8 space-y-4 ">
                    {websiteData?.value?.links?.map((item, index) => {
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
                                  {item?.title?.length > 25
                                    ? item?.title.slice(0, 25) + "..."
                                    : item?.title}
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
                                    value={item?.title}
                                    type="text"
                                    id="subTitle"
                                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                    placeholder="Write label"
                                    required
                                    onChange={(e) =>
                                      handleLinkText(
                                        index,
                                        "title",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">
                                  Link
                                </p>
                                <div className="w-full">
                                  <input
                                    value={item?.link}
                                    type="text"
                                    id="subTitle"
                                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                    placeholder="Write text"
                                    required
                                    onChange={(e) =>
                                      handleLinkText(
                                        index,
                                        "link",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <RiDeleteBinLine
                            onClick={() => handleDeleteLink(index)}
                            className={` text-xl text-red-500 cursor-pointer`}
                          />
                        </div>
                      );
                    })}
                    {websiteData?.value?.links.length < 3 && (
                      <div
                        className="flex items-center gap-2 mt-6 cursor-pointer "
                        onClick={handleAddLink}
                      >
                        <FaCirclePlus className="text-[#EEA941] text-lg" />
                        <p className="text-sm">Add Link</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">Button Text</p>
            <div className="w-full">
              <input
                value={websiteData?.value?.buttonText}
                type="text"
                id="buttonText"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write tv name here..."
                required
                onChange={(e) =>
                  handleInputChange("buttonText", e.target.value)
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyValueFields;
