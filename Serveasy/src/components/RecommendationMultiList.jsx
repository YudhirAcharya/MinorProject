import React from "react";
import { Recipe } from "../constants/indianFoodDataset";

const RecommendationMultiList = ({ recommendations }) => {
  const findRecipeByName = (name) => {
    // Find the recipe in the dataset based on the TranslatedRecipeName
    return Recipe.find(
      (recipe) => recipe.TranslatedRecipeName === name
    );
  };

  return (
    <div id="recommendations" className="mt-8">
      <h2 className="fooddatasettext-[20px] bg-gray-300 rounded-md p-2">
        We also recommend you
      </h2>
      {recommendations.map((recipe, index) => {
        const matchedRecipe = findRecipeByName(recipe.name);

        return (
          <div key={index} className="recommended-recipe">
            <p>{recipe.name}</p>
            {matchedRecipe && (
              <img
                className="w-[100px]"
                src={matchedRecipe.imageURL}
                alt={matchedRecipe.TranslatedRecipeName}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationMultiList;
