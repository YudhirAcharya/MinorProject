import React from "react";

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <div className="flex flex-row items-center py-1 rounded ">
      <button
        className="cursor-pointer bg-tertiary px-5 rounded-lg text-black text-3xl border-none "
        onClick={() => setDecrease()}
      >
        -
      </button>
      <span className="px-6 py-4 rounded-lg text-warning font-semibold">
        {amount}
      </span>
      <button
        className="cursor-pointer bg-tertiary px-5 rounded-lg text-black text-3xl border-none"
        onClick={() => setIncrease()}
      >
        +
      </button>
    </div>
  );
};

export default CartAmountToggle;
