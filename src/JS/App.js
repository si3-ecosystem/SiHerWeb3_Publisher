import "../CSS/App.css";
import "../CSS/responsive.css";
import React from "react";
import Error from "../components/404/Error";
import "react-modern-drawer/dist/index.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "../components/PrivateRoutes/index.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import Preview from "../pages/Preview.js";
import Register from "../pages/Register.js";
import { Toaster } from "react-hot-toast";
import PreviewWebPage from "../components/preview/index.js";
function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Routes>
                <Route path="" element={<PrivateRoutes />}>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/preview" element={<PreviewWebPage />} />
                </Route>
              </Routes>
            </>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {/* <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/verify-otp/:id/:token" element={<OTP />} />
        <Route
          path="/auth/reset-password/:id/:token"
          element={<ChangePassword />}
        /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
