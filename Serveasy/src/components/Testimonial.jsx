import { cdata } from "../constants/index";
import { customer } from "../constants/index";
import { RiStarSFill } from "react-icons/ri";
import { RiStarSLine } from "react-icons/ri";
import { BiSolidQuoteAltRight } from "react-icons/bi";
const Testimonial = () => {
  return (
    <section className="mt-[8%]  relative text-white after:contents[''] after:absolute after:top-0 after:left-0 after:max-w-[80%] after:h-[100vh] after:bg-black after:z-[-1] after:rounded-[0.65rem] md:after:w-full vvsm:after:min-w-full sm:mb-[30rem] vvsm:mb-[40rem] md:mb-[5rem] hide-vvsm-down">
      <div className="max-w-[100%]  grid lg:grid-cols-2 justify-between lg:items-left vsm:items-center vvsm:grid-cols-1 bg-black">
        <div className="w-[80%] mr-auto px-8 md:pb-15  vsm:pt-10 md:pt-8 vsm:ml-8">
          <div className="text-left ">
            <h3 className="font-K text-primary text-[1.5rem]">
              Customer Feedback
            </h3>
            <h1 className="text-[2.5rem] text-lighttextGray">
              What Do Our Clients Say?
            </h1>
          </div>
          <p className="text-lightColor opacity-[0.7] mt-3 leading-7">
            Discover delicious meals I never knew I&apos;d love, with
            recommendations that hit the spot!
          </p>
          <div className="md:grid-cols-3 leftContent grid grid-cols-3 gap-[2rem] md:grid  md:gap-[2rem]">
            {cdata.slice(0, 3).map((value, index) => (
              <div className="box" key={index}>
                <h1 className="text-[3rem] font-extrabold text-primary mt-[2.5rem]">
                  {value.num}
                </h1>
                <h3>{value.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between absolute right-0 gap-6 top-[2rem] md:relative md:mb-[2rem] md:w-[80%] md:ml-[6rem] lg:ml-0 lg:pl-[1rem] lg:w-[100%] md:mt-0 xl:w-[100%] sm:mt-[25rem] vsm:mt-[35rem] vsm:ml-8">
          {customer.slice(0, 2).map((value, index) => (
            <div
              className=" text-textColor py-[2.5rem] pb-[2.5rem] mr-[1.25rem] rounded-[0.65rem]"
              key={index}
            >
              <div className="bg-lightColor md:h-[30rem] max-h-full rounded-lg p-3 flex justify-between items-center flex-col">
                <div className="flex justify-center md:gap-10 vsm:gap-2">
                  <img
                    src={value.cover}
                    className="h-[6rem] w-[6rem] rounded-md"
                  />{" "}
                  <span className="text-[4rem] text-primary">
                    <BiSolidQuoteAltRight />
                  </span>
                </div>
                <p className="text-textColor font-semibold text-[1rem] px-2 py-4">
                  {value.desc}
                </p>
                <div className="details">
                  <div className="dbox">
                    <h3 className="font-bold text-[1.2rem]">{value.name}</h3>
                    <label className="text-secondary">{value.post}</label>
                  </div>
                  <div className="dbox">
                    <span className="mt-3 flex items-center justify-center">
                      {Array(5)
                        .fill()
                        .map((_, index) => (
                          <span
                            key={index}
                            className={`inline-block mr-1.5 ${
                              index < value.ratenum
                                ? "text-primary"
                                : "text-gray-400"
                            }`}
                          >
                            {index < value.ratenum ? (
                              <RiStarSFill />
                            ) : (
                              <RiStarSLine />
                            )}
                          </span>
                        ))}
                    </span>
                    <h4 className="text-primary flex justify-center">
                      {value.ratenum} Star
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
