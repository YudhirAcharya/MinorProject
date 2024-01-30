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
