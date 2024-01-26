import React from "react";
import FormInput from "../components/FormInput";
import { useRef } from "react";
const Signup = () => {
  const fullNameRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault(); //to prevent refresh on click
    console.log(fullNameRef);
    const data = new FormData(event.target);
    //user data
    console.log(Object.fromEntries(data.entries()));
  };
  return (
    <div className="flex flex-col w-4/5 md:w-1/2 border-2 text-center justify-center mx-auto my-auto pb-5">
      Sign Up
      <form
        action=""
        className=" flex flex-col items-center "
        onSubmit={handleSubmit}
      >
        <FormInput
          title="Full Name"
          type="text"
          placeholder="Gregor Clegane"
          name="fullname"
        />
        <FormInput
          title="User Name"
          type="text"
          placeholder="Gregor Gigglesbane"
          name="username"
        />
        <FormInput
          title="Email"
          type="email"
          placeholder="GregorGiggles@gmail.com"
          name="email"
        />
        <FormInput title="Password" type="password" />
        <FormInput
          title="Confirm Password"
          type="password"
        />
        <button className=" border-2 rounded-md m-2 p-2 bg-primaryColor">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
