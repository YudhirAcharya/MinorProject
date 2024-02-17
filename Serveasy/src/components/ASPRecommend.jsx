import React from "react";
import { useLocation } from "react-router-dom";

const ASPRecommend = () => {
  const location = useLocation();
  const selectedFoods =
    location?.state?.selectedFoods || [];
  console.log(selectedFoods);
  return (
    <div className="flex flex-col mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Recommended Foods
      </h2>
      <ul>
        {selectedFoods.map((selectedFood, index) => (
          <li key={index}>{selectedFood}</li>
        ))}
      </ul>
    </div>
  );
};

export default ASPRecommend;
