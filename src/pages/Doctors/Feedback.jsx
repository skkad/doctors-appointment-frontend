import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] text-headingColor font-bold mb-[30px] ">
          All reviews ({totalRating !== 0 ? totalRating : reviews.length})
        </h4>
        {reviews?.map((ele, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full ">
                <img className="w-full" src={ele?.user?.photo} alt="" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold ">
                  {ele?.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor ">
                  {formateDate(ele?.createdAt)}
                </p>
                <p className="text_para mt-3 font-medium text-[15px]">
                  {ele?.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(ele?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}

        {!showFeedbackForm && (
          <div className="text-center">
            <button className="btn" onClick={() => setShowFeedbackForm(true)}>
              Give Feedback
            </button>
          </div>
        )}
        {showFeedbackForm && <FeedbackForm />}
      </div>
    </div>
  );
};

export default Feedback;
