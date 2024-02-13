/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer, createContext } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filterProducts: [],
  allProducts: [],
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  console.log(products);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, useFilterContext, FilterContextProvider };
