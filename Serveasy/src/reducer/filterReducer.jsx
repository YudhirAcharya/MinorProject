const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS": {
      // const specificData = [...action.payload];
      // const newData = specificData.filter((_, i) => i < 100);
      let priceArr = action.payload.map((curEl) => curEl.price);
      // 1st
      // console.log(Math.max.apply(null, priceArr));
      // 2nd
      // let maxprice = priceArr.reduce(
      //   (initialVal, curVal) => Math.max(initialVal, curVal),
      //   0
      // );
      // 3rd
      let maxPrice = Math.max(...priceArr);
      // console.log(maxPrice);
      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
        filters: {
          ...state.filters,
          maxPrice: maxPrice,
          price: maxPrice,
        },
      };
    }
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
    case "UPDATE_FILTERS_VALUE": {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }
    case "FILTER_PRODUCTS": {
      let { allProducts } = state;
      let tempFilterProduct = [...allProducts];
      const { text, price } = state.filters;
      // console.log(text);
      if (text) {
        tempFilterProduct = tempFilterProduct
          .filter((curEl) =>
            curEl.TranslatedRecipeName.toLowerCase().includes(text)
          )
          .filter((_, i) => i < 100);
        console.log(tempFilterProduct);
      }
      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curEl) => curEl.price === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curEl) => curEl.price <= price
        );
      }
      return {
        ...state,
        filterProducts: tempFilterProduct,
      };
    }
    case "CLEAR_FILTERS": {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };
    }
    default:
      return state;
  }
};

export default filterReducer;
