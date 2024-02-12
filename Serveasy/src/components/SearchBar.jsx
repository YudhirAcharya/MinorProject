import React from "react";

const SearchBar = () => {
  return (
    <div className="flex flex-row mx-0 my-0 gap-3">
      <input
        type="text"
        id="searchBar"
        placeholder="Search food"
      />
      <label htmlFor="serarchBar flex ">
        <button className="w-[50px]">
          <img
            src="./public/icons/search.png"
            alt=""
            className="w-50px"
          />
        </button>
      </label>
    </div>
  );
};

export default SearchBar;
