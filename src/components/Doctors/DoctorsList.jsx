import React from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorsCard from "./DoctorsCard";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../Error/Error";

const DoctorsList = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const { data: doctors, loading, error } = useFetchData(`${base_url}/doctors`);
  console.log(doctors);
  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]  ">
          {doctors["data"]?.map((doctor, index) => (
            <DoctorsCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorsList;
