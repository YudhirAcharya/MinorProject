import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
// import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../reducer/reducer";
import CartItem from "../components/CartItem";
import { useCartContext } from "../context/cartContext";
import { NavLink } from "react-router-dom";
const CartContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const { cart, clearCart, totalAmount, deliveryFee } = useCartContext();
  // console.log(cart);
  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: 400,
      }}
      className="w-full flex fixed top-0 md:right-[10%] md:left-[10%] md:w-[80%]  bg-lightColor drop-shadow-md flex-col h-screen z-[999]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whiteTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-textColor" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-primary rounded-md hover:shadow-md  cursor-pointer text-textColor text-base font-semibold"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* Bottom Section */}
      {cart && cart.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col ">
          {/* Cart Items Section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll example">
            {/* Cart Item */}
            {cart &&
              cart.map((curEl) => <CartItem key={curEl.id} {...curEl} />)}
          </div>

          {/* Cart Subtotal Section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-lighttextGray text-lg font-semibold">
                Sub Total
              </p>
              <p className="text-lighttextGray text-lg font-semibold">
                Rs.{totalAmount}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg font-semibold">Delivery</p>
              <p className="text-gray-400 text-lg font-semibold">
                Rs. {deliveryFee}
              </p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-bold">Total</p>
              <p className="text-gray-200 text-xl font-bold">
                Rs.{totalAmount + deliveryFee}
              </p>
            </div>
          </div>

          {/* User logged in cha ki chaina tyo hisab le euta kun button dekhaune garna parcha yaha */}
          <NavLink to="/Checkout">
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-1/3 p-2 rounded-full  bg-primary text-textColor text-lg my-2 hover:shadow-lg font-semibold  mx-[35%]"
            >
              Check Out
            </motion.button>
          </NavLink>
          <NavLink to="/schedule-meal">
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-1/3 p-2 rounded-full mx-[35%] bg-primary text-textColor font-semibold text-lg  hover:shadow-lg "
            >
              Schedule Meal
            </motion.button>
          </NavLink>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img
            src="public/images/empty.png"
            className="w-300"
            alt="empty cart"
          />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
