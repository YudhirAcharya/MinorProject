/* eslint-disable react/prop-types */
// import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <>
      <motion.div whileTap={{ scale: 0.75 }}>
        <button
          className="cursor-pointer px-5 rounded-lg  text-3xl border-none"
          onClick={() => setDecrease()}
        >
          <BiMinus className="text-textColor" />
        </button>
      </motion.div>
      <span className="px-6 py-4 rounded-md text-textColor flex items-center justify-center font-semibold ">
        {amount}
      </span>
      <motion.div whileTap={{ scale: 0.75 }}>
        <button
          className="cursor-pointer px-5 rounded-lg  text-3xl border-none"
          onClick={() => setIncrease()}
        >
          <BiPlus className="text-textColor" />
        </button>
      </motion.div>
    </>
  );
};

export default CartAmountToggle;
