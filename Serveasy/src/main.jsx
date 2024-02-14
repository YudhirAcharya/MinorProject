import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "../src/context/StateProvider.jsx";
import { initialState } from "../src/context/initialState.js";
import reducer from "../src/reducer/reducer";
import { AppProvider } from "./context/productContext.jsx";
// import { BrowserRouter as Router } from "react-router-dom";
import { FilterContextProvider } from "./context/filterContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
// import { initialState } from "./context/initialState.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <StateProvider initialState={initialState} reducer={reducer}>
//       <App />
//     </StateProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </StateProvider>
  </React.StrictMode>
);
