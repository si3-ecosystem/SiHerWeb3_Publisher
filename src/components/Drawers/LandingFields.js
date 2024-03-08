import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
function LandingFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const dispatch = useDispatch();
  const handleDeleteImage = () => {
    const updatedLandingData = { ...websiteData.landing };
    updatedLandingData.userimg = null;
    console.log(updatedLandingData);
    dispatch(
      handleWebsiteData({ ...websiteData, landing: updatedLandingData })
    );
  };
  const handleAddImage = (e) => {
    if (e.target.files.length > 0) {
      const updatedLandingData = { ...websiteData.landing };
      updatedLandingData.userimg = e.target.files[0];
      dispatch(
        handleWebsiteData({ ...websiteData, landing: updatedLandingData })
      );
    }
  };
  const handleInputChange = (fieldName, value) => {
    const updatedLandingData = { ...websiteData.landing };
    updatedLandingData[fieldName] = value;
    dispatch(
      handleWebsiteData({ ...websiteData, landing: updatedLandingData })
    );
  };
  const handleDeleteTag = (index) => {
    const updatedLanding = { ...websiteData.landing };
    console.log(updatedLanding);
    updatedLanding.hashTags = updatedLanding.hashTags.filter(
      (_, i) => i !== index
    );
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleAddTag = () => {
    const updatedLanding = { ...websiteData.landing };
    const updatedHashTags = [...updatedLanding.hashTags, ""];
    updatedLanding.hashTags = updatedHashTags;
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleUpdateTag = (index, newValue) => {
    const updatedHashTags = websiteData?.landing?.hashTags?.map((tag, idx) => {
      if (idx === index) {
        return newValue;
      }
      return tag;
    });

    const updatedLanding = {
      ...websiteData.landing,
      hashTags: updatedHashTags,
    };
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleCategoryInputChange = (index, field, value) => {
    const updatedCategories = websiteData?.landing?.categories.map(
      (category, idx) => {
        if (idx === index) {
          return {
            ...category,
            [field]: value,
          };
        }
        return category;
      }
    );
    const updatedLanding = {
      ...websiteData?.landing,
      categories: updatedCategories,
    };
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleCategoryObject = (index) => {
    const updatedLanding = { ...websiteData.landing };
    console.log(updatedLanding);
    updatedLanding.categories = updatedLanding.categories.filter(
      (_, i) => i !== index
    );
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleAddCategory = () => {
    const updatedLanding = { ...websiteData.landing };
    const updatedCategories = [...updatedLanding.categories, ""];
    updatedLanding.categories = updatedCategories;
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };

  const handleUpdateMarque = (index, newValue) => {
    const updatedMarque = websiteData?.landing?.marquee?.map((tag, idx) => {
      if (idx === index) {
        return newValue;
      }
      return tag;
    });

    const updatedLanding = {
      ...websiteData.landing,
      marquee: updatedMarque,
    };
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleDeleteMarque = (index) => {
    const updatedLanding = { ...websiteData.landing };
    console.log(updatedLanding);
    updatedLanding.marquee = updatedLanding.marquee.filter(
      (_, i) => i !== index
    );
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const handleAddMarque = () => {
    const updatedLanding = { ...websiteData.landing };
    const updatedMarque = [...updatedLanding.marquee, ""];
    updatedLanding.marquee = updatedMarque;
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Landing Section</p>
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
                value={websiteData?.landing?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="I’M KARA,"
                required
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Sub title</p>
            <div className="w-full">
              <textarea
                value={websiteData?.landing?.subTitle}
                type="text"
                id="subTitle"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="& I CREATE EQUITABLE PLATFORMS FOR THE NEW ECONOMY."
                required
                rows={4}
                onChange={(e) => handleInputChange("subTitle", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">HashTag Title</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.hashTagTitle}
                type="text"
                id="hashTagTitle"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="WHAT I STAND FOR:"
                required
                onChange={(e) =>
                  handleInputChange("hashTagTitle", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Tags</p>
            {websiteData?.landing?.hashTags?.map((item, index) => {
              return (
                <div className="w-full flex items-center gap-4 " key={index}>
                  <input
                    value={item}
                    type="text"
                    id="hashTagTitle"
                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                    placeholder="EQUITY"
                    required
                    onChange={(e) => handleUpdateTag(index, e.target.value)}
                  />
                  <RiDeleteBinLine
                    onClick={() => handleDeleteTag(index)}
                    className={`mt-2 text-xl text-red-500 cursor-pointer`}
                  />
                </div>
              );
            })}
            <div
              className="flex items-center gap-2 mt-6 cursor-pointer "
              onClick={handleAddTag}
            >
              <FaCirclePlus className="text-[#EEA941] text-lg" />
              <p className="text-sm">Add Tag</p>
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Categories</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-8 space-y-4 ">
                    {websiteData?.landing?.categories?.map((item, index) => {
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
                                  {item?.title}
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
                                      handleCategoryInputChange(
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
                                  Text
                                </p>
                                <div className="w-full">
                                  <input
                                    value={item?.text}
                                    type="text"
                                    id="subTitle"
                                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                    placeholder="Write text"
                                    required
                                    onChange={(e) =>
                                      handleCategoryInputChange(
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
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold mb-4">Image</p>
            {websiteData?.landing?.userimg ? (
              <FileUpload
                image={websiteData?.landing?.userimg}
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
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Name</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.name}
                type="text"
                id="name"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Kara Howard"
                required
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Pronoun</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.pronoun}
                type="text"
                id="pronoun"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="SI HER"
                required
                onChange={(e) => handleInputChange("pronoun", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">Marquee</p>
            {websiteData?.landing?.marquee?.map((item, index) => {
              return (
                <div className="w-full flex items-center gap-4 " key={index}>
                  <input
                    value={item}
                    type="text"
                    id="hashTagTitle"
                    class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                    placeholder="Write here..."
                    required
                    onChange={(e) => handleUpdateMarque(index, e.target.value)}
                  />
                  <RiDeleteBinLine
                    onClick={() => handleDeleteMarque(index)}
                    className={`mt-2 text-xl text-red-500  cursor-pointer`}
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
        </form>
      </div>
    </div>
  );
}

export default LandingFields;
