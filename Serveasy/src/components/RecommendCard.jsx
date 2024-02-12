import React from "react";
import { Recipe } from "../constants/indianFoodDataset";
const RecommendCard = ({ recommendation }) => {
  return <p>{recommendation.TranslatedRecipeName}</p>;
};

export default RecommendCard;
