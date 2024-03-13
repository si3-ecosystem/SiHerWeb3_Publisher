import "../CSS/App.css";
import "../CSS/responsive.css";
import Landing from "../components/Landing/Landing";
import Value from "../components/Value/Value";
import Vision from "../components/Vision/Vision";
import CV from "../components/CV/CV";
import Available from "../components/Available/Available";
import Navbar from "../components/Navbar/Navbar";
import { GrHomeRounded } from "react-icons/gr";
import React, { Component, useEffect, useState } from "react";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { SlScreenTablet } from "react-icons/sl";
import { PiDeviceTabletCameraThin } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import Drawer from "react-modern-drawer";
import Frame from "react-frame-component";
import websiteContent from "../DataFiles/6abc2.js";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { IFrame } from "../components/IFrame/iframe";
import DynamicComponent from "../components/DynamicComponent/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  handleNewWebpage,
  handleWebsiteData,
} from "../reducers/contentReducer.js";
import { Link, useNavigate } from "react-router-dom";
import { cssPaths } from "../utils/constants.js";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
function Home() {
  const { websiteData, isNewWebpage } = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState("100%");
  console.log(screenWidth);
  const [mode, setMode] = useState("Publish");
  const [isOpen, setIsOpen] = React.useState("");
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleToggleView = (viewSize) => {
    setScreenWidth(viewSize);
  };
  const getWebsiteContent = async () => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get(`/api/webpage`);
      if (!data?.webpage || Object.keys(data.webpage).length === 0) {
        dispatch(handleWebsiteData(websiteContent));
        setGetLoading(false);
        return;
      }
      setMode("Update Changes");
      setGetLoading(false);
      dispatch(handleNewWebpage(false));
      dispatch(handleWebsiteData(data?.webpage));
    } catch (error) {
      setGetLoading(false);
      console.log(error);
      if (error.response.status === 404) {
        dispatch(handleWebsiteData(websiteContent));
        return;
      }

      console.log(error);
      toast.error("Server error. Please refresh the page");
    }
  };
  useEffect(() => {
    getWebsiteContent();
  }, []);
  const handlePublish = async () => {
    try {
      setLoading(true);
      const response = isNewWebpage
        ? await axiosInstance.post(`/api/webpage`, websiteData)
        : await axiosInstance.put(`/api/webpage`, websiteData);
      setLoading(false);
      toast.success(
        `Webpage ${isNewWebpage ? "created" : "updated"} successfully`
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error.response?.status === 400
          ? error.response.data
          : "Server error. Please try again!"
      );
    }
  };
  return (
    <div className="App">
      <nav className="border border-b-gray-400 fixed w-full top-0 bg-white z-10">
        <div class="w-full px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>

                <svg
                  class="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center gap-7">
                <div className="flex items-center">
                  <GrHomeRounded />
                  <div className="flex flex-col items-start ms-4">
                    <div>SI HER Talent Collective</div>
                    <div className="text-sm">Home</div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-[#DA486B] hover:opacity-70 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-center w-full sm:ml-6">
                <div class="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <HiOutlineComputerDesktop
                      onClick={() => handleToggleView("100%")}
                      className="cursor-pointer text-xl relative"
                    />
                    {screenWidth === "100%" && (
                      <div
                        style={{
                          borderBottom: "3px solid #EEA941",
                          paddingBottom: "5px",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <SlScreenTablet
                      onClick={() => handleToggleView("70%")}
                      className="cursor-pointer text-xl relative"
                    />
                    {screenWidth === "70%" && (
                      <div
                        style={{
                          borderBottom: "3px solid #EEA941",
                          paddingBottom: "5px",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <PiDeviceTabletCameraThin
                      onClick={() => handleToggleView("40%")}
                      className="cursor-pointer text-xl relative"
                    />
                    {screenWidth === "40%" && (
                      <div
                        style={{
                          borderBottom: "3px solid #EEA941",
                          paddingBottom: "5px",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to="/preview">
                <button
                  // onClick={() => navigate("/preview")}
                  type="button"
                  class="flex items-center focus:outline-none text-black border border-gray-600  hover:bg-gray-400  font-medium rounded-lg text-sm px-5 py-1.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <IoPlayOutline class="me-1 text-black" />
                  Preview
                </button>
              </Link>
              <div class="relative ml-3">
                <div>
                  <button
                    onClick={handlePublish}
                    type="button"
                    class="flex items-center justify-center gap-2 focus:outline-none bg-black text-white border border-black hover:bg-gray-400  font-medium rounded-lg text-sm px-5 py-1.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    {loading && (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class=" w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}

                    <p>{mode}</p>

                    <GoDotFill class="text-yellow-600 ms-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {getLoading ? (
        <div
          role="status"
          className="flex items-center justify-center h-full mt-96"
        >
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div
            className={`flex items-center justify-center mt-40 bg-[#d5d5e3] ${
              isOpen
                ? "w-[74%] transition-width duration-500"
                : "w-[100%] transition-width duration-500"
            }`}
          >
            <div
              className={`transition-width duration-500`}
              style={{ width: `${screenWidth}` }}
            >
              <IFrame
                // width={screenWidth}
                // setScreenWidth={setScreenWidth}
                width="100%" //910px
                // width={!isOpen ? `${screenWidth}px` : `${screenWidth - 400}px`} //910px
                height="775"
                cssFiles={[
                  cssPaths.index,
                  cssPaths.app,
                  cssPaths.responsive,
                  cssPaths.navbar,
                  cssPaths.landing,
                  cssPaths.value,
                  cssPaths.vision,
                  cssPaths.CV,
                  cssPaths.available,
                ]}
              >
                <Navbar setIsOpen={setIsOpen} />

                <Landing setIsOpen={setIsOpen} />
                <Value setIsOpen={setIsOpen} />
                <Vision setIsOpen={setIsOpen} />
                <CV setIsOpen={setIsOpen} />
                <Available setIsOpen={setIsOpen} />
              </IFrame>
            </div>
            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="right"
              size={350}
              enableOverlay={false}
              // zIndex={50}
            >
              <DynamicComponent isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </Drawer>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
