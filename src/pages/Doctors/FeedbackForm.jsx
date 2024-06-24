import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const handleSubmitFeedback = async () => {};
  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 mb-4 mt-0 font-semibold ">
          How would you rate the overall experience?*
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (rating && hover) || hover
                    ? "text-yellowColor"
                    : "text-gray-400"
                }`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 mb-4 mt-0 font-semibold ">
          Share your feedback or suggestions*
        </h3>
        <textarea
          name=""
          id=""
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md "
          row="5"
          placeholder="Write your message"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button className="btn" onClick={handleSubmitFeedback}>
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
