/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer, createContext } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filterProducts: [],
  allProducts: [],
  sortingValue: "a-z",
  filters: {
    text: "",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};
const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  // console.log(products);
  const [state, dispatch] = useReducer(reducer, initialState);

  // update filter values
  const updateFilterValues = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // to clear filters
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  // to sort products
  // console.log(products);
  useEffect(() => {
    {
      dispatch({ type: "FILTER_PRODUCTS" });
      dispatch({ type: "SORTING_PRODUCTS" });
    }
  }, [state.sortingValue, products, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
  return (
    <FilterContext.Provider
      value={{ ...state, sorting, updateFilterValues, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterContext, useFilterContext, FilterContextProvider };
