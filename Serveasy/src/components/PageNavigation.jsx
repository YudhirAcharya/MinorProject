/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
const PageNavigation = ({ title }) => {
  return (
    <section>
      <div className="bg-white pl-4">
        <div className="flex flex-wrap h-16 py-4 items-center">
          <NavLink to="/home">
            <a className="inline-block text-sm text-black font-bold">Home</a>
          </NavLink>
          <span className="mx-3">
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.453338 1.05338L0.453338 5.20671L0.453339 8.94671C0.453339 9.58671 1.22667 9.90671 1.68001 9.45338L5.13334 6.00005C5.68667 5.44671 5.68667 4.54671 5.13334 3.99338L3.82 2.68005L1.68001 0.540046C1.22667 0.093379 0.453338 0.41338 0.453338 1.05338Z"
                fill="black"
              ></path>
            </svg>
          </span>

          <a className="inline-block text-sm text-primary font-bold" href="#">
            {title}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PageNavigation;
