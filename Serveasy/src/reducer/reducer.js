export const actionType = {
  SET_CART_SHOW: "SET_CART_SHOW",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    default:
      return state;
  }
};
export default reducer;
