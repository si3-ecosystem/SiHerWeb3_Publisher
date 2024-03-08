import React from "react";
import ReactDOM from "react-dom/client";
import "./CSS/index.css";
import Rout from "./JS/router";
import reportWebVitals from "./JS/reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./JS/App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
