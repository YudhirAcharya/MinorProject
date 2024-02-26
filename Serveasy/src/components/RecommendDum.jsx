import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import FeatureSection from "./FeatureSection";

function RecommendDum(props) {
  const currentUser_ID = props.user_id;
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState(
    []
  );
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await axios.get(
          "http://127.0.0.1:3001/users/recommendationData"
        );
        const dataRows =
          ordersResponse.data?.data?.rows || [];
        const sortedOrders = Array.isArray(dataRows)
          ? dataRows.sort(
              (a, b) => b.created_at - a.created_at
            )
          : [];

        const userOrders = sortedOrders
          .filter(
            (order) => order.user_id === currentUser_ID
          )
          .slice(0, 5);
        setOrders(userOrders);

        const recipeNames = userOrders.map(
          (order) => order.recipe_name
        );

        // Fetch recommendations
        const recommendationsResponse = await axios.post(
          "http://127.0.0.1:5000/recommend_multi",
          { recipe_names: recipeNames }
        );
        setRecommendations(
          recommendationsResponse.data.recommendations
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser_ID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch food details
        const response = await fetch(
          "http://127.0.0.1:3001/foods"
        );
        const data = await response.json();
        setFoods(data.data.rows);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);

  const matchedFoods = foods.filter((food) =>
    recommendations.some(
      (recommendation) =>
        recommendation.name === food.TranslatedRecipeName
    )
  );

  return (
    <>
      <h2 className="greeting bg-amber-400 text-lg">
        Welcome Back! {orders[0]?.user_name || "User"}
      </h2>
      <div className="container pt-2 p-1 mt-2 mb-4">
        <div className="flex items-start">
          <div className="order-title w-1/5 pr-5">
            <span className="block font-bold mb-2 p-1">
              Your last orders were:
            </span>
            <div className="order-list">
              {orders.map((order) => (
                <div
                  key={order.delivered_id}
                  className="order-item border bg-amber-100 p-2 shadow-md mb-3 rounded"
                >
                  <strong>{order.recipe_name}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="recommendation-section ">
            <div className="recommendations grid grid-cols-4 gap-4 ">
              {matchedFoods.map((matchedFood, index) => (
                <ProductCard
                  key={matchedFood.FoodID}
                  id={matchedFood.FoodID}
                  img={matchedFood.imageurl}
                  name={matchedFood.TranslatedRecipeName}
                  price={matchedFood.price}
                  TotalTimeInMins={
                    matchedFood.TotalTimeInMins
                  }
                  cuisine={matchedFood.Cuisine}
                  CleanedIngredients={
                    matchedFood.CleanedIngredients
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <FeatureSection />
    </>
  );
}

const orderListStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "25px",
};

const orderItemStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  width: "200px",
  marginBottom: "10px",
  borderRadius: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const cardsContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "space-around",
};

export default RecommendDum;
