import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { StateProvider } from "../src/context/StateProvider.jsx";
// import { initialState } from "../src/context/initialState.js";
// import reducer from "../src/context/reducer";
import { AppProvider } from "./context/productContext.jsx";
// import { BrowserRouter as Router } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <StateProvider initialState={initialState} reducer={reducer}>
//       <App />
//     </StateProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
