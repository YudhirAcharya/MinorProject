import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../reducer/reducer";
import CartItem from "../components/CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    console.log(cartItems);
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      const price = Number(item.price);
      const qty = Number(item?.qty);
      return accumulator + price * qty;
    }, 0);
    setTot(totalPrice);
    // console.log(tot);
  }, [tot, flag, cartItems]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

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
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col ">
          {/* Cart Items Section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll example">
            {/* Cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* Cart Subtotal Section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-lighttextGray text-lg font-semibold">
                Sub Total
              </p>
              <p className="text-lighttextGray text-lg font-semibold">
                Rs. {tot}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg font-semibold">Delivery</p>
              <p className="text-gray-400 text-lg font-semibold">Rs. 50</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-bold">Total</p>
              <p className="text-gray-200 text-xl font-bold">Rs.{tot + 50}</p>
            </div>
          </div>

          {/* User logged in cha ki chaina tyo hisab le euta kun button dekhaune garna parcha yaha */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-1/3 p-2 rounded-full  bg-primary text-textColor text-lg my-4 hover:shadow-lg font-semibold  mx-[35%]"
          >
            Check Out
          </motion.button>
          {/* <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-1/3 p-2 rounded-full mx-[35%] bg-primary text-textColor font-semibold text-lg my-4 hover:shadow-lg "
          >
            Login to check out
          </motion.button> */}
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

// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { motion } from "framer-motion";
// import { RiRefreshFill } from "react-icons/ri";
// import { useState, useEffect } from "react";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";

// import { BiMinus, BiPlus } from "react-icons/bi";

// const CartContainer = () => {
//   const [{ cartShow, cartItems }, dispatch] = useStateValue();
//   const [flag, setFlag] = useState(1);
//   const [tot, setTot] = useState(0);

//   let items = [];

//   const [qty, setQty] = useState(1);

//   const cartDispatch = () => {
//     localStorage.setItem("cartItems", JSON.stringify(items));
//     dispatch({
//       type: actionType.SET_CARTITEMS,
//       cartItems: items,
//     });
//   };
//   const updateQty = (action, id) => {
//     if (action === "add") {
//       setQty(qty + 1);
//       cartItems.map((item) => {
//         if (item.id === id) item.qty += 1;
//         setFlag(flag + 1);
//       });
//       cartDispatch();
//     } else {
//       if (qty === 1) {
//         items = cartItems.filter((item) => item.id !== id);
//         setFlag(flag + 1);
//         cartDispatch();
//       } else {
//         setQty(qty - 1);
//         cartItems.map((item) => {
//           if (item.id === id) {
//             item.qty -= 1;
//             setFlag(flag + 1);
//           }
//         });
//         cartDispatch();
//       }
//     }
//   };
//   useEffect(() => {
//     items = cartItems;
//   }, [qty, items]);

//   const showCart = () => {
//     dispatch({
//       type: actionType.SET_CART_SHOW,
//       cartShow: !cartShow,
//     });
//   };

//   useEffect(() => {
//     let totalPrice = cartItems.reduce(function (accumulator, item) {
//       const price = Number(item.price);
//       const qty = Number(item?.qty) || 1;
//       return accumulator + price * qty;
//     }, 0);
//     setTot(totalPrice);
//     console.log(tot);
//   }, [tot, flag]);

//   const clearCart = () => {
//     dispatch({
//       type: actionType.SET_CARTITEMS,
//       cartItems: [],
//     });

//     localStorage.setItem("cartItems", JSON.stringify([]));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 400 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{
//         opacity: 0,
//         x: 400,
//       }}
//       className="w-full flex fixed top-0 md:right-[10%] md:left-[10%] md:w-[80%]  bg-lightColor drop-shadow-md flex-col h-screen z-[999]"
//     >
//       <div className="w-full flex items-center justify-between p-4 cursor-pointer">
//         <motion.div whiteTap={{ scale: 0.75 }} onClick={showCart}>
//           <MdOutlineKeyboardBackspace className="text-3xl text-textColor" />
//         </motion.div>
//         <p className="text-textColor text-lg font-semibold">Cart</p>
//         <motion.p
//           whileTap={{ scale: 0.75 }}
//           className="flex items-center gap-2 p-1 px-2 my-2 bg-primary rounded-md hover:shadow-md  cursor-pointer text-textColor text-base font-semibold"
//           onClick={clearCart}
//         >
//           Clear <RiRefreshFill />
//         </motion.p>
//       </div>
//       {/* Bottom Section */}
//       {cartItems && cartItems.length > 0 ? (
//         <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col ">
//           {/* Cart Items Section */}
//           <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll example">
//             {/* Cart Item */}
//             {cartItems &&
//               cartItems.map((item) => (
//                 /* eslint-disable react/prop-types */
//                 // /* eslint-disable react/prop-types */

//                 <div
//                   className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-4"
//                   key={item.id}
//                 >
//                   <img
//                     src={item?.img}
//                     alt={item?.name}
//                     className="w-20 h-20 max-w-[80px] rounded-full object-contain"
//                   />
//                   {/* Item Name Section */}
//                   <div className="flex flex-col gap-2">
//                     <p className="text-base text-gray-50 font-semibold">
//                       {item?.name}
//                     </p>
//                     <p className="text-sm block text-gray-100 font-bold">
//                       Rs.{parseFloat(item?.price) * qty}
//                     </p>
//                   </div>
//                   {/* Item Button Section */}
//                   <div className="group flex ml-auto items-center gap-2 cursor-pointer">
//                     <motion.div
//                       whileTap={{ scale: 0.75 }}
//                       onClick={() => updateQty("remove", item?.id)}
//                     >
//                       <BiMinus className="text-textColor" />
//                     </motion.div>

//                     <p className="w-5 h-5 rounded-sm  text-textColor flex items-center justify-center font-semibold">
//                       {qty}
//                     </p>

//                     <motion.div
//                       whileTap={{ scale: 0.75 }}
//                       onClick={() => updateQty("add", item?.id)}
//                     >
//                       <BiPlus className="text-textColor" />
//                     </motion.div>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           {/* Cart Subtotal Section */}
//           <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
//             <div className="w-full flex items-center justify-between">
//               <p className="text-lighttextGray text-lg font-semibold">
//                 Sub Total
//               </p>
//               <p className="text-lighttextGray text-lg font-semibold">
//                 Rs. {tot}
//               </p>
//             </div>
//             <div className="w-full flex items-center justify-between">
//               <p className="text-gray-400 text-lg font-semibold">Delivery</p>
//               <p className="text-gray-400 text-lg font-semibold">Rs. 50</p>
//             </div>

//             <div className="w-full border-b border-gray-600 my-2"></div>

//             <div className="w-full flex items-center justify-between">
//               <p className="text-gray-200 text-xl font-bold">Total</p>
//               <p className="text-gray-200 text-xl font-bold">Rs.{tot + 50}</p>
//             </div>
//           </div>

//           {/* User logged in cha ki chaina tyo hisab le euta kun button dekhaune garna parcha yaha */}
//           <motion.button
//             whileTap={{ scale: 0.8 }}
//             type="button"
//             className="w-1/3 p-2 rounded-full  bg-primary text-textColor text-lg my-4 hover:shadow-lg font-semibold  mx-[35%]"
//           >
//             Check Out
//           </motion.button>
//           {/* <motion.button
//             whileTap={{ scale: 0.8 }}
//             type="button"
//             className="w-1/3 p-2 rounded-full mx-[35%] bg-primary text-textColor font-semibold text-lg my-4 hover:shadow-lg "
//           >
//             Login to check out
//           </motion.button> */}
//         </div>
//       ) : (
//         <div className="w-full h-full flex flex-col items-center justify-center gap-6">
//           <img
//             src="public/images/empty.png"
//             className="w-300"
//             alt="empty cart"
//           />
//           <p className="text-xl text-textColor font-semibold">
//             Add some items to your cart
//           </p>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default CartContainer;
