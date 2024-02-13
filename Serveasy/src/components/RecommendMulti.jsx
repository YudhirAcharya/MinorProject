import React, { useState } from "react";
import { Recipe } from "../constants/indianFoodDataset";
import RecommendationMultiList from "./RecommendationMultiList";
const RecommendMulti = () => {
  const [recipeInput, setRecipeInput] = useState("");
  const [recommendations, setRecommendations] = useState(
    []
  );
  const item = Recipe[0].TranslatedIngredients;

  const recommendRecipe = () => {
    // Make a POST request to the server (replace the URL with your server endpoint)
    fetch("http://localhost:5000/recommendmulti", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe_name: recipeInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update recommendations state
        setRecommendations(data.recommendations);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container flex flex-col justify-center items-center h-screen mt-2 w-full ">
      <h1 className=" text-[40px] text-center">
        Search meals you like
      </h1>
      <div className="flex flex-row gap-2 w-full justify-center items-center">
        <label
          htmlFor="recipeInput"
          className="text-[20px]"
        >
          Enter a recipe:
        </label>

        <input
          className="w-1/2"
          type="text"
          id="recipeInput"
          placeholder="Type a recipe..."
          value={recipeInput}
          onChange={(e) => setRecipeInput(e.target.value)}
        />
        <button
          onClick={recommendRecipe}
          className=" bg-red-500 p-2 "
        >
          Search
        </button>
      </div>
      <RecommendationMultiList
        recommendations={recommendations}
      />
      {console.log(recommendations)}
    </div>
  );
};

export default RecommendMulti;
