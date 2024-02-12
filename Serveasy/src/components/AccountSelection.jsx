import React, { useState } from "react";

const TabContent = ({ activeIndex, setActiveIndex }) => {
  const tabContents = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, e",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolor",
  ];

  return (
    <div>
      <p className="m-0">{tabContents[activeIndex]}</p>
    </div>
  );
};

const AccountSelection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabOptions = ["User", "Chef", "Delivery"];

  return (
    <div className="flex flex-row">
      <div className="flex-3 p-4"></div>
      <div className="flex-1 text-[25px]">
        Switch Account
        <div className="flex mb-2 gap-2 justify-content-end text-[15px]">
          {tabOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-auto h-auto p-3 border rounded-4 ${activeIndex === index ? "bg-blue-500 text-white" : "border-blue-500"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div>
          <TabContent
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSelection;
