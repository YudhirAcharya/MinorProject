import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const currentUser_id = "u_9iFLIhMa8QaG";

function RecommendDum() {
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState(
    []
  );
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user orders
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
            (order) => order.user_id === currentUser_id
          )
          .slice(0, 5);

        setOrders(userOrders);

        // Extract recipe names for recommendations
        const recipeNames = userOrders.map(
          (order) => order.recipe_name
        );

        // Fetch recommendations based on recipe names
        const recommendationsResponse = await axios.post(
          "http://127.0.0.1:5000/recommend_multi",
          { recipe_names: recipeNames }
        );

        setRecommendations(
          recommendationsResponse.data.recommendations
        );
      } catch (error) {
        console.error(
          "Error fetching recommendations:",
          error
        );
      }
    };

    fetchData();
  }, []);

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
    <div>
      <h2
        style={{ fontSize: "35px", padding: "10px" }}
      >{`Hello! ${orders[0]?.user_name || "User"}`}</h2>
      <div className="flex">
        <div className="flex-80">
          <span
            style={{ fontSize: "20px", marginLeft: "5px" }}
          >
            Your last orders were:
          </span>
          <div style={orderListStyle}>
            {orders.map((order) => (
              <div
                key={order.delivered_id}
                style={orderItemStyle}
              >
                <strong>{order.recipe_name}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-20">
          <h3
            style={{ fontSize: "20px", marginLeft: "30px" }}
          >
            Based upon your previous orders we recommend
            you:{" "}
          </h3>
          <div style={cardsContainer}>
            {matchedFoods.map((matchedFood, index) => (
              <div
                to={`/products/${matchedFood.FoodID}`}
                key={index}
                style={cardStyle}
              >
                <Link
                  to={`/products/${matchedFood.FoodID}`}
                >
                  <img
                    src={matchedFood.imageurl}
                    alt={matchedFood.TranslatedRecipeName}
                    style={cardImageStyle}
                  />
                </Link>
                <div style={cardContentStyle}>
                  <p
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    {matchedFood.TranslatedRecipeName}
                  </p>

                  <button style={priceStyle}>
                    <img
                      style={{ width: "30px" }}
                      src="../public/icons/shopping-bag.png"
                    ></img>
                    <span style={{ paddingTop: "4px" }}>
                      Rs {matchedFood.price}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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

const cardStyle = {
  position: "relative",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  width: "212px",
  height: "272px",
  border: "2px solid #FDE325",
  padding: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "200px",
  zIndex: "1",
  transition: "transform 0.3s ease-in-out", // Example: Add a smooth transition
  cursor: "pointer", // Add a pointer cursor on hover
};

const cardImageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
};

const cardContentStyle = {
  padding: "12px",

  textAlign: "center",
  position: "relative",
  overflow: "hidden", // Add this to hide overflow
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3, // Limit to 2 lines
  height: "200px",
  zIndex: "2",
  textOverflow: "ellipsis", // Add ellipsis for overflow
  transition: "background-color 0.3s ease-in-out", // Example: Add a smooth transition
};

const priceStyle = {
  position: "absolute",
  top: "70px", // Position at the top
  left: "70px",
  right: "0",
  color: "white",
  backgroundColor: "rgba(100, 0, 0, 0.8)",
  padding: "3px",
  display: "flex",
  borderRadius: "10px",
  borderBottom: "1px solid #ddd", // Use borderBottom instead of borderTop
  fontSize: "17px",
  zIndex: 10,
};

export default RecommendDum;
