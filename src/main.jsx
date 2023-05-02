import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CityContextProvider } from "./context/cityContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CityContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CityContextProvider>
);
