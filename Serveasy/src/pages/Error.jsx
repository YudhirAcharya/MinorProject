import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className=" mt-[50px] flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        {/* <h1 className="mb-4 text-[70px] font-bold">404</h1> */}
        <p className="text-gray-600 text-[30px] leading-8">
          The page you are trying to find is taking some time to load.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded bg-primary px-4 py-2 font-semibold text-white"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
