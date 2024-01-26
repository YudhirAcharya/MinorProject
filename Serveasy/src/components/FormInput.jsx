import React from "react";

const FormInput = (props) => {
  return (
    <div className="flex flex-col w-[270px]">
      <label htmlFor="">{props.title}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="border-2"
        name={props.name}
      />
    </div>
  );
};

export default FormInput;
