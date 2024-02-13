/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";

const AppContext = createContext();
const API = "http://127.0.0.1:3001/foods";
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      const products = data.data.rows;

      dispatch({ type: "MY_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // API call for individual product

  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const response = await fetch(url, { method: "GET" });
      const singleProduct = await response.json();
      console.log(singleProduct);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct[0] });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);
  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useProductContext };
