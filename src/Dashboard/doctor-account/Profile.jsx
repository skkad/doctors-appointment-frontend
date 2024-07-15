import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = ({ doctorData }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: null,
    qualifications: [
      // { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      // { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    timeSlots: [
      // { day: "", startingTime: "", endingTime: "" }
    ],
    about: "",
    photo: null,
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    // const data =
    try {
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/upload`,
        data
      );
      console.log("file upload:", res.data);
      // setPreviusURL(res.data.url);
      // setSelectedFile(res.data.url);
      setFormData({ ...formData, photo: res.data.url });
    } catch (error) {
      // alert(error.message);
      toast.error(error.response.data.message);
    }
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      gender: formData.gender,
      specialization: formData.specialization,
      ticketPrice: formData.ticketPrice,
      qualifications: formData.qualifications,
      experiences: formData.experiences,
      timeSlots: formData.timeSlots,
      about: formData.name,
      photo: formData.photo,
    };
    try {
      await axios
        .put(
          `${base_url}/doctors/${doctorData._id}`,
          // JSON.stringify(formData),
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // body: JSON.stringify(formData),
          }
        )
        .then((res) => {
          console.log(res);
          const result = res.data.data;
          toast.success(result.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // resuable function
  const addItem = (key, item) => {
    setFormData((prevItem) => ({
      ...prevItem,
      [key]: [...prevItem[key], item],
    }));
  };
  // resuable function
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = async (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExpreience = async (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const deleteExpreience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlots = async (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      startingTime: "",
      endingTime: "",
      day: "",
    });
  };

  const handleTimeSlotsChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  console.log("doctorData", doctorData);

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10 ">
        Profile Information
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="form_label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full name"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            readOnly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form_input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form_label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form_label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form_input"
              />
            </div>
          </div>
          <div className="mb-5">
            <p className="form_label">Qualifications*</p>
            {formData.qualifications?.map((ele, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={ele.startingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={ele.endingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Degree*</p>
                    <input
                      type="date"
                      name="degree"
                      value={ele.degree}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={ele.university}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer "
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
            <button
              onClick={addQualification}
              className="bg-[#000] py-2 px-5 rounded-full text-white h-fit cursor-pointer  "
            >
              Add Qualifications
            </button>
          </div>
          <div className="mb-5">
            <p className="form_label">Experience*</p>
            {formData.experiences?.map((ele, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={ele.startingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={ele.endingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={ele.position}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={ele.hospital}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExpreience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer "
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
            <button
              onClick={addExpreience}
              className="bg-[#000] py-2 px-5 rounded-full text-white h-fit cursor-pointer  "
            >
              Add Experience
            </button>
          </div>
          <div className="mb-5">
            <p className="form_label">Timeslots*</p>
            {formData.timeSlots?.map((ele, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form_label">Day*</p>
                    <select
                      name="day"
                      value={ele.day}
                      className="form_input py-3.5"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={ele.startingTime}
                      className="form_input"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={ele.endingTime}
                      className="form_input"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlots(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer "
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addTimeSlots}
              className="bg-[#000] py-2 px-5 rounded-full text-white h-fit cursor-pointer  "
            >
              Add Timeslot
            </button>
          </div>
          <div className="mb-5">
            <p className="form_label">About*</p>
            <textarea
              name="about"
              value={formData.about}
              placeholder="Write about you"
              rows={5}
              onChange={handleInputChange}
              className="form_input"
            ></textarea>
          </div>
          <div className="mb-5 flex items-center gap-3">
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
                Upload File
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-7">
        <button
          className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg "
          onClick={updateProfileHandler}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
