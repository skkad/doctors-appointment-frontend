import React from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorsAbout = ({ name, about, qualification, experience }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor text-semibold flex items-center gap-2  ">
          About of{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9  ">
            {name}
          </span>
        </h3>
        <p className="text_para">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor text-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualification?.map((el, id) => (
            <li
              key={id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] "
            >
              <div>
                <span className="text-irisBlueColor font-semibold text-[15px] leading-6  ">
                  {/* {formateDate("23-08-2008")} {"-"} {formateDate("14-05-2010")} */}
                  {formateDate(el.startingDate)}
                  {"-"} {formateDate(el.endingDate)}
                </span>
                <p className="text-textColor font-medium text-[16px] leading-6  ">
                  {el.degree}{" "}
                </p>
              </div>
              <p className="text-textColor font-medium text-[14px] leading-5  ">
                {el.university}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor text-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
          {experience?.map((el, id) => (
            <li key={id} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor font-semibold text-[15px] leading-6  ">
                {formateDate(el.startingDate)}
                {"-"} {formateDate(el.endingDate)}
              </span>
              <p className="text-textColor font-medium text-[16px] leading-6  ">
                {el.position}
              </p>
              <p className="text-textColor font-medium text-[14px] leading-5  ">
                {el.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsAbout;
