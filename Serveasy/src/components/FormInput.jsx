import React from "react";

const FormInput = (props) => {
  return (
    <div className="flex flex-col w-[220px]">
      <label htmlFor="">{props.title}</label>
      <input type={props.type} className="border-2" />
    </div>
  );
};

export default FormInput;
