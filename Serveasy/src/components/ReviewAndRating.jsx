/* eslint-disable react/prop-types */
import { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
const ReviewAndRating = ({ name }) => {
  const food_name = name;
  let user_id = localStorage.getItem("userId");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  // console.log(food_name);

  const handleReviewSubmit = async () => {
    const reviewData = {
      user_id: user_id,
      food_name: food_name,
      review: review,
      rating: rating,
    };
    console.log(reviewData);
    try {
      const response = await fetch("http://127.0.0.1:3001/users/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      console.log("Review submitted!");
      setReview("");
      setRating(0);
    } catch (err) {
      alert("You haven't even bought this!!!");
    }
  };
  return (
    <section>
      <div className="min-h-[80vh] flex flex-col justify-center ">
        <div className=" sm:min-w-xl  sm:mx-auto">
          <div className="bg-white vvsm:w-[100%] vvsm:mx-auto w-[100%] flex flex-col rounded-xl shadow-lg">
            <div className=" px-12 py-2">
              <h2 className="text-gray-800 text-3xl font-semibold ">
                Your opinion matters to us!
              </h2>
            </div>
            <div className="bg-lightColor w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-lg text-gray-800">How was the food?</span>
                <div className="flex space-x-3">
                  <StarRatingComponent
                    name="rating"
                    className="text-[2rem] tracking-[0.75rem]"
                    starCount={5}
                    value={rating}
                    onStarClick={(value) => setRating(value)}
                  />
                </div>
              </div>
              <div className="w-3/4 flex flex-col">
                <textarea
                  rows="3"
                  className="p-4 text-headingColor rounded-xl resize-none border-black border-2"
                  placeholder="Leave a review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <button
                  className="py-3 my-8 text-lg bg-gradient-to-r from-primary to-warning rounded-xl text-white"
                  onClick={handleReviewSubmit}
                >
                  Rate now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewAndRating;
