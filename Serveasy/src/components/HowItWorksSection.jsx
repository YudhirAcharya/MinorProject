// import React from "react";
import { workInfoData } from "../constants/index";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineRecommend } from "react-icons/md";
const Work = () => {
  return (
    <section className="mt-20 md:mt-20 font-Q bg-lightColor py-8">
      <div className="flex  justify-center items-center flex-col">
        <p className="md:text-center text-primary text-xl text-center max-w-[40rem] font-K">
          Serveasy
        </p>
        <h1 className="md:text-center md:max-w-[90%] text-4xl text-textColor max-w-[38rem]">
          How It Works?
        </h1>
        <p className="md:text-center md:max-w-[80%] text-2xl max-w-[31rem] text-gray-500 mt-6">
          Discover delicious meals tailored to your preferences, schedule
          hassle-free deliveries, and rate your experience in our convenient
          meal recommendation app.
        </p>
      </div>
      <div className="mt-20 flex justify-center items-center flex-wrap md:mb-4">
        {workInfoData.map((data) => (
          <div
            className="w-[18rem] min-h-[22rem] bg-white py-4 px-8 flex flex-col justify-center items-center text-center font-bold rounded-2xl text-black my-4 mx-8"
            key={data.title}
          >
            <div className="pt-4">
              {data.logo === "MdOutlineRecommend" && (
                <MdOutlineRecommend className="text-[100px]  text-primary " />
              )}
              {data.logo === "AiFillSchedule" && (
                <AiFillSchedule className="text-[100px] text-primary " />
              )}
              {data.logo === "MdOutlineRateReview" && (
                <MdOutlineRateReview className="text-[100px] text-primary " />
              )}
              {data.logo === "TbTruckDelivery" && (
                <TbTruckDelivery className="text-[100px] text-primary " />
              )}
            </div>
            <h2 className="my-4 text-xl">{data.title}</h2>
            <p className="flex flex-1 items-center text-gray-600">
              {data.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
