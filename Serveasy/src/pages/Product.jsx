import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiShoppingCart } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { useParams, NavLink } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import PageNavigation from "../components/PageNavigation";
import CartAmountToggle from "../components/CartAmountToggle";
import { useCartContext } from "../context/cartContext";
const API = "http://127.0.0.1:3001/foods/";
const Product = () => {
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrease = () => {
    setAmount(amount + 1);
  };
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  // console.log(isSingleLoading, singleProduct);
  const { FoodID } = useParams();
  const {
    CleanedIngredients,
    Cuisine,
    TotalTimeInMins,
    TranslatedRecipeName,
    imageurl,
    price,
  } = singleProduct;
  useEffect(() => {
    // console.log(`${API}/${FoodID}`);
    getSingleProduct(`${API}${FoodID}`);
  }, []);
  // console.log(id);
  if (isSingleLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <PageNavigation title={TranslatedRecipeName} />
      <section className="flex flex-col justify-between lg:flex-row pt-5 px-4 gap-12 bg-white">
        <div className="flex flex-col gap-2 lg:w-3/4">
          {/* main image */}
          <img
            src={imageurl}
            alt={TranslatedRecipeName}
            className="w-full h-[80%] aspect-square object-cover rounded-xl"
          />
          {/* Div for alternate images */}
          <div></div>
        </div>
        <div className="flex flex-col gap-4 p-5 pt-0 lg:w-2/4">
          <div>
            <span className="text-primary font-semibold text-1xl">
              {Cuisine}
            </span>
            <h1 className="text-5xl font-bold uppercase">
              {TranslatedRecipeName}
            </h1>
          </div>
          <h6 className="text-2xl font-semibold mt-3">
            {`Time required to make: ` + TotalTimeInMins + ` minutes`}
          </h6>
          <p className="text-textColor font-normal">{`The ingredients used are:`}</p>
          <p className="text-textColor font-normal">{`${CleanedIngredients}.`}</p>
          <h6 className="text-4xl font-semibold text-warning mt-3">
            {`Rs. ` + price}
          </h6>
          <hr className="max-w-full w-[100%] border-[0.1rem] border-solid border-textColor" />
          <div className="mt-2">
            <div className="flex flex-row items-center py-1 rounded ">
              <CartAmountToggle
                amount={amount}
                setDecrease={setDecrease}
                setIncrease={setIncrease}
              />
            </div>
            <NavLink
              // to="/user-home"
              onClick={() => {
                toast.success("🍕 Foods added to cart", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                addToCart(
                  FoodID,
                  TranslatedRecipeName,
                  imageurl,
                  price,
                  amount,
                  singleProduct
                );
              }}
            >
              <button className="flex items-center gap-4 justify-center bg-warning py-2 w-full text-lightColor rounded-lg shadow mt-5 hover:bg-primary hover:text-textColor border-none">
                <GiShoppingCart className="text-[38px] " />
                <span className="font-semibold py-3 px-2 rounded-xl h-full">
                  Add to Cart
                </span>
              </button>
            </NavLink>
            <NavLink to="/Checkout">
              <button
                className="flex items-center gap-4 justify-center bg-warning py-2 w-full text-lightColor rounded-lg shadow mt-5 hover:bg-primary hover:text-textColor border-none"
                // onClick={handlePurchase}
                // value={buy}
              >
                <BiSolidPurchaseTag className="text-[38px] " />
                <span className="font-semibold py-3 px-2 rounded-xl h-full">
                  Buy Now
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Product;
