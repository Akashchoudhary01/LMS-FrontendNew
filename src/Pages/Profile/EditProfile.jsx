import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUserData, updateProfile } from "../../redux/Slices/AuthSlice";
import HomeLayout from "../../Layouts/HomeLayout";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state?.auth?.data?._id); // Move useSelector outside useState
  const [previewImage, setImagePreview] = useState("");
  const [data, setData] = useState({
    fullName: "",
    avatar: undefined,
    userID,
  });

  const getImage = (event) => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setData({
        ...data,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  const setName = (event) => {
    const { name, value } = event.target;
    const newUserData = { ...data, [name]: value };
    setData(newUserData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Name should have more than 5 characters");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("avatar", data.avatar);

      const newUserData = [data.userID, formData];

      await dispatch(updateProfile(newUserData));
      await dispatch(getUserData());

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Edit Profile Page</h1>

          <label className="cursor-pointer" htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={previewImage}
                alt="preview"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto text-gray-400" />
 )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
            aria-label="Upload your avatar"
          />

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={setName}
            />
          </div>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
