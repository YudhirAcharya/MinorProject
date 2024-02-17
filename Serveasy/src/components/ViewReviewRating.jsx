/* eslint-disable react/prop-types */
import StarRatingComponent from "react-star-rating-component";
import { useState, useEffect } from "react";

const ViewReviewRating = ({ FoodID }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/users/getReviews/${FoodID}`
        );
        if (!response.ok) {
          throw new Error("Failed to get reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, [FoodID]);

  return (
    <div>
      <div className="bg-white flex justify-center  min-h-[80vh] p-1">
        <div className="md:w-[90%] w-full h-full px-6 flex flex-col gap-2 p-5 bg-cartBg text-white">
          <h1 className="py-5 text-lg text-lightColor font-bold">Reviews</h1>
          <div className="flex flex-col gap-3">
            {reviews
              .filter((_, i) => i < 4)
              .map((review, index) => {
                // console.log(review);
                return (
                  <div
                    className="flex flex-col gap-4 bg-lightColor p-4 text-textColor"
                    key={index}
                  >
                    <div className="flex justify justify-between">
                      <div className="flex gap-2">
                        <h2 className="font-semibold">{review.user_id}</h2>
                      </div>
                      <div className="flex p-1 gap-1 text-primary">
                        <StarRatingComponent
                          name="rate"
                          editing={false}
                          className="text-[1.3rem] tracking-[0.35rem]"
                          starCount={5}
                          value={review.rating}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-normal">{review.review}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReviewRating;
