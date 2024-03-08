import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";

function VisionFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const handleDeleteImage = () => {
    const updatedNavbarData = { ...websiteData.navbar };
    updatedNavbarData.logo = null;
    dispatch(handleWebsiteData({ ...websiteData, navbar: updatedNavbarData }));
  };
  const handleAddImage = (e) => {
    if (e.target.files.length > 0) {
      const updatedNavbarData = { ...websiteData.navbar };
      updatedNavbarData.logo = e.target.files[0];
      dispatch(
        handleWebsiteData({ ...websiteData, navbar: updatedNavbarData })
      );
    }
  };
  const handleInputChange = (fieldName, value) => {
    const updatedVisionData = { ...websiteData.vision };
    updatedVisionData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, vision: updatedVisionData }));
  };
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">My Vision</p>
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
                value={websiteData?.vision?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Image alt text"
                required
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Description</p>
            <div className="w-full">
              <textarea
                value={websiteData?.vision?.description}
                type="text"
                id="description"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="SI HER"
                required
                rows={8}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VisionFields;
