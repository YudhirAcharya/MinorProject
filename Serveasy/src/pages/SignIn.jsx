import React from "react";
import FormInput from "../components/FormInput";
import { useState } from "react";
const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); //to prevent refresh on click
    const data = new FormData(event.target);
    //log user data
    console.log(Object.fromEntries(data.entries()));
  };

  return (
    <div className="flex flex-col w-4/5 md:w-1/2 border-2 text-center justify-center mx-auto my-auto pb-5">
      Sign In
      <form
        action=""
        className=" flex flex-col items-center "
        onSubmit={handleSubmit}
      >
        <FormInput
          title="Email"
          type="email"
          placeholder="GregorGiggles@gmail.com"
          name="email"
        />
        <FormInput title="Password" type="password" />
        <button className=" border-2 rounded-md m-2 p-2 bg-primaryColor">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
