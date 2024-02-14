// import { useEffect, useState } from "react";

import propTypes from "prop-types";
import { AiOutlineStar, AiFillStar, AiOutlineShopping } from "react-icons/ai";
// import Product from "../pages/Product";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { useProductContext } from "../context/productContext";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";
const ProductCard = (item) => {
  // console.log(item);
  // console.log(img, name, price, cuisine, ingredients);
  // const [{ cartItems }, dispatch] = useStateValue();
  // const [items, setItems] = useState([]);
  // const addToCart = () => {
  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: items,
  //   });
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  // };
  // useEffect(() => {
  //   addToCart();
  // }, [items]);

  // const navigate = useNavigate();
  const { id, img, name, price } = item;
  // const { addToCart } = useCartContext();
  // const amount = 1;
  // const FoodID = id;
  // const { singleProduct } = useProductContext();
  // const {
  //   CleanedIngredients,
  //   Cuisine,
  //   TotalTimeInMins,
  //   TranslatedRecipeName,
  //   imageurl,
  // } = singleProduct;

  return (
    <div>
      <div className="border border-gray-200 hover:border-gray-400 transition-transform rounded-lg relative">
        <NavLink to={`/product/${id}`}>
          <img
            className="w-full h-[200px] object-cover rounded-lg rounded-b-none"
            src={img}
            alt={name}
          />
        </NavLink>
        <div className="space-y-2 relative p-4">
          <div className="text-yellow-400 flex gap-[5px] text-[20px]">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 px-3 py-1">
          <h3 className="font-medium">{name}</h3>
          <div className="grid grid-cols-2 gap-1 align-items-center">
            <h3 className="text-2xl font-medium text-warning ">
              {`Rs.` + price}
            </h3>

            {/* <button
              className="absolute border-none bottom-2.5 right-2 bg-warning text-lightColor text-[28px] w-[100px] h-[50px] rounded-full flex justify-content-center items-center cursor-pointer pl-4 gap-1 hover:bg-primary hover:text-textColor"
              // onClick={() =>
              //   addToCart(
              //     FoodID,
              //     TranslatedRecipeName,
              //     imageurl,
              //     price,
              //     amount,
              //     singleProduct
              //   )
              // }
            >
              <AiOutlineShopping />
              <span className=" text-[14px]">Add</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  img: propTypes.string,
  name: propTypes.string,
  price: propTypes.number,
  cuisine: propTypes.string,
  ingredients: propTypes.string,
};

export default ProductCard;
