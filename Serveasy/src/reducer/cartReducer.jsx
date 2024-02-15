import { nanoid } from "nanoid";
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let {
        FoodID,
        TranslatedRecipeName,
        imageurl,
        price,
        amount,
        singleProduct,
      } = action.payload;
      // let existingProduct = state.cart.find(
      //   (curEl) => (curEl.order_id = FoodID + TranslatedRecipeName.slice(0, 5))
      // );
      // if (existingProduct) {
      //   let updateProduct = state.cart.map((curEl) => {
      //     if (curEl.order_id === FoodID + TranslatedRecipeName.slice(0, 5)) {
      //       let newAmount = curEl.amount + amount;
      //       return {
      //         ...curEl,
      //         amount: newAmount,
      //       };
      //     } else {
      //       return curEl;
      //     }
      //   });
      //   return {
      //     ...state,
      //     cart: updateProduct,
      //   };
      // } else {
      // console.log(singleProduct);
      let cartProduct = {
        order_id: nanoid(),
        food_name: TranslatedRecipeName,
        ingredients: singleProduct.CleanedIngredients,
        price,
        amount,
        delivery_time: singleProduct.TotalTimeInMins + 30,
        imageurl,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
      // }
    }
    case "REMOVE_ITEM": {
      let updatedCart = state.cart.filter(
        (curEl) => curEl.order_id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    // case "SHOW_CART": {
    //   // console.log(action.payload);
    //   return {
    //     ...state,
    //     cartShow: action.cartShow,
    //   };
    // }
    case "SET_DECREMENT": {
      let updatedProduct = state.cart.map((curEl) => {
        if (curEl.order_id === action.payload) {
          let decAmount = curEl.amount - 1;
          if (decAmount <= 0) {
            decAmount = 1;
          }
          return {
            ...curEl,
            amount: decAmount,
          };
        } else {
          return curEl;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    }
    case "SET_INCREMENT": {
      let updatedProduct = state.cart.map((curEl) => {
        if (curEl.order_id === action.payload) {
          let incAmount = curEl.amount + 1;

          return {
            ...curEl,
            amount: incAmount,
          };
        } else {
          return curEl;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    }
    case "CART_TOTAL_ITEM": {
      let updatedItemVal = state.cart.reduce((initialValue, curEl) => {
        let { amount } = curEl;
        initialValue = initialValue + amount;
        return initialValue;
      }, 0);
      return {
        ...state,
        totalItem: updatedItemVal,
      };
    }
    case "CART_TOTAL_PRICE": {
      let totalAmounts = state.cart.reduce((initialValue, curEl) => {
        let { price, amount } = curEl;
        initialValue = initialValue + price * amount;
        console.log(initialValue);
        return initialValue;
      }, 0);
      return {
        ...state,
        totalAmount: totalAmounts,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
