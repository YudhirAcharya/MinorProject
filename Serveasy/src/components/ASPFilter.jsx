import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FeatureSection from "./FeatureSection";
import { useNavigate } from "react-router-dom";

const ASPFilter = () => {
  const [isSectionHidden, setIsSectionHidden] =
    useState(false);
  const [foods, setFoods] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState(
    []
  );
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showSelectedFoods, setShowSelectedFoods] =
    useState(false);
  const [recommendations, setRecommendations] = useState(
    []
  );
  const targetSection = document.getElementById("scrollTo");
  const handleSkipButtonClick = () => {
    setIsSectionHidden(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/foods"
        );
        const data = await response.json();
        setFoods(data.data.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (cuisine) => {
    setSelectedCuisines((prevSelected) => {
      if (prevSelected.includes(cuisine)) {
        return prevSelected.filter((c) => c !== cuisine);
      } else {
        return [...prevSelected, cuisine];
      }
    });
  };

  const handleFoodSelection = (foodName) => {
    setSelectedFoods((prevSelected) => {
      if (prevSelected.includes(foodName)) {
        return prevSelected.filter(
          (food) => food !== foodName
        );
      } else {
        return [...prevSelected, foodName];
      }
    });
  };

  const filteredFoods = foods
    .filter((food) => {
      if (selectedCuisines.length === 0) return true;
      return !selectedCuisines.includes(food.Cuisine);
    })
    .slice(0, 30);

  const handleShowSelectedFoods = () => {
    setShowSelectedFoods(true);
  };
  const handleGoToHomePage = () => {
    const homePageLink = {
      pathname: "/ASPRecommend",
      state: { selectedFoods },
    };
    navigate.push(homePageLink);
  };
  console.log("Foods in ASPFilter:", selectedFoods);
  return (
    <>
      <div className="flex flex-col mx-auto p-4">
        <button
          onClick={handleSkipButtonClick}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Skip This Section
        </button>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Cuisine Filters
          </h2>
          <div className="flex flex-wrap">
            {Array.from(
              new Set(foods.map((food) => food.Cuisine))
            )
              .slice(0, 10)
              .map((cuisine) => (
                <div
                  key={cuisine}
                  className={`flex items-center mb-2 w-1/2 sm:w-1/4 ${selectedCuisines.includes(cuisine) ? "bg-blue-200" : ""}`}
                >
                  <input
                    type="checkbox"
                    value={cuisine}
                    checked={selectedCuisines.includes(
                      cuisine
                    )}
                    onChange={() =>
                      handleCheckboxChange(cuisine)
                    }
                    id={`checkbox-${cuisine}`}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`checkbox-${cuisine}`}
                    className="cursor-pointer"
                  >
                    <img
                      src={
                        selectedCuisines.includes(cuisine)
                          ? "../public/icons/close.png"
                          : "../public/icons/task.png"
                      }
                      alt={`Checkbox for ${cuisine}`}
                      className="w-8 h-8"
                    />
                  </label>
                  <span>{cuisine}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {filteredFoods.map((food) => (
            <div
              key={food.FoodID}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 relative ${selectedCuisines.includes(food.Cuisine) ? "bg-blue-100" : ""}`}
              onClick={() =>
                handleFoodSelection(
                  food.TranslatedRecipeName
                )
              }
            >
              <div
                className={`h-full p-4 border-2  border-yellow-400 rounded overflow-hidden ${selectedFoods.includes(food.TranslatedRecipeName) ? "border-2 border-green-500" : ""}`}
              >
                <h3 className="text-lg font-bold mb-2 truncate">
                  {food.TranslatedRecipeName}
                </h3>
                <p className="text-gray-600 mb-2 text-sm">
                  Cuisine: {food.Cuisine}
                </p>
                <img
                  src={food.imageurl}
                  alt={`Photo of ${food.TranslatedRecipeName}`}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute bottom-4 right-4 font-bold bg-red-900 text-white rounded-lg p-2 text-sm mr-2">
                  Rs {food.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={handleShowSelectedFoods}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
          >
            Show Selected Foods
          </button>

          {showSelectedFoods && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Selected Foods
              </h2>
              <ul>
                {selectedFoods.map(
                  (selectedFood, index) => (
                    <li key={index}>{selectedFood}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div id="scrollTo">
        <Link
          to={{
            pathname: "/ASPRecommend",
            state: { selectedFoods },
          }}
        >
          <button>Go to Home Page</button>
        </Link>
      </div>
    </>
  );
};

export default ASPFilter;
