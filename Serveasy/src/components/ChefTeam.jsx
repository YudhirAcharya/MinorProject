import { chefs } from "../constants/index.js";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const ChefTeam = () => {
  return (
    <section className="pt-24 pb-36 bg-white overflow-hidden">
      <div className="px-4 mx-auto">
        <p className="font-K mb-5 text-lg text-primary text-center font-medium md:max-w-xl mx-auto">
          Our Professionals
        </p>
        <h2 className="mb-5 text-4xl md:text-4xl xl:text-6xl text-center font-bold font-heading tracking-px-n leading-none">
          Meet Our Chefs
        </h2>

        <div className="w-full grid lg:grid-cols-4 gap-3 md:grid-cols-2 vvsm:grid-cols-1 ">
          {chefs.map((value) => (
            <div
              className="relative max-w-max mx-auto lg:w-[100%] md:w-[90%] sm:w-[70%] vsm:w-[70%] vvsm:w-[70%] overflow-hidden rounded-3xl"
              key={value.id}
            >
              <img
                className=" object-cover transform hover:scale-105 transition ease-in-out duration-1000"
                src={value.image}
                alt={value.name}
              />
              <div className="absolute bottom-0 left-0 w-full p-2">
                <div
                  className="bg-black bg-opacity-80 w-full py-4 px-5 rounded-lg"
                  style={{
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <div className="mb-4 pb-3 border-b border-gray-700 hide-vsm-down">
                    <h3 className="mb-1 text-lg text-white font-bold leading-snug">
                      {value.name}
                    </h3>
                    <p className="text-gray-400 font-medium">{value.title}</p>
                  </div>
                  <div className="flex wrap items-center -m-2.5 ">
                    <div className="w-auto p-2.5">
                      <a
                        className="text-white hover:text-opacity-80 transition ease-in-out duration-200"
                        href="#"
                      >
                        <FaFacebook />
                      </a>
                    </div>
                    <div className="w-auto p-2.5">
                      <a
                        className="text-white hover:text-opacity-80 transition ease-in-out duration-200"
                        href="#"
                      >
                        <FaInstagram />
                      </a>
                    </div>
                    <div className="w-auto p-2.5">
                      <a
                        className="text-white hover:text-opacity-80 transition ease-in-out duration-200"
                        href="#"
                      >
                        <FaTwitter />
                      </a>
                    </div>
                    <div className="w-auto p-2.5">
                      <a
                        className="text-white hover:text-opacity-80 transition ease-in-out duration-200"
                        href="#"
                      >
                        <FaYoutube />
                      </a>
                    </div>
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

export default ChefTeam;
