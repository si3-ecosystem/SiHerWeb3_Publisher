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
  const handleSuperCategoryInputChange = (
    categoryIndex,
    field,
    value,
    textIndex
  ) => {
    const updatedCategories = websiteData?.landing?.categories.map(
      (category, idx) => {
        if (idx === categoryIndex) {
          // If the field is 'text' and the value is an array
          if (field === "text" && Array.isArray(category[field])) {
            // Create a copy of the array and update the specific index
            const updatedText = [...category[field]];
            updatedText[textIndex] = value;

            return {
              ...category,
              [field]: updatedText,
            };
          }
          // For non-array fields, update normally
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
  const AddSuperPowerTag = (categoryIndex) => {
    // Create a new array from the current categories
    const updatedCategories = websiteData?.landing?.categories.map(
      (category, idx) => {
        if (idx === categoryIndex) {
          // Check if the current category title is "Superpower"
          if (category.title === "Superpower") {
            // Ensure the text field is an array, initialize it if not
            const updatedText = Array.isArray(category.text)
              ? [...category.text]
              : [];

            // Add an empty string to the array only if the length is less than 3
            if (updatedText.length < 3) {
              updatedText.push("");
            }

            // Return the updated category with the new text array
            return {
              ...category,
              text: updatedText,
            };
          }
        }
        // Return the original category if it's not the Superpower category
        return category;
      }
    );

    // Create a new updated landing object
    const updatedLanding = {
      ...websiteData?.landing,
      categories: updatedCategories,
    };

    // Dispatch the updated websiteData with the new landing state
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };
  const deleteSuperpowerTextIndex = (categoryIndex, textIndex) => {
    // Update categories by mapping through them
    const updatedCategories = websiteData?.landing?.categories.map(
      (category, idx) => {
        if (
          idx === categoryIndex &&
          category.title === "Superpower" &&
          Array.isArray(category.text)
        ) {
          // Create a copy of the text array and remove the specified index
          const updatedText = [...category.text];
          updatedText.splice(textIndex, 1);
          // Return updated category
          return { ...category, text: updatedText };
        }
        // Return original category if conditions not met
        return category;
      }
    );

    // Dispatch the updated websiteData with the modified landing state
    dispatch(
      handleWebsiteData({
        ...websiteData,
        landing: { ...websiteData?.landing, categories: updatedCategories },
      })
    );
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
        <p className="text-lg font-semibold">Landing Section</p>
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
                  {/* <RiDeleteBinLine
                    onClick={() => handleDeleteTag(index)}
                    className={`mt-2 text-xl text-red-500 cursor-pointer`}
                  /> */}
                </div>
              );
            })}
            {/* <div
              className="flex items-center gap-2 mt-6 cursor-pointer "
              onClick={handleAddTag}
            >
              <FaCirclePlus className="text-[#EEA941] text-lg" />
              <p className="text-sm">Add Tag</p>
            </div> */}
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">
              Portal Categories:
            </p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-1 space-y-4 ">
                    {websiteData?.landing?.categories?.map((item, index) => {
                      return (
                        <div className="w-full " key={index}>
                          <p className="text-xs text-start font-semibold mt-4 text-gray-600">
                            {item?.title}
                          </p>
                          <div className="">
                            {item.title === "Region" ? (
                              <div className="w-full mt-2">
                                <ReactSelect
                                  options={options}
                                  value={websiteData?.landing?.categories?.map(
                                    (val) =>
                                      options.find(
                                        (option) => option.value === val.text
                                      )
                                  )}
                                  onChange={(value) => {
                                    if (value.length === 0) {
                                      return;
                                    }
                                    handleCategoryInputChange(
                                      index,
                                      "text",
                                      value.value
                                    );
                                  }}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                />
                              </div>
                            ) : (
                              <>
                                {item.title === "Superpower" ? (
                                  <>
                                    {item.text?.map((item, textIndex) => {
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
                                              handleSuperCategoryInputChange(
                                                index, // category index
                                                "text", // field name
                                                e.target.value, // new value
                                                textIndex // text array index
                                              )
                                            }
                                          />
                                          <RiDeleteBinLine
                                            onClick={() =>
                                              deleteSuperpowerTextIndex(
                                                index,
                                                textIndex
                                              )
                                            }
                                            className={`mt-2 text-xl text-red-500 cursor-pointer`}
                                          />
                                        </div>
                                      );
                                    })}
                                    {websiteData?.landing?.categories[1].text
                                      ?.length < 3 && (
                                      <div
                                        className="flex items-center gap-2 mt-6 cursor-pointer "
                                        onClick={() => AddSuperPowerTag(index)}
                                      >
                                        <FaCirclePlus className="text-[#EEA941] text-lg" />
                                        <p className="text-sm">
                                          Add Super Power
                                        </p>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <input
                                      value={item.text}
                                      type="text"
                                      id="hashTagTitle"
                                      class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                      placeholder="Write here..."
                                      required
                                      onChange={(e) =>
                                        handleCategoryInputChange(
                                          index,
                                          "text",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </>
                                )}
                              </>
                            )}
                          </div>

                          {/* <RiDeleteBinLine
                            onClick={() => handleCategoryObject(index)}
                            className={`mt-2 text-xl text-red-500 cursor-pointer`}
                          /> */}
                        </div>
                      );
                    })}
                    {/* <div
                      className="flex items-center gap-2 mt-6 cursor-pointer "
                      onClick={handleAddCategory}
                    >
                      <FaCirclePlus className="text-[#EEA941] text-lg" />
                      <p className="text-sm">Add Portal Categories</p>
                    </div> */}
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
                <span className="mt-6 text-xs text-red-500">
                  *Image must be .jpg, .jpeg, .png
                </span>
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

          {/* <div className="flex flex-col items-start p-4 mt-4 mb-20">
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
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default LandingFields;
