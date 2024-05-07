import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { handleDeleteFile, handleUpload } from "../../utils/fileUploader";
import ReactSelect from "react-select";
function LandingFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  console.log(websiteData, "website data");
  const [openIndex, setOpenIndex] = useState(null);
  const [imageLoading, setImageLoading] = useState("");

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const dispatch = useDispatch();
  const handleDeleteImage = async () => {
    setImageLoading("File deleting. Please wait...");
    if (websiteData?.landing?.userimg?.id) {
      await handleDeleteFile(websiteData.landing.userimg.id);
    }
    const updatedLandingData = {
      ...websiteData.landing,
      userimg: { path: null, id: null },
    };
    dispatch(
      handleWebsiteData({
        ...websiteData,
        landing: updatedLandingData,
      })
    );
    setImageLoading("");
  };
  const handleAddImage = async (e) => {
    if (e.target.files.length > 0) {
      setImageLoading("  Uploading image. Please wait...");
      let result = await handleUpload(e.target.files[0], "image");
      const updatedLandingData = { ...websiteData.landing };
      updatedLandingData.userimg = { path: result?.imageUrl, id: result?._id };
      dispatch(
        handleWebsiteData({ ...websiteData, landing: updatedLandingData })
      );
      setImageLoading("");
    }
  };
  const handleInputChange = (fieldName, value) => {
    const updatedLandingData = { ...websiteData.landing };
    updatedLandingData[fieldName] = value;
    dispatch(
      handleWebsiteData({ ...websiteData, landing: updatedLandingData })
    );
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
  const handleCategoryArrayInputChange = (value, textIndex, categoryKey) => {
    let updatedCategories = {
      ...websiteData?.landing?.categories,
      [categoryKey]: websiteData?.landing?.categories[categoryKey].map(
        (text, INDEX) => {
          return INDEX === textIndex ? value : text;
        }
      ),
    };
    const updatedLanding = {
      ...websiteData?.landing,
      categories: updatedCategories,
    };

    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };

  const handleCategoryInputChange = (field, value) => {
    let updatedCategories = { ...websiteData?.landing?.categories };
    if (field === "region") {
      updatedCategories = {
        ...websiteData?.landing?.categories,
        region: value,
      };
    } else if (field === "organizationAffiliations") {
      updatedCategories = {
        ...websiteData?.landing?.categories,
        organizationAffiliations: value,
      };
    } else if (field === "communityAffiliations") {
      updatedCategories = {
        ...websiteData?.landing?.categories,
        communityAffiliations: value,
      };
    }

    const updatedLanding = {
      ...websiteData?.landing,
      categories: updatedCategories,
    };
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const addCategoryTag = (categoryKey, maxTags) => {
    const currentTags = websiteData?.landing?.categories[categoryKey];
    if (currentTags.length < maxTags) {
      const updatedCategories = {
        ...websiteData?.landing?.categories,
        [categoryKey]: [...currentTags, " "],
      };
      const updatedLanding = {
        ...websiteData?.landing,
        categories: updatedCategories,
      };
      dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
    }
  };
  const deleteCategoryTextIndex = (textIndex, categoryKey) => {
    if (websiteData?.landing?.categories[categoryKey].length === 1) {
      return;
    }
    const updatedCategories = {
      ...websiteData?.landing?.categories,
      [categoryKey]: websiteData?.landing?.categories[categoryKey].filter(
        (ITEM, INDEX) => INDEX !== textIndex
      ),
    };
    dispatch(
      handleWebsiteData({
        ...websiteData,
        landing: { ...websiteData?.landing, categories: updatedCategories },
      })
    );
  };

  const options = [
    { value: "North America", label: "North America" },
    { value: "South America", label: "South America" },
    { value: "Central America", label: "Central America" },
    { value: "Caribbean", label: "Caribbean" },
    { value: "Central & South Asia", label: "Central & South Asia" },
    { value: "Northeastern Asia", label: "Northeastern Asia" },
    { value: "Caribbean", label: "Caribbean" },
    { value: "Southeastern Asia", label: "Southeastern Asia" },
    { value: "Australia and Oceania", label: "Australia and Oceania" },
    { value: "Northern Europe", label: "Northern Europe" },
    { value: "Southern Europe", label: "Southern Europe" },
    { value: "Eastern Europe", label: "Eastern Europe" },
    { value: "Western Europe", label: "Western Europe" },
    { value: "Middle East", label: "Middle East" },
    { value: "Northern Africa", label: "Northern Africa" },
    { value: "Southern Africa", label: "Southern Africa" },
  ];
  console.log(websiteData?.landing);
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Headline Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-28">
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
            <p className="text-xs font-semibold text-gray-600">
              Impact Headline
            </p>
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
            <p className="text-xs font-semibold text-gray-600">Brand Pillars</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.hashTagTitle}
                type="text"
                disabled
                id="hashTagTitle"
                class="mt-3 cursor-not-allowed  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
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
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">
              Portal Categories:
            </p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-1 space-y-4 ">
                    {/* REGION */}
                    <div className="w-full">
                      <p className="text-xs text-start font-semibold mt-4 text-gray-600">
                        Region
                      </p>
                      <div className="">
                        <div className="w-full mt-2">
                          <ReactSelect
                            options={options}
                            placeholder={
                              websiteData?.landing?.categories?.region
                            }
                            onChange={(value) => {
                              console.log(value);
                              if (value.length === 0) {
                                return;
                              }
                              handleCategoryInputChange("region", value.value);
                            }}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SUPER POWER */}
                    <div className="w-full">
                      <p className="text-xs text-start font-semibold mt-4 text-gray-600">
                        Superpower
                      </p>
                      <>
                        {websiteData?.landing?.categories?.superPower?.map(
                          (item, textIndex) => {
                            return (
                              <div className="flex items-center gap-4">
                                <input
                                  value={item}
                                  type="text"
                                  id="hashTagTitle"
                                  class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                  placeholder="Write here..."
                                  required
                                  onChange={(e) =>
                                    handleCategoryArrayInputChange(
                                      e.target.value,
                                      textIndex,
                                      "superPower"
                                    )
                                  }
                                />
                                <RiDeleteBinLine
                                  onClick={() =>
                                    deleteCategoryTextIndex(
                                      textIndex,
                                      "superPower"
                                    )
                                  }
                                  className={`mt-2 text-xl text-red-500 cursor-pointer`}
                                />
                              </div>
                            );
                          }
                        )}
                        {websiteData?.landing?.categories.superPower?.length <
                          3 && (
                          <div
                            className="flex items-center gap-2 mt-6 cursor-pointer "
                            onClick={() => addCategoryTag("superPower", 3)}
                          >
                            <FaCirclePlus className="text-[#a020f0] text-lg" />
                            <p className="text-sm">Add Super Power</p>
                          </div>
                        )}
                      </>
                    </div>

                    {/* organizationAffiliations */}
                    <div className="w-full">
                      <p className="text-xs text-start font-semibold mt-4 text-gray-600">
                        Organization Affiliations
                      </p>
                      {websiteData?.landing?.categories?.organizationAffiliations?.map(
                        (item, textIndex) => {
                          return (
                            <div className="flex items-center gap-4">
                              <input
                                value={item}
                                type="text"
                                id="hashTagTitle"
                                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                placeholder="Write here..."
                                required
                                onChange={(e) =>
                                  handleCategoryArrayInputChange(
                                    e.target.value,
                                    textIndex,
                                    "organizationAffiliations"
                                  )
                                }
                              />
                              <RiDeleteBinLine
                                onClick={() =>
                                  deleteCategoryTextIndex(
                                    textIndex,
                                    "organizationAffiliations"
                                  )
                                }
                                className={`mt-2 text-xl text-red-500 cursor-pointer`}
                              />
                            </div>
                          );
                        }
                      )}

                      {websiteData?.landing?.categories.organizationAffiliations
                        ?.length < 2 && (
                        <div
                          className="flex items-center gap-2 mt-6 cursor-pointer "
                          onClick={() =>
                            addCategoryTag("organizationAffiliations", 2)
                          }
                        >
                          <FaCirclePlus className="text-[#a020f0] text-lg" />
                          <p className="text-sm">
                            Add Organization Affiliations
                          </p>
                        </div>
                      )}
                    </div>

                    {/* communityAffiliations */}
                    <div className="w-full">
                      <p className="text-xs text-start font-semibold mt-4 text-gray-600">
                      Community Affiliations
                      </p>
                      {websiteData?.landing?.categories?.communityAffiliations?.map(
                        (item, textIndex) => {
                          return (
                            <div className="flex items-center gap-4">
                              <input
                                value={item}
                                type="text"
                                id="hashTagTitle"
                                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                placeholder="Write here..."
                                required
                                onChange={(e) =>
                                  handleCategoryArrayInputChange(
                                    e.target.value,
                                    textIndex,
                                    "communityAffiliations"
                                  )
                                }
                              />
                              <RiDeleteBinLine
                                onClick={() =>
                                  deleteCategoryTextIndex(
                                    textIndex,
                                    "communityAffiliations"
                                  )
                                }
                                className={`mt-2 text-xl text-red-500 cursor-pointer`}
                              />
                            </div>
                          );
                        }
                      )}

                      {websiteData?.landing?.categories.communityAffiliations
                        ?.length < 5 && (
                        <div
                          className="flex items-center gap-2 mt-6 cursor-pointer "
                          onClick={() =>
                            addCategoryTag("communityAffiliations", 5)
                          }
                        >
                          <FaCirclePlus className="text-[#a020f0] text-lg" />
                          <p className="text-sm">
                            Add Community Affiliations
                          </p>
                        </div>
                      )}
                    </div>
                
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold mb-4">Image</p>
            {imageLoading ? (
              <div className="mt-5 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center px-1 py-2 leading-none rounded-full animate-pulse"
                  style={{ width: "65%" }}
                >
                  {imageLoading}
                </div>
              </div>
            ) : (
              <>
                {websiteData?.landing?.userimg?.path ? (
                  <FileUpload
                    image={websiteData?.landing?.userimg?.path}
                    handleDeleteImage={handleDeleteImage}
                    handleAddImage={handleAddImage}
                  />
                ) : (
                  <>
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
                    <span className="mt-6 text-xs text-red-500">
                      *Image must be .jpg, .jpeg, .png
                    </span>
                  </>
                )}
              </>
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
        </form>
      </div>
    </div>
  );
}

export default LandingFields;
