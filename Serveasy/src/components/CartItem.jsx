/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

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
  // const [qty, setQty] = useState(item.qty || 1);
  // console.log(qty);
  // const [{ cartItems }, dispatch] = useStateValue();

  // const cartDispatch = () => {
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: items,
  //   });
  // };

  // const updateQty = (action, id) => {
  //   if (action === "add") {
  //     setQty(qty + 1);
  //     cartItems.map((item) => {
  //       if (item.id === id) {
  //         item.qty += 1;
  //       }
  //       setFlag(flag + 1);
  //     });
  //     cartDispatch();
  //   } else {
  //     if (qty === 1) {
  //       items = cartItems.filter((item) => item.id !== id);
  //       setFlag(flag + 1);
  //       cartDispatch();
  //     } else {
  //       setQty(qty - 1);
  //       cartItems.map((item) => {
  //         if (item.id === id) {
  //           item.qty -= 1;
  //           setFlag(flag + 1);
  //         }
  //       });
  //       cartDispatch();
  //     }
  //   }
  // };
  // useEffect(() => {
  //   items = cartItems;
  // }, [qty, items]);

  // const setDecrease = () => {
  //   amount > 1 ? setAmount(amount - 1) : setAmount(1);
  // };
  // const setIncrease = () => {
  //   setAmount(amount + 1);
  // };
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
        <p className="text-sm block text-gray-100 font-bold">
          Rs.{price * amount}
        </p>
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
