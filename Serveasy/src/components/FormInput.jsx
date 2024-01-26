import React from "react";
import { SignUpinputs } from "../constants";

const FormInput = (props) => {
  return (
    <div className="flex flex-col w-[270px]">
      <label htmlFor="">{props.title}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="border-2 "
        name={props.name}
        onChange={props.onChange}
      />
      <span
        className={`text-sm text-warningColor hidden ${props.isValid ? "hidden" : "block"}`}
      >
        {props.errorMessage}
      </span>
    </div>
  );
};

export default FormInput;
