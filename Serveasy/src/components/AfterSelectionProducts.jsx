import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FeatureSection from "./FeatureSection";
import { useCartContext } from "../context/cartContext";
import ProductCard from "./ProductCard";
const AfterSelectionProducts = () => {
  const { addToCart } = useCartContext();
  const [isSectionHidden, setIsSectionHidden] =
    useState(false);
  const [foods, setFoods] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState(
    []
  );
  const [
    isFeatureSectionVisible,
    setIsFeatureSectionVisible,
  ] = useState(false);

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showSelectedFoods, setShowSelectedFoods] =
    useState(false);
  const [recommendations, setRecommendations] = useState(
    []
  );
  const [showRecommendations, setShowRecommendations] =
    useState(false);

  const handleSkipButtonClick = () => {
    setIsSectionHidden(true);
  };
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const foodNames = selectedFoods;
        const response = await axios.post(
          "http://127.0.0.1:5000/recommend_multi",
          {
            recipe_names: foodNames.filter(
              (name) => name.trim() !== ""
            ),
          }
        );

        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error(
          "Error fetching recommendations:",
          error
        );
      }
    };
    fetchRecommendations();
  }, [selectedFoods]);
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
  useEffect(() => {
    // Fetch data from the API
    fetch("http://127.0.0.1:3001/users/recommendationData")
      .then((response) => response.json())
      .then((data) => {
        // Extract and sort the rows based on stars
        const sortedFoods = data.data.rows.sort(
          (a, b) => parseInt(b.stars) - parseInt(a.stars)
        );
        setFilteredFoods(sortedFoods);
      })
      .catch((error) =>
        console.error("Error fetching data:", error)
      );
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
      if (selectedCuisines.length === 0) return false;
      return selectedCuisines.includes(food.Cuisine);
    })
    .slice(0, 30);

  const handleShowSelectedFoods = () => {
    setIsFeatureSectionVisible(true);

    setIsSectionHidden(true);
  };
  const handleShowFeatureSection = () => {
    setIsFeatureSectionVisible(true);
  };
  const handlesSectionAbove = () => {
    setIsSectionHidden(true);
  };
  const handleShowRecomendSection = () => {
    setShowRecommendations(true);
  };
  console.log(selectedFoods);
  return (
    <>
      <div
        className={`flex flex-col ${isSectionHidden ? "hidden" : ""}`}
      >
        {!isSectionHidden && !showRecommendations && (
          <div className="mb-8">
            <div className="border-4 m-3 rounded-md border-amber-300">
              <div className="flex flex-col items-center mb-4 mx-0 my-0">
                <span className=" text-2xl p-8 ">
                  {" "}
                  To better know your taste we request you
                  to select some foods below.
                </span>
                <button
                  onClick={() => {
                    handleShowFeatureSection();

                    handleShowRecomendSection();
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Do you want to skip to Home?
                </button>
              </div>
            </div>
            <div className=" bg-amber-100 p-4 rounded-xl m-3  content-center">
              <h2 className="text-xl font-bold mb-3">
                Cuisine Filter can help with your palate!
              </h2>
              <h2 className="text-lg mb-1 text-left">
                Choose the cusines whether you want it or
                not:
              </h2>
              <div className="flex flex-wrap">
                {Array.from(
                  new Set(foods.map((food) => food.Cuisine))
                )
                  .slice(0, 50)
                  .map((cuisine) => (
                    <div
                      key={cuisine}
                      className={`flex items-center mb-2 w-1/2 sm:w-1/4 ${selectedCuisines.includes(cuisine) ? "bg-amber-100 rounded-lg" : ""}`}
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
                            selectedCuisines.includes(
                              cuisine
                            )
                              ? "../public/icons/task.png"
                              : "../public/icons/square.png"
                          }
                          alt={`Checkbox for ${cuisine}`}
                          className="w-6 h-6 p-1"
                        />
                      </label>
                      <span>{cuisine}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {!isFeatureSectionVisible &&
          !showRecommendations && (
            <button
              onClick={() => {
                handleShowFeatureSection();

                handleShowRecomendSection();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md m-2 ml-auto text-2xl"
            >
              Go to Home
            </button>
          )}
        {!isSectionHidden && !showRecommendations && (
          <div className="flex flex-wrap mx-0 my-0">
            {filteredFoods.map((food) => (
              <div
                key={food.FoodID}
                className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 relative ${selectedCuisines.includes(food.Cuisine) ? "bg-white" : ""}`}
                onClick={() =>
                  handleFoodSelection(
                    food.TranslatedRecipeName
                  )
                }
              >
                <div
                  className={`h-full p-4 border-2  rounded overflow-hidden ${selectedFoods.includes(food.TranslatedRecipeName) ? " border-red-400" : "border-yellow-400"}`}
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
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          {/* <button
            onClick={handleShowSelectedFoods}
            className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
          >
            Show Food of your Choice
          </button> */}
          {/* <button
            onClick={handleRecommendation}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Get Recommendations
          </button> */}

          {showSelectedFoods && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Foods you chose:
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

          <div>
            {recommendations.length > 0 &&
              showRecommendations && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    We would like to recommend you:
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-auto p-5">
                    {recommendations.map(
                      (recommendation, index) => {
                        const matchingFood = foods.find(
                          (food) =>
                            food.TranslatedRecipeName ===
                            recommendation.name
                        );

                        if (matchingFood) {
                          return (
                            <ProductCard
                              key={matchingFood.FoodID}
                              id={matchingFood.FoodID}
                              img={matchingFood.imageurl}
                              name={
                                matchingFood.TranslatedRecipeName
                              }
                              price={matchingFood.price}
                              TotalTimeInMins={
                                matchingFood.TotalTimeInMins
                              }
                              cuisine={matchingFood.Cuisine}
                              CleanedIngredients={
                                matchingFood.CleanedIngredients
                              }
                            />
                          );
                        } else {
                          return null;
                        }
                      }
                    )}
                  </div>
                </div>
              )}{" "}
          </div>
        </div>
      </div>
      <div id="scrollTo"></div>
      {/* {!isFeatureSectionVisible && (
        <button
          onClick={handleShowFeatureSection}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
        >
          Show Feature Section
        </button>
      )} */}
      {showRecommendations && (
        <div>
          <div id="scrollTo"></div>
          <FeatureSection />
        </div>
      )}
    </>
  );
};

export default AfterSelectionProducts;
