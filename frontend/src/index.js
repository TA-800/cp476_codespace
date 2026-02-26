/*bootstrap for React start*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/*creates react root*/
const root = ReactDOM.createRoot(document.getElementById("root"));

/*renders app components*/
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);