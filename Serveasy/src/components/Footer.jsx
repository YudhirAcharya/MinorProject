import React from "react";

const Footer = () => {
  return (
    <section className=" flex align-middle justify-between p-8">
      <div className="flex justify-start md:flex-row flex-row w-full mb-7 gap-3">
        <div className="flex flex-1 flex-col items-center">
          footer
          <img
            src="./public/logos/logo-no-background.png"
            alt=""
            className=" w-32  "
          />
          <p className=" pt-4 ">Order meal bla bla</p>
        </div>
        <div className=" border-2 flex flex-[3]  flex-row w-full justify-between ">
          footer notes
        </div>
      </div>
    </section>
  );
};

export default Footer;
