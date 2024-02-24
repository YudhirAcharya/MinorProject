// import React from "react";
import { NavLink } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaPlay } from "react-icons/fa";
// const banners = [
//   {
//     id: 1,
//     title: "GREAT LOCATION",
//     desc: "Rorem ipsum dolor sit amet, etur advoluptatem voluptatem",
//   },
//   {
//     id: 2,
//     title: "NATURE FIRST",
//     desc: "Rorem ipsum dolor sit amet, etur advoluptatem voluptatem",
//   },
//   {
//     id: 3,
//     title: "HEALTHY FOOD",
//     desc: "Rorem ipsum dolor sit amet, etur advoluptatem voluptatem",
//   },
// ];

const Banner = () => {
  return (
    <section className="Banner overflow-hidden font-Q">
      <div className="min-h-100 min-w-full sm:min-h-120 flex justify-center items-center ">
        <div className=" pb-8 sm:pb-2">
          <div className="grid grid-cols-1 border-none bg-lightColor  md:grid-cols-2 sm:grid-cols-2">
            {/* text content section */}
            <div className="font-K flex  flex-col justify-center gap-4 py-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1  px-10  lg:w-3/4 md:w-full sm:w-full vsm:w-full ">
              <h1 className=" font-semibold lg:text-base xl:text-lg 2xl:text-lg  md:text-sm sm:text-xs tracking-widest">
                Welcome to{" "}
                <span className=" bg-clip-text text-transparent bg-gradient-to-b from-primary to-warning lg:text-base xl:text-lg 2xl:text-lg  md:text-sm sm:text-xs tracking-widest">
                  Serveasy
                </span>
              </h1>
              <h1 className="font-Q uppercase my-4 font-extrabold leading-loose text-warning lg:text-4xl xl:text-6xl 2xl:text-6xl  md:text-2xl sm:text-xl">
                are you hungry?
              </h1>
              <p className="font-Q lg:text-lg xl:text-xl 2xl:text-xl  md:text-md sm:text-sm tracking-wides">
                Get the best meals from the best chefs in town
              </p>

              <div className="flex gap-10  justify-center font-bold font-Q">
                <a href="/components/HowItWorksSection">
                  <button className=" hover:scale-102 duration-200 text-white px-8 py-4 rounded-full  cursor-pointer transition-all  bg-tertiary border-none hover:bg-primary">
                    Learn More
                  </button>
                </a>

                <NavLink to="http://127.0.0.1:3001/userLogin">
                  <button className=" hover:scale-102 duration-200 text-white px-8 py-4 rounded-full  cursor-pointer transition-all  bg-cartNumBg border-none hover:bg-warning">
                    Order Now
                  </button>
                </NavLink>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-1/2 sm:min-h-1/3 flex w-full justify-center items-center relative order-1 md:order-2 sm:order-3 bg-white">
              <div className="w-full h-full flex justify-center align-items-center relative z-[1] xl:right-[20rem]">
                <img
                  src="public/images/bigchick.png"
                  alt="biryani img"
                  className="
                  w-full object-cover scale-x-110"
                />
              </div>
              <div className="flex lg:flex-col justify-start">
                {/* {banners.map((val) => {
                  <div
                    className="mb-[30px] flex justify-between align-items-center flex-row-reverse text-right"
                    key={val.id}
                  >
                    <div>
                      <h3 className=" rounded-[100%] flex items-center justify-center text-cartBg hover:shadow-md cursor-pointer bg-gray-500">
                        0{val.id}
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Sunt laudantium consequuntur labore? Fuga saepe
                          corrupti ex iusto et amet qui, velit temporibus unde
                          ad? Architecto aut temporibus iste assumenda itaque?
                        </p>
                      </h3>
                    </div>
                    <div>
                      <h3>{val.title}</h3>
                      <p>{val.desc}</p>
                    </div>
                  </div>;
                })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-4 flex justify-between align-items-center flex-row-reverse ">
        <div className=" flex  justify-between text-4xl gap-8 ">
          <button className="hover:text-primary">
            <FaFacebook />
          </button>
          <button className="hover:text-primary">
            <FaInstagram />
          </button>
          <button className="hover:text-primary">
            <FaTwitter />
          </button>
          <button className="hover:text-primary">
            <FaGithub />
          </button>
        </div>
        <div className="flex justify-center align-items-center flex-row-reverse text-right ">
          <button className="flex justify-between gap-4 items-center ">
            <span>PLAY VIDEO</span>
            <FaPlay className="fa fa-play w-30 h-30 rounded-full flex items-center justify-center text-gray-700 hover:shadow-md cursor-pointer bg-white shadow-0 transition-shadow duration-200 hover:text-primary" />
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default Banner;
