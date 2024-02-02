// import React from 'react'
import ProductCard from "./ProductCard";
// import { data } from "../constants";
// import axios from "axios";
import { useState, useEffect } from "react";
const FeatureSection = () => {
  const [productData, setProductData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // const data = await axios.get("127.0.0.1/foods");
      // setProductData({ data });
      // console.log("product >>>>", data);

      // const response = await axios.get("127.0.0.1:3001/foods");
      // setProductData(response.data.rows);
      // console.log("product >>>>", response.data.rows);
      const response = await fetch("http://127.0.0.1:3001/foods", {
        method: "GET",
      });
      const data = await response.json();
      setProductData(data.data.rows);
      console.log("product >>>>", data.data.rows);
    };
    fetchData();
  }, []);
  return (
    <div className="container shadow-none py-10 px-4">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">Most Selling Foods:</h3>
          <p className="text-gray-600 mt-2">
            Most trending meals in the market.
          </p>
        </div>
        <div className="space-x-4 mt-8 lg:mt-0">
          <button className="feature_btn">Breakfast</button>
          <button className="text-gray-600 hover:text-secondary">Lunch</button>
          <button className="text-gray-600 hover:text-secondary">Dinner</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fabbox.in%2Fcollections%2Fchef-recommendations&psig=AOvVaw1I5ulyGti7kEtP_pEw2tTT&ust=1706719464042000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOjT-s7HhYQDFQAAAAAdAAAAABAE"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        {productData &&
          productData
            .filter((_, index) => index < 15)
            .map((product) => (
              <ProductCard
                key={product.FoodID}
                img={product.imageurl}
                name={product.TranslatedRecipeName}
                price={Math.round(product.price * 1.59)}
              />
            ))}
      </div>
    </div>
  );
};

export default FeatureSection;

// // import React from "react";
// import ProductCard from "./ProductCard";
// import { data } from "../constants";
// const FeatureSection = () => {
//   return (
//     <div className="container pt-16">
//       <div className="lg:flex justify-between items-center">
//         <div>
//           <h3 className="font-medium text-2xl">Most Selling Foods:</h3>
//           <p className="text-gray-600 mt-2">
//             Most trending meals in the market.
//           </p>
//         </div>
//         <div className="space-x-4 mt-8 lg:mt-0">
//           <button className="feature_btn p-2">Breakfast</button>
//           <button className="text-gray-600 hover:text-secondary p-2">
//             Lunch
//           </button>
//           <button className="text-gray-600 hover:text-secondary p-2">
//             Dinner
//           </button>
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
//         <div>
//           <img
//             src="https://www.fabbox.in/cdn/shop/files/chef_reco.jpg?v=1653455410"
//             alt="banner"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         {data.map((el) => (
//           <ProductCard
//             key={el.id}
//             img={el.food_image_url}
//             name={el.meal_name}
//             price={el.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeatureSection;
