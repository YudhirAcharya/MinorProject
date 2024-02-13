const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      // console.log(action.payload);
      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
      };
    case "GET_SORT_VALUE": {
      // let userSortValue = document.getElementById("sort");
      // let sortValue = userSortValue.options[userSortValue.selectedIndex].value;
      // console.log(sortValue);
      return {
        ...state,
        sortingValue: action.payload,
      };
    }
    case "SORTING_PRODUCTS": {
      let newSortData;
      // let tempSortData = [...action.payload];
      const { filterProducts, sortingValue } = state;
      let tempSortData = [...filterProducts];

      const sortingProducts = (a, b) => {
        if (sortingValue === "lowest") {
          return a.price - b.price;
        }
        if (sortingValue === "highest") {
          return b.price - a.price;
        }
        if (sortingValue === "time_lowest") {
          return a.TotalTimeInMins - b.TotalTimeInMins;
        }
        if (sortingValue === "a-z") {
          return a.TranslatedRecipeName.localeCompare(b.TranslatedRecipeName);
        }
        if (sortingValue === "z-a") {
          return b.TranslatedRecipeName.localeCompare(a.TranslatedRecipeName);
        }
      };

      newSortData = tempSortData.sort(sortingProducts);

      return {
        ...state,
        filterProducts: [...newSortData],
      };
    }
    default:
      return state;
  }
};

export default filterReducer;