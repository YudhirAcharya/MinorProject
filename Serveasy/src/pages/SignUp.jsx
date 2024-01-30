import FormInput from "../components/FormInput";
import { useState } from "react";
import { SignUpinputs } from "../constants";

const Signup = () => {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault(); //to prevent refresh on click
  };
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value, //update target name by value
    });
  };
  console.log(values);
  return (
    <div className="flex flex-col w-4/5 md:w-1/2 border-2 text-center justify-center mx-auto my-auto pb-5">
      Sign Up
      <form
        action=""
        className=" flex flex-col items-center "
        onSubmit={handleSubmit}
      >
        {SignUpinputs.map((item) => {
          return (
            <FormInput
              key={item.id}
              {...item}
              value={values[item.name]}
              onChange={onChange}
            />
          );
        })}
        {console.log(typeof SignUpinputs[0].pattern)}
        <button className=" border-2 rounded-md m-2 p-2 bg-primaryColor">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
