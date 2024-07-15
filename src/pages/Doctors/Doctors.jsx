import React, { useEffect, useState } from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorsCard from "../../components/Doctors/DoctorsCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const handleSearch = () => {
    setQuery(query.trim());
    setDebounceQuery(query.trim());
    console.log("handle search");
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${base_url}/doctors?query=${debounceQuery}`);

  useEffect(() => {
    console.log("API URL:", `${base_url}/doctors?query=${debounceQuery}`);
  }, [debounceQuery]);
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              placeholder="Search"
              className="py-4 pl-2 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="btn mt-0 rounded-[0px] rounded-r-md "
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]  ">
              {doctors["data"]?.map((doctor, index) => (
                <DoctorsCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health System offers
              unmatched,expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
