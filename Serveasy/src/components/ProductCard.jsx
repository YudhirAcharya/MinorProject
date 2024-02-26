import propTypes from "prop-types";
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineShopping,
} from "react-icons/ai";
// import Product from "../pages/Product";

import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";

const ProductCard = (singleProduct) => {
  // const navigate = useNavigate();
  const { id, img, name, price } = singleProduct;
  const { addToCart } = useCartContext();
  const amount = 1;
  // console.log(singleProduct);

  return (
    <div className="mb-auto w-full">
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
          <h3 className="font-medium">
            {name.length > 25
              ? name.substring(0, 25) + "..."
              : name}{" "}
          </h3>
          <div className="grid grid-cols-2 gap-1 align-items-center mt-4">
            <h3 className="text-2xl font-medium text-warning ">
              {`Rs.` + price}
            </h3>

            <button
              className="absolute border-none bottom-2.5 right-2 bg-warning text-lightColor text-[24px]  w-[50px] h-[50px] rounded-full flex justify-content-center items-center cursor-pointer pl-3 gap-1 hover:bg-primary hover:text-textColor"
              onClick={() => {
                addToCart(
                  id,
                  name,
                  img,
                  price,
                  amount,
                  singleProduct
                );
              }}
            >
              <AiOutlineShopping />
            </button>
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
