// // import React from "react";

const Promotion = () => {
  return (
    <section>
      <div className="h-[120vh] bg-[#222222]  bg-[url(/public/images/donut.png)] bg-contain bg-no-repeat  text-white px-10 w-full offer md:bg-center md:h-[60vh]  sm:h-[40vh] vsm:h-[30vh] vvsm:h-[20vh] sm:object-fill md:w-full after:hidden ">
        <div className="max-w-[80%] m-auto flex justify-between items-center ">
          <div className="w-[50%] md:w-[100%] md:pt-[30px]">
            <div className="text-left flex-col  gap-8 vsm:gap-2 sm:py-5 vsm:py-2 vvsm:py-0 py-10 px-[30px]  font-extrabold">
              <h3 className="font-normal font-K text-primary 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg ">
                Crazy Deals Available
              </h3>
              <h1 className=" 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-2xl sm:text-xl py-5 vsm:py-2">
                Get Your Meal Today!
              </h1>
            </div>
            <p className="text-warning leading-6"></p>
            <div className="bg-none border-none outline-none flex">
              <button className="text-sm py-[16px] px-[30px] text-center relative text-white bg-warning uppercase font-bold rounded-lg cursor-pointer ml-[20px] hover:bg-primary hover:text-textColor">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
