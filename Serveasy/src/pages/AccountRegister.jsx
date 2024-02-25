import React from "react";
import { FaUser } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { NavLink } from "react-router-dom";
const AccountRegister = () => {
  return (
    <div>
      <style>
        {`
        .account-type h3,
        .account-type .icon, .account-type p {
          position: relative;
          z-index: 1;
        }
          .account-type {
            position: relative;
            overflow: hidden;
          }

          .account-type::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background-color: #ffc93c;
            color: #000;
            transition: transform 0.3s ease-in-out;
          }

          .account-type:hover::before {
            transform: translateX(100%);
          }
        `}
      </style>
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold text-textColor tracking-tight sm:text-4xl justify-center">
              Select your Account type
            </h2>
          </div>
          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8 "
          >
            <li>
              <NavLink to="http://127.0.0.1:3001/userRegister">
                <div className="py-10 px-6 bg-textColor text-center rounded-lg xl:px-10 xl:text-left cursor-pointer text-white account-type user">
                  <div className="space-y-6 xl:space-y-10">
                    <FaUser className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 text-white icon" />
                    <div className="space-y-2 flex items-center justify-center">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-white justify-center items-center font-bold">
                          User
                        </h3>
                        <p className="text-lightColor font-[300]">
                          Food Enthusiast
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="http://127.0.0.1:3001/chef/chefRegister">
                <div className="py-10 px-6 bg-textColor text-center rounded-lg xl:px-10 xl:text-left cursor-pointer text-white account-type chef">
                  <div className="space-y-6 xl:space-y-10">
                    <LuChefHat className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 text-white icon" />
                    <div className="space-y-2 flex items-center justify-center">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-white justify-center items-center font-bold ">
                          Chef
                        </h3>
                        <p className="text-lightColor font-[300]">
                          Culinary Creator
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="http://127.0.0.1:3001/deliverer/delivererRegister">
                <div className="py-10 px-6 bg-textColor text-center rounded-lg xl:px-10 cursor-pointer xl:text-left text-white account-type deliverer">
                  <div className="space-y-6 xl:space-y-10">
                    <MdDeliveryDining className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 text-white icon" />
                    <div className="space-y-2 flex items-center justify-center">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-white justify-center items-center font-bold ">
                          Deliverer
                        </h3>
                        <p className="text-lightColor font-[300]">
                          Efficient Courier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountRegister;
