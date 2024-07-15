import React, { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import userImg from "../../assets/images/doctor-img01.png";
import Profile from "./Profile";
import DoctorCard from "../../components/Doctors/DoctorsCard";
import useGetProfileData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const {
    data: appointments,
    loading,
    error,
  } = useGetProfileData(`${base_url}/users/appointments/my-appointments`);
  // const handleLogout = () => {
  //   dispatch({
  //     type: "LOGOUT",
  //   });
  // };
  console.log("appointemnt", appointments["data"]);
  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments["data"]?.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointments["data"]?.length === 0 && (
        <h2 className="mt-5 text-headingColor text-center leading-7 text-[20px] font-semibold text-primaryColor ">
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
