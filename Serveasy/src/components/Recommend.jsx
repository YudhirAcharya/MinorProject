import React, { useState } from "react";

const Recommend = () => {
  const [foodName, setFoodName] = useState("");
  const [recommendations, setRecommendations] = useState(
    []
  );

  const handleRecommendation = async () => {
    const response = await fetch(
      "http://localhost:5000/recommend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ food_name: foodName }),
      }
    );

    const data = await response.json();
    setRecommendations(data);
  };

  return (
    <div>
      <h1>Food Recommendation</h1>
      <label htmlFor="foodInput">Enter a food item:</label>
      <input
        type="text"
        id="foodInput"
        placeholder="Enter food name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <button onClick={handleRecommendation}>
        Recommend
      </button>
      <h2>Recommended Foods:</h2>
      <ul>
        {recommendations.map(([recipe, score]) => (
          <li
            key={recipe}
          >{`${recipe} - Score: ${score}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommend;
