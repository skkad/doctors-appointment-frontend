import React, { useState } from "react";
import doctorsImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import Doctors from "./Doctors";
import DoctorsAbout from "./DoctorsAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px] ">
                <img className="w-full" src={doctorsImg} alt="" />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6  lg:py-2 lg:px-6 text-[12px] lg:text-[16px] leading-4 lg:leadin-7 font-semibold rounded  ">
                  Surgen
                </span>
                <h3 className="text-headingColor mt-3 font-bold leading-9 text-[22px] ">
                  Muhibur Rehman
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor ">
                    <img src={starIcon} alt="" /> {"4.8"}
                  </span>
                  <span className="text-[14px] leading-6 lg:text-[16px] leading-4 lg:leading-7 font-[400] text-textColor ">
                    ({272})
                  </span>
                </div>
                <p className="text_para text-[14px] md:text-[15px] leading-6 lg:max-w-[390px] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  nihil repudiandae ipsum quasi veniam vitae et illo temporibus
                  commodi id! Distinctio beatae nam non quidem, aliquam fugit
                  dolorum repudiandae quisquam.
                </p>
              </div>
            </div>
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]  ">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" &&
                  "border-b border-solid border-primaryColor "
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold `}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor "
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold `}
              >
                Feedback
              </button>
            </div>
            <div className="mt-[50px]">
              {tab === "about" && <DoctorsAbout />}
              {tab === "feedback" && <Feedback />}
            </div>
          </div>
          <div>
            <SidePanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
