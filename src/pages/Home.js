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
import websiteData from "../DataFiles/6abc2.js";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { IFrame } from "../components/IFrame/iframe";
import DynamicComponent from "../components/DynamicComponent/index.js";
import { useDispatch } from "react-redux";
import { handleWebsiteData } from "../reducers/contentReducer.js";
import { Link, useNavigate } from "react-router-dom";
import { cssPaths } from "../utils/constants.js";
function Home(props) {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(screenWidth);
  const [iFrameHeight, setIFrameHeight] = useState("100vh");
  const [isOpen, setIsOpen] = React.useState("");
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const handleLoad = () => {
      const obj = document.querySelector("iframe");
      if (!obj) {
        return;
      }
      //   let dummy = document.head.getElementsByTagName("link");
      //   console.log(dummy);
      obj.contentDocument.head.append(
        document.head.getElementsByTagName("link")
      );
      if (obj) {
        const contentHeight =
          obj.contentWindow.document.body.scrollHeight + "px";
        setIFrameHeight(contentHeight);
      }
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getWebsiteContent = () => {
    try {
      dispatch(handleWebsiteData(websiteData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWebsiteContent();
  }, []);

  const initialContent = `<!DOCTYPE html><html><head></head><body><div id="root1"></div></body></html>`;
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
                  <HiOutlineComputerDesktop className="cursor-pointer text-xl" />
                  <SlScreenTablet className="cursor-pointer text-md" />
                  <PiDeviceTabletCameraThin className="cursor-pointer text-xl" />
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to="/preview" target="_blank">
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
                    type="button"
                    class="flex items-center focus:outline-none bg-black text-white border border-black hover:bg-gray-400  font-medium rounded-lg text-sm px-5 py-1.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Publish
                    <GoDotFill class="text-yellow-600 ms-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex mt-40 px-5  bg-[#d5d5e3]">
        <div className="w-4/5">
          {/* <Frame
            // initialContent={initialContent}
            mountTarget="#root1"
            style={{
              width: !isOpen ? "1240px" : "910px",
              height: iFrameHeight,
              overflow: "visible",
            }}
          > */}
          <IFrame
            // width={!isOpen ? "1240px" : "910px"}
            width={!isOpen ? `${screenWidth}px` : "910px"}
            height="1040px"
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
        >
          <DynamicComponent isOpen={isOpen} toggleDrawer={toggleDrawer} />
        </Drawer>
      </div>
    </div>
  );
}

export default Home;
