import React from "react";
import NavbarFields from "../Drawers/NavbarFields";
import LandingFields from "../Drawers/LandingFields";
import MyValueFields from "../Drawers/MyValueFields";
import VisionFields from "../Drawers/VisionFields";
import MyCVFields from "../Drawers/CVFields";
import AvailableFields from "../Drawers/Available";
import LiveFields from "../Drawers/LiveFields";

function DynamicComponent({ isOpen, toggleDrawer }) {
  const renderComponent = () => {
    switch (isOpen) {
      case "navbar":
        return <NavbarFields toggleDrawer={toggleDrawer} />;
      case "landing":
        return <LandingFields toggleDrawer={toggleDrawer} />;
      case "value":
        return <MyValueFields toggleDrawer={toggleDrawer} />;
      case "live":
        return <LiveFields toggleDrawer={toggleDrawer} />;
      // case "vision":
      //   return <VisionFields toggleDrawer={toggleDrawer} />;
      case "CV":
        return <MyCVFields toggleDrawer={toggleDrawer} />;
      case "available":
        return <AvailableFields toggleDrawer={toggleDrawer} />;
      default:
        return null;
    }
  };

  return renderComponent();
}

export default DynamicComponent;
