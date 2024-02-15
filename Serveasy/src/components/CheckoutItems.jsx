/* eslint-disable react/prop-types */

const CheckoutItems = ({
  // order_id,
  food_name,
  // ingredients,
  price,
  amount,
  delivery_time,
  imageurl,
}) => {
  return (
    <li className="grid grid-cols-6 gap-2 border-b-1">
      <div className="col-span-1 self-center">
        <img src={imageurl} alt="Product" className="rounded w-full h-25" />
      </div>

      <div className="flex flex-col col-span-3 pt-2">
        <span className="text-gray-600 text-md font-semi-bold">
          {food_name}
        </span>
        <span className="text-gray-400 text-sm inline-block pt-2">
          Delivery Time: {delivery_time} minutes
        </span>
      </div>
      <div className="col-span-2 pt-3">
        <div className="flex items-center space-x-2 text-sm justify-between">
          <span className="text-gray-400">
            {amount} x Rs.{price}
          </span>
          <span className="text-primary font-semibold inline-block">
            Rs.{price * amount}
          </span>
        </div>
      </div>
    </li>
  );
};

export default CheckoutItems;
