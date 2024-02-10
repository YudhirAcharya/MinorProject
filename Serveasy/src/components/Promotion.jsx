const Promotion = () => {
  return (
    <section>
      <div className="h-[120vh] bg-[#222222]  bg-[url(/public/images/donut.png)] bg-contain bg-no-repeat  text-white px-10 w-full offer md:bg-center md:h-[60vh]  sm:h-[40vh] vsm:h-[30vh] vvsm:h-[20vh] sm:object-fill md:w-full after:hidden ">
        <div className="max-w-[80%] m-auto flex justify-between items-center ">
          <div className="w-[50%] md:w-[100%] md:pt-[30px]">
            <div className="text-left flex-col  gap-8 vsm:gap-2 sm:py-5 vsm:py-2 vvsm:py-0 py-10 px-[30px]  font-extrabold">
              <h3 className="font-normal hide-vsm-down font-K text-primary 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg ">
                Hungry but don&apos;t know what to eat?
              </h3>
              <h1 className=" 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl py-5 vsm:py-2">
                Fuel your foodie adventures!
              </h1>
              <p className="text-lighttextGray leading-6 w-[40%] pb-4 hide-lg-down">
                Say goodbye to mealtime indecision! Our app recommends foods
                you&apos;ll love based on ingredients and trend. It&apos;s the
                perfect way to discover new flavors and simplify your meal
                shopping, all in one place.
              </p>
            </div>

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
