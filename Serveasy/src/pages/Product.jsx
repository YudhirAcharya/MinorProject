import { useEffect, useState } from "react";

import { GiShoppingCart } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { useParams, NavLink } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import PageNavigation from "../components/PageNavigation";
import CartAmountToggle from "../components/CartAmountToggle";
const API = "http://127.0.0.1:3001/foods/";
const Product = () => {
  // const [qty, setQty] = useState(0);
  // const { state } = useLocation();
  // const { img, name, price, cuisine, ingredients } = state;
  // const [buy, setBuy] = React.useState({});

  // const handlePurchase = (evt) => {
  //   evt.preventDefault();
  //   setBuy((prevState) => ({
  //     ...prevState,
  //     orderId: Math.floor(Math.random() * 100000) + 1,
  //     userId: Math.floor(Math.random() * 1000) + 1,
  //     foodName: name,
  //     quantity: qty,
  //     totalprice: price * qty,
  //   }));
  //   setQty(0);
  // };
  // useEffect(() => {
  //   console.log(buy);
  // }, [buy]);
  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };
  const setIncrease = () => {
    setAmount(amount + 1);
  };
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  console.log(isSingleLoading, singleProduct);
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
            <CartAmountToggle
              amount={amount}
              setDecrease={setDecrease}
              setIncrease={setIncrease}
            />
            <NavLink to="/CartContainer">
              <button className="flex items-center gap-4 justify-center bg-warning py-2 w-full text-lightColor rounded-lg shadow mt-5 hover:bg-primary hover:text-textColor border-none">
                <GiShoppingCart className="text-[38px] " />
                <span className="font-semibold py-3 px-2 rounded-xl h-full">
                  Add to Cart
                </span>
              </button>
            </NavLink>
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Product;
