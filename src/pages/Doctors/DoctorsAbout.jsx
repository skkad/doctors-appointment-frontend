import React from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorsAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor text-semibold flex items-center gap-2  ">
          About of{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9  ">
            Muhibur Rahman
          </span>
        </h3>
        <p className="text_para">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non soluta
          qui iusto ipsum adipisci, iste labore distinctio ex, minus deserunt
          accusamus? Quaerat, unde aspernatur alias quae natus a iusto tempore?
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor text-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor font-semibold text-[15px] leading-6  ">
                {/* {formateDate("23-08-2008")} {"-"} {formateDate("14-05-2010")} */}
                {formateDate("08-23-2008")}
                {"-"} {formateDate("05-14-2010")}
              </span>
              <p className="text-textColor font-medium text-[16px] leading-6  ">
                PHD in Surgeon{" "}
              </p>
            </div>
            <p className="text-textColor font-medium text-[14px] leading-5  ">
              New Apollo Hospital, New York.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor font-semibold text-[15px] leading-6  ">
                {formateDate("08-23-2008")}
                {"-"} {formateDate("05-14-2010")}
              </span>
              <p className="text-textColor font-medium text-[16px] leading-6  ">
                PHD in Surgeon{" "}
              </p>
            </div>
            <p className="text-textColor font-medium text-[14px] leading-5  ">
              New Apollo Hospital, New York.
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor font-semibold text-[15px] leading-6  ">
                {formateDate("08-23-2008")}
                {"-"} {formateDate("05-14-2010")}
              </span>
              <p className="text-textColor font-medium text-[16px] leading-6  ">
                PHD in Surgeon{" "}
              </p>
            </div>
            <p className="text-textColor font-medium text-[14px] leading-5  ">
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor text-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor font-semibold text-[15px] leading-6  ">
              {formateDate("05-14-2010")}
            </span>
            <p className="text-textColor font-medium text-[16px] leading-6  ">
              Sr Surgeon
            </p>
            <p className="text-textColor font-medium text-[14px] leading-5  ">
              New Apollo Hospital, New York.
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor font-semibold text-[15px] leading-6  ">
              {formateDate("05-14-2010")}
            </span>
            <p className="text-textColor font-medium text-[16px] leading-6  ">
              Sr Surgeon
            </p>
            <p className="text-textColor font-medium text-[14px] leading-5  ">
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorsAbout;
