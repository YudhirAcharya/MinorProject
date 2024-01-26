import React from "react";
import FormInput from "../components/FormInput";

const Signup = () => {
  return (
    <div className="flex flex-col  w-1/2  border-2 text-center justify-center mx-auto my-auto pb-5">
      Sign Up
      <form
        action=""
        className=" flex flex-col items-center "
      >
        <FormInput title="Full Name" type="text" />
        <FormInput title="User Name" type="text" />
        <FormInput title="Email" type="email" />
        <FormInput title="Password" type="password" />
        <FormInput
          title="Confirm Password"
          type="password"
        />
      </form>
    </div>
  );
};

export default Signup;
