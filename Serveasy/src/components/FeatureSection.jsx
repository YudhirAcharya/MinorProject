// // import React from 'react'
// import ProductCard from "./ProductCard";
// // import { data } from "../constants";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// const FeatureSection = () => {
//   const [productData, setProductData] = useState([]);
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await axios.get("127.0.0.1/foods");
//       setProductData(data);
//       console.log("product >>>>", data);
//     };
//     fetchData();
//   }, []);
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
//           <button className="feature_btn">Breakfast</button>
//           <button className="text-gray-600 hover:text-secondary">Lunch</button>
//           <button className="text-gray-600 hover:text-secondary">Dinner</button>
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
//         <div>
//           <img
//             src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.fabbox.in%2Fcollections%2Fchef-recommendations&psig=AOvVaw1I5ulyGti7kEtP_pEw2tTT&ust=1706719464042000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOjT-s7HhYQDFQAAAAAdAAAAABAE"
//             alt="banner"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         {productData &&
//           productData?.data.map((product) => (
//             <ProductCard
//               key={product.FOODID}
//               img={product.imageurl}
//               name={product.TranslatedRecipeName}
//               price={product.price}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default FeatureSection;

import React from "react";
import ProductCard from "./ProductCard";
import { data } from "../constants";
const FeatureSection = () => {
  return (
    <div className="container pt-16">
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
        {data.map((el) => (
          <ProductCard
            key={el.id}
            img={el.food_image_url}
            name={el.meal_name}
            price={el.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
