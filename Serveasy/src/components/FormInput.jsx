import React from "react";
import { SignUpinputs } from "../constants";
import "./FormInput.css";
const FormInput = (props) => {
  return (
    <div className="flex flex-col w-[270px]">
      <label htmlFor="">{props.title}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="border-[1px] p-[2px] "
        name={props.name}
        onChange={props.onChange}
        pattern={props.pattern}
        required
      />
      <span>{props.errorMessage}</span>
    </div>
  );
};

export default FormInput;
