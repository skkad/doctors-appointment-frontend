import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/images/signup.gif";
import avatar from "../../assets/images/doctor-img01.png";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { toast } from "react-toastify";
import axios from "axios";
import { HashLoader } from "react-spinners";

const Profile = ({ user }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // const data = await uploadImageToCloudinary(file);
    try {
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/upload`,
        data
      );
      console.log("file upload:", res.data);

      setSelectedFile(res.data.url);
      setFormData({ ...formData, photo: res.data.url });
    } catch (error) {
      // alert(error.message);
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(JSON.stringify(formData));
    let payload = {
      name: formData.fullname,
      email: formData.email,
      // password: formData.password,
      photo: formData.photo,
      gender: formData.gender,
      bloodType: formData.bloodType,
      // role: formData.role,
    };
    try {
      await axios
        .put(`${base_url}/users/${user["data"]._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
          navigate("/users/profile/me");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    setFormData({
      fullname: user["data"].name,
      email: user["data"].email,
      photo: user["data"].photo,
      gender: user["data"].gender,
      bloodType: user["data"].bloodType,
    });
  }, [user]);
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md "
          />
        </div>
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
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter Your Blood type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md "
          />
        </div>
        <div className="mb-5 flex items-center justify-between ">
          <label
            htmlFor=""
            className="text-headingColor font-bold text-[16px] leading-7 "
          >
            Gender:
            <select
              name="gender"
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none "
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="Select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3 ">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 boder-solid boder-primaryColor flex items-center justify-center  ">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px] ">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".png, .jpg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              {selectedFile ? selectedFile.name : "Upload File"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 "
          >
            {loading ? <HashLoader size={35} color="#fff" /> : "Update"}
          </button>
        </div>
        {/* <p className="mt-5 text-textColor text-center">
          Already have an account?
          <Link to="/login" className="text-primaryColor font-medium ml-1">
            Login
          </Link>
        </p> */}
      </form>
    </div>
  );
};

export default Profile;
