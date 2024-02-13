import { useProductContext } from "../context/productContext";
import ProductCard from "./ProductCard";
const FeatureSection = () => {
  const { isLoading, products } = useProductContext();

  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div className="container flex-col shadow-none py-10  px-6 rounded-none min-w-full">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">Most Selling Foods:</h3>
          <p className="text-gray-600 mt-2">
            Most trending meals in the market.
          </p>
        </div>
        <div className="space-x-4 mt-8 lg:mt-0">
          <button className="feature_btn">Breakfast</button>
          <button className="text-gray-600 hover:text-secondary">Lunch</button>
          <button className="text-gray-600 hover:text-secondary">Dinner</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
          <img
            src="public\images\chefs-kiss-french-chef.gif"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.FoodID}
              id={product.FoodID}
              img={product.imageurl}
              name={product.TranslatedRecipeName}
              price={product.price}
              cuisine={product.Cuisine}
              ingredients={product.CleanedIngredients}
            />
          ))}
      </div>
    </div>
  );
};

export default FeatureSection;
