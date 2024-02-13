/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer, createContext } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filterProducts: [],
  allProducts: [],
  sortingValue: "a-z",
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  // console.log(products);
  const [state, dispatch] = useReducer(reducer, initialState);

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };
  // to sort products
  // console.log(products);
  useEffect(() => {
    {
      dispatch({ type: "SORTING_PRODUCTS" });
    }
  }, [state.sortingValue, products]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider value={{ ...state, sorting }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, useFilterContext, FilterContextProvider };
