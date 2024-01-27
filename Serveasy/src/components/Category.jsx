import CategoryCard from "./CategoryCard";
import { data } from "../constants";
const Category = () => {
  return (
    <div className="container pt-16">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
