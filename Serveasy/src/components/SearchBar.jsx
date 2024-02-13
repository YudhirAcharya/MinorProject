import { useState, useEffect, useRef } from "react";
// import { Recipe } from "../constants/indianFoodDataset";

import { useProductContext } from "../context/productContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const { Products } = useProductContext();
  const handleSearch = () => {
    const filtered = Products.filter((recipe) =>
      recipe.TranslatedRecipeName.toLowerCase().includes(
        searchTerm.toLowerCase()
      )
    );
    setFilteredRecipes(filtered.slice(0, 10));
    setIsResultsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setIsResultsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mx-0 my-0" ref={searchContainerRef}>
      <div className="flex flex-row mx-0 my-0 mt-3">
        <input
          type="text"
          id="searchBar"
          name="text"
          placeholder="Search food"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px] p-2"
        />
        <button className="w-[55px] p-2" onClick={handleSearch}>
          <img src="./public/icons/search.png" alt="" className="w-50px " />
        </button>
      </div>
      {isResultsOpen && filteredRecipes.length > 0 && (
        <div className="absolute top-10 right-0 bg-white p-4 border rounded shadow-md">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.FoodID} className="recipe-box">
              <h3>{recipe.TranslatedRecipeName}</h3>

              {/* <img src={recipe.imageURL} alt={recipe.TranslatedRecipeName} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
