import React, { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(err.response.data.message);
          throw new Error(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error };
};

export default useFetchData;
