// import React from "react";
import { BsArrowRight } from "react-icons/bs";
const Hero = () => {
  return (
    <div className="container pt-8 ">
      <div className="grid xl:grid-cols-3 xl:grid-rows-2 gap-8">
        <div className="relative xl:col-span-2 xl:row-start-1 xl:row-end-[-1]">
          <img
            className="w-full h-[100%] object-cover rounded-lg opacity-65"
            src="https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/hcwypnzo/380a1733-0bcf-476c-a7b9-5823a608b951.jpg"
            alt="hero image"
          />
          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[30%] sm:space-y-2">
            <h2 className="text-5xl hidden sm:block text-gray-800">
              The best food delivery service
            </h2>
            <p className="text-10xl sm:text-8xl md-text-12xl font-bold text-gray-800">
              Best Food Delivery
            </p>
            <p className="text-gray-800 text-2xl pt-4 sm:pt-8">Starting At</p>
            <div className="font-medium text-red-800 text-xl sm:text-xl sm:pb-8 pb-4">
              Rs499
            </div>
            <div className="bg-warning hover:bg-secondary text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
              Order Now <BsArrowRight />
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full h-full object-cover rounded-lg opacity-65"
            src="https://images.squarespace-cdn.com/content/v1/5d5d24dcf6e1930001a125c3/1571903583310-HZEUEOGLT6HRIYEGD81B/HERO+Web-18.jpg"
            alt="hero image 2"
          />
          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[10%] sm:space-y-1">
            <h2 className="text-2xl hidden sm:text-3xl font-bold text-gray-800">
              The best food facility
            </h2>
            <p className="text-2xl sm:text-3xl md-text-8xl pt-2 text-gray-800">
              Best Sushi
            </p>
            <p className="text-secondary text-xl pt-2 sm:pt-8">Starting At</p>
            <div className="font-medium text-red-800 text-xl sm:text-2xl sm:pb-8 pb-4">
              Rs199
            </div>
            <div className="bg-warning hover:bg-secondary text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
              Order Now <BsArrowRight />
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            className="w-full h-full object-cover rounded-lg opacity-65"
            src="https://res.cloudinary.com/melbourne-food-and-wine/images/w_1024,h_683,c_scale/dpr_2.0/f_auto,q_auto/v1697596909/2021%20Content/Hero-restaurant-roast-chicken/Hero-restaurant-roast-chicken.jpg?_i=AA"
            alt="hero image 3"
          />
          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[10%] sm:space-y-1">
            <h2 className="text-2xl hidden sm:text-3xl font-bold text-gray-800">
              The best food facility
            </h2>
            <p className="text-2xl sm:text-3xl md-text-8xl pt-2text-gray-800">
              Best Sushi
            </p>
            <p className="text-secondary text-xl pt-2 sm:pt-8">Starting At</p>
            <div className="font-medium text-red-800 text-xl sm:text-2xl sm:pb-8 pb-4">
              Rs199
            </div>
            <div className="bg-warning hover:bg-secondary text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer">
              Order Now <BsArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
