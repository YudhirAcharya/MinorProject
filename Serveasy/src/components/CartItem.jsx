/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
// import { useDispatch } from "react-redux";

let items = [];
const CartItem = ({ item, setFlag, flag }) => {
  const [qty, setQty] = useState(item.qty || 1);
  console.log(qty);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
        }
        setFlag(flag + 1);
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };
  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-4">
      <img
        src={item?.img}
        alt={item?.name}
        className="w-20 h-20 max-w-[80px] rounded-full object-contain"
      />
      {/* Item Name Section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50 font-semibold">{item?.name}</p>
        <p className="text-sm block text-gray-100 font-bold">
          Rs.{parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* Item Button Section */}
      <div className="group flex ml-auto items-center gap-2 cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-textColor" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm  text-textColor flex items-center justify-center font-semibold">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-textColor" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
