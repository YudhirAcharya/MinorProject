import { NavLink } from "react-router-dom";

const LandingHero = () => {
  return (
    <section className="relative md:mb-[30rem] vvsm:mb-[15rem]">
      <div className="absolute inset-0 w-full vvsm:h-[60vh] blur-[2px] md:h-screen bg-cover bg-center">
        <img
          className="w-full h-full object-cover object-center"
          src="public/images/ld-bg.jpg"
          alt="we care family"
        />
      </div>

      <div className="relative pt-[15%] flex items-center align-middle justify-center z-10 vsm:mx-[10%] rounded-lg">
        <div
          role="contentinfo"
          className="w-full lg:w-2/3 h-[80%] text-textColor  py-3 px-[3rem] mx-2"
        >
          <h1 className=" font-semibold  xl:text-4xl 2xl:text-6xl  md:text-3xl sm:text-lg tracking-widest">
            Welcome to{" "}
            <span className=" bg-clip-text text-transparent bg-gradient-to-b from-primary to-warning lg:text-3xl xl:text-6xl 2xl:text-8xl  md:text-4xl sm:text-md tracking-widest">
              Serveasy
            </span>
          </h1>
          <h1 className="font-Q uppercase my-4 font-extrabold leading-loose text-textColor lg:text-4xl xl:text-6xl 2xl:text-6xl  md:text-2xl sm:text-xl">
            are you hungry?
          </h1>
          <p className="font-Q lg:text-lg xl:text-xl 2xl:text-xl  md:text-md sm:text-sm tracking-wides">
            Get the best meals from the best chefs in town
          </p>
          <div className="flex gap-[3rem]  justify-left font-bold font-Q">
            <a href="/components/HowItWorksSection">
              <button className=" hover:scale-102 duration-200 text-textColor px-8 py-4 rounded-md  cursor-pointer transition-all  bg-primary border-none hover:bg-warning hover:text-white">
                Learn More
              </button>
            </a>

            <NavLink to="http://127.0.0.1:3001/userRegister">
              <button className=" hover:scale-102 duration-200 text-primary px-8 py-4 transform rounded-md border-4 border-primary border-r-2 font-semibold transition-colors hover:bg-primary hover:text-textColor">
                Order Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
