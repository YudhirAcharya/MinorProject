import React, { useState } from "react";
import { Recipe } from "../constants/indianFoodDataset";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(
    []
  );

  const handleSearch = () => {
    const filtered = Recipe.filter((recipe) =>
      recipe.TranslatedRecipeName.toLowerCase().includes(
        searchTerm.toLowerCase()
      )
    );
    setFilteredRecipes(filtered.slice(0, 10));
  };

  return (
    <div className="flex flex-row mx-0 my-0 gap-3">
      <input
        type="text"
        id="searchBar"
        placeholder="Search food"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="w-[50px]" onClick={handleSearch}>
        <img
          src="./public/icons/search.png"
          alt=""
          className="w-50px"
        />
      </button>

      {filteredRecipes.map((recipe) => (
        <div key={recipe.FoodID}>
          {/* Display the recipe details as needed */}
          <h3>{recipe.TranslatedRecipeName}</h3>
          {/* Add other details as needed */}
          <img
            src={recipe.imageURL}
            alt={recipe.TranslatedRecipeName}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
