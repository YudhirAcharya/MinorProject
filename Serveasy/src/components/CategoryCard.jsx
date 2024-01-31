// // import propTypes from "prop-types";

// // import React from "react";

// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const CategoryCard = () => {
//   const [productData, setProductData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await axios.get("127.0.0.1/foods");
//       console.log("product >>>>", data);
//     };
//     fetchData();
//     // axios
//     //   .get("127.0.0.1/foods")
//     //   .then((response) => {
//     //     setProductData(response.data);
//     //     setIsLoading(false);
//     //     console.log(response);
//     //   })
//     //   .catch((error) => {
//     //     setError(error);
//     //     setIsLoading(false);
//     //   });
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading product data...</p>
//       ) : error ? (
//         <p>Error fetching data: {error.message}</p>
//       ) : productData.length > 0 ? (
//         productData.map((product) => (
//           <div
//             key={product.FOODID}
//             className="border border-gray-200  hover:border-warning hover:scale-105  transistion-transform rounded-lg "
//           >
//             <div className="flex hover:text-warning justify-between items-center p-6">
//               <div className="space-y-4">
//                 <h3 className="font-medium text-xl">
//                   {product.TranslatedRecipeName}
//                 </h3>
//                 <p className="text-gray-500 hover:text-inherit">
//                   {product.price}
//                 </p>
//               </div>
//               <img
//                 className="w-[100px] h-[100px] object-cover rounded-[50%]"
//                 src={product.imageurl}
//                 alt={product.TranslatedRecipeName}
//               />
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// };

// // CategoryCard.propTypes = {
// //   imageurl: propTypes.string,
// //   TranslatedRecipeName: propTypes.string,
// //   price: propTypes.number,
// // };

// export default CategoryCard;
import propTypes from "prop-types";

// import React from 'react'

const CategoryCard = ({ img, name, count }) => {
  return (
    <div className="border border-gray-200  hover:border-warning hover:scale-105  transistion-transform rounded-lg ">
      <div className="flex hover:text-warning justify-between items-center p-6">
        <div className="space-y-4">
          <h3 className="font-medium text-xl">{name}</h3>
          <p className="text-gray-500 hover:text-inherit">{count}</p>
        </div>
        <img
          className="w-[100px] h-[100px] object-cover rounded-[50%]"
          src={img}
          alt={name}
        />
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  img: propTypes.string,
  name: propTypes.string,
  count: propTypes.string,
};
export default CategoryCard;
