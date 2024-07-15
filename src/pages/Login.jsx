import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(JSON.stringify(formData));
    let payload = {
      email: formData.email,
      password: formData.password,
    };
    // let payload = JSON.stringify(formData);
    try {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, payload)
        .then((res) => {
          console.log(res);
          setLoading(false);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: res.data.data,
              role: res.data.role,
              token: res.data.token,
            },
          });
          toast.success(res.data.message);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-[10px]">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ">
          Hello <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form action="" className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md "
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md "
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 "
            >
              {loading ? <HashLoader size={35} color="#fff" /> : "Login"}
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
