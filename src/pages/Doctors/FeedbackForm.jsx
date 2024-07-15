import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { useParams } from "react-router-dom";

const FeedbackForm = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState("");
  const { id } = useParams();
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Rating & Review Fields are required");
      }
      let payload = {
        rating: rating,
        reviewText: reviewText,
      };
      axios
        .post(`${base_url}/doctors/${id}/reviews`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("feedback", res);
          setLoading(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log("feedback", error);
      toast.error(error.response.data.message);
    }
  };
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
        {loading ? <HashLoader size={35} color="#fff" /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
