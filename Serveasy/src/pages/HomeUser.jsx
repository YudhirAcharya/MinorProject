import React, { useState, useEffect } from "react";
import RecommendDum from "../components/RecommendDum";
import AfterSelectionProducts from "../components/AfterSelectionProducts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const currentUser_id = "u_fjZn9UjwdwdnYY9Y"; //u_fjZn9UjnYY9Y
const apiUrl = "http://127.0.0.1:3001/users/recommendationData";

const HomeUser = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const userExistsInData = data.data.rows.some(
          (row) => row.user_id === currentUser_id
        );

        setUserExists(userExistsInData);
      } catch (error) {
        console.error("Error fetching recommendation data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {userExists ? (
        <RecommendDum user_id={currentUser_id} />
      ) : (
        <AfterSelectionProducts />
      )}
      <Footer />
    </div>
  );
};

export default HomeUser;
