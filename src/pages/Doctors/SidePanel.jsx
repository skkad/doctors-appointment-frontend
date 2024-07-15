import React from "react";
import convertTime from "../../utils/convertTime";
import { toast } from "react-toastify";
import axios from "axios";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  // console.log(timeSlots);
  const base_url = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const bookingHandler = async () => {
    try {
      axios
        .post(
          `${base_url}/bookings/checkout-session/${doctorId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("appointment", res);
          // toast.success(res.data.message);
          if (res.data.session.url) {
            window.location.href = res.data.session.url;
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 font-bold text-headingColor  ">
          {ticketPrice} INR
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold">Available Time Slots:</p>
        <ul className="mt-3">
          {timeSlots?.map((ele, index) => (
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {ele?.day.charAt(0).toUpperCase() + ele?.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(ele?.startingTime)} {" - "}{" "}
                {convertTime(ele?.endingTime)}
              </p>
            </li>
          ))}

          {/* <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Monday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4:00 PM - 09:30 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              4:00 PM - 09:30 PM
            </p>
          </li> */}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
