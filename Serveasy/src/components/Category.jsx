import CategoryCard from "./CategoryCard";
import { data } from "../constants";
const Category = () => {
  return (
    <div className="container shadow-none py-10 px-6 min-h-[10vh] min-w-full">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((el) => (
          <CategoryCard
            key={el.id}
            img={el.food_image_url}
            name={el.meal_name}
            count={el.meal_quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
