// import React from "react";
import propTypes from "prop-types";

const CardCountBadge = ({ size }) => {
  return (
    <div
      className={`absolute bg-secondary text-white text-[10px] ${size} -mt-10 -mr-7 rounded-full grid place-items-center z-10`}
    >
      3
    </div>
  );
};
CardCountBadge.propTypes = {
  size: propTypes.string,
};

export default CardCountBadge;
