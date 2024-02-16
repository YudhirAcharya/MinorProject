/* eslint-disable react/prop-types */
// import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pages = [...Array(totalPages).keys()];

  const renderPages = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2 ||
        i === currentPage - 3 ||
        i === currentPage + 3
      ) {
        pageNumbers.push("...");
      }
    }

    return pageNumbers.map((page, index) => (
      <p
        key={index}
        className={`text-sm font-medium leading-none cursor-pointer text-textColor border-t ${
          currentPage === page ? "border-primary" : "border-transparent"
        } pt-3 mr-4 px-2`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </p>
    ));
  };

  return (
    <div className=" flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full flex items-center justify-between">
        <div
          className="flex items-center pt-3 text-primary rounded-full cursor-pointer"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft size={14} />
          <p className="text-sm ml-3 font-medium leading-none">Previous</p>
        </div>
        <div className="sm:flex hidden">{renderPages()}</div>
        <div
          className="flex items-center pt-3 text-primary rounded-full cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <FaChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
