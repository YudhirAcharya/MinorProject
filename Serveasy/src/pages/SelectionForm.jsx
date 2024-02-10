import React from "react";

const SelectionForm = () => {
  return (
    <div className="flex flex-col">
      <span className=" text-[40px]  text-center mb-8">
        Filter Your Choice
      </span>
      <div className=" flex align-middle  justify-evenly ">
        <div className="cusineSelect flex flex-col">
          <div>
            <input type="checkbox" id="northIndian" />
            <label htmlFor="northIndian">
              North Indian
            </label>
          </div>
          <div>
            <input type="checkbox" id="northIndian" />
            <label htmlFor="northIndian">
              North Indian
            </label>
          </div>
          <div>
            <input type="checkbox" id="northIndian" />
            <label htmlFor="northIndian">
              North Indian
            </label>
          </div>
          <div>
            <input type="checkbox" id="northIndian" />
            <label htmlFor="northIndian">
              North Indian
            </label>
          </div>
        </div>

        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <label htmlFor="meal">
                Your Prefered Meal
              </label>
            </div>
            <input
              id="meal"
              type="text"
              placeholder="Chicken Tikka Masala"
            />
          </div>

          <button
            type="submit"
            className=" border border-solid p-2"
          >
            Submit
          </button>
        </form>
        <div>Recommended meals</div>
      </div>
    </div>
  );
};

export default SelectionForm;
