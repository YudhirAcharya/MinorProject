function recommendRecipe() {
  const recipeInput =
    document.getElementById("recipeInput").value;

  // Make a POST request to the Flask server
  fetch("http://localhost:5000/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipe_name: recipeInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the recommendations on the page
      const recommendationsDiv = document.getElementById(
        "recommendations"
      );
      recommendationsDiv.innerHTML =
        "<h2>Recommendations:</h2>";

      data.recommendations.forEach((recipe) => {
        recommendationsDiv.innerHTML += `<p>${recipe.name}</p>`;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
