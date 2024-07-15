import axios from "axios";

const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);
  //   const res = await axios.post(
  //     `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
  //     uploadData
  //   );
  //   const data = res.json();
  const res = await fetch(
    // CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@medicarebookingsystem
    // `https://api.cloudinary.com//v1_1/${cloud_name}/image/upload`,
    `${process.env.REACT_APP_CLOUDINARY_URL}/v1_1/${cloud_name}/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );
  const data = await res.json();
  return data;
};
export default uploadImageToCloudinary;
