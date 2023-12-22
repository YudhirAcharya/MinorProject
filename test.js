const fs = require("fs");
let countVeg = 0;
fs.readFile("./food.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const vegs = jsonData.filter((n) => {
      return n.VegOrNonVeg == "Vegetarian";
    });
    countVeg = vegs.length;
    console.log(countVeg);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
