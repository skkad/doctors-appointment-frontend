import React, { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import userImg from "../../assets/images/doctor-img01.png";
import Tab from "./Tab";
import useGetProfileData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import strarIcon from "../../assets/images/Star.png";
import DoctorsAbout from "../../pages/Doctors/DoctorsAbout";
import Profile from "./Profile";
import Appointment from "./Appointment";

const Dashboard = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("overview");
  const { data, loading, error } = useGetProfileData(
    `${base_url}/doctors/profile/me`
  );
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  console.log("data", data);
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto ">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] ">
            <Tab tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data["data"]?.isApproved === "pending" && (
                <div className="flex p-4 mb-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  {/* <svg></svg> infor icons*/}

                  <svg
                    fill="#c4c4c4"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="20px"
                    height="20px"
                    viewBox="0 0 416.979 416.979"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll
                    review manually and approve within 3days.
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={data["data"]?.photo}
                          alt=""
                          className="w-full"
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold rounded ">
                          {data["data"]?.specialization}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3 ">
                          {data["data"]?.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold ">
                            <img src={strarIcon} alt="" />{" "}
                            {data["data"]?.averageRating}
                          </span>
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold ">
                            ({data["data"]?.totalRating})
                          </span>
                        </div>
                        <p className="text_para font-[15px] lg:max-w-[390px] leading-6">
                          {data["data"]?.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorsAbout
                      about={data["data"]?.about}
                      name={data["data"]?.name}
                      qualification={data["data"]?.qualifications}
                      experience={data["data"]?.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointment appointments={data["data"].appointments} />
                )}
                {tab === "settings" && <Profile doctorData={data["data"]} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
