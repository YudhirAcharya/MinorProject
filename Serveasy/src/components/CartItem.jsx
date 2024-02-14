/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

import { motion } from "framer-motion";

import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa6";

import { useCartContext } from "../context/cartContext";

const CartItem = ({
  order_id,
  food_name,
  ingredients,
  price,
  amount,
  delivery_time,
  imageurl,
}) => {
  const { removeItem, setDecrease, setIncrease } = useCartContext();

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-4">
      <img
        src={imageurl}
        alt={food_name}
        className="w-20 h-20 max-w-[80px] rounded-full object-contain"
      />
      {/* Item Name Section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50 font-semibold">{food_name}</p>
        <p className="text-sm block text-gray-100 font-bold">Rs.{price}</p>
      </div>
      {/* Item Button Section */}
      <div className="group flex ml-auto items-center gap-2 cursor-pointer">
        <CartAmountToggle
          amount={amount}
          setDecrease={() => setDecrease(order_id)}
          setIncrease={() => setIncrease(order_id)}
        />
      </div>
      <motion.div whileTap={{ scale: 0.75 }}>
        <button className="cursor-pointer ml-5 right-1 rounded-lg  text-2xl border-none">
          <FaTrash
            className="text-textColor"
            onClick={() => removeItem(order_id)}
          />
        </button>
      </motion.div>
    </div>
  );
};

export default CartItem;
