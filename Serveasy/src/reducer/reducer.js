export const actionType = {
  // SET_USER: "SET_USER",
  // SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};
export default reducer;
