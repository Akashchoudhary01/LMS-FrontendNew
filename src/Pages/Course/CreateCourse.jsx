// export default CreateCourse;
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { createNewCourse, updateCourse } from "../../Redux/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback for initialCourseData if no state is provided
  const initialCourseData = location.state?.initialCourseData || {
    newCourse: true,
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: { secure_url: "" },
    _id: null,
  };

  const [isDisabled, setIsDisabled] = useState(!initialCourseData.newCourse);

  const [userInput, setUserInput] = useState({
    title: initialCourseData.title,
    category: initialCourseData.category,
    createdBy: initialCourseData.createdBy,
    description: initialCourseData.description,
    thumbnail: null,
    previewImage: initialCourseData.thumbnail?.secure_url,
  });

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let res;

    if (initialCourseData.newCourse) {
      if (
        !userInput.title ||
        !userInput.category ||
        !userInput.createdBy ||
        !userInput.description ||
        !userInput.thumbnail
      ) {
        toast.error("All fields are mandatory");
        return;
      }
      res = await dispatch(createNewCourse(userInput));
    } else {
      if (
        !userInput.title ||
        !userInput.category ||
        !userInput.createdBy ||
        !userInput.description
      ) {
        toast.error("All fields are mandatory");
        return;
      }

      const data = { ...userInput, id: initialCourseData._id };
      res = await dispatch(updateCourse(data));
    }

    if (res?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      setIsDisabled(false);
      navigate("/admin/dashboard");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[80%] my-10 shadow-[0_0_10px_black]  relative"
        >
          <Link
            to={"/admin/dashboard"}
            className="absolute top-8 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className=" text-center text-2xl font-bold">
            {!initialCourseData.newCourse ? "Update" : "Create New"} Course
          </h1>

          <main className=" flex flex-col md:grid md:grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div
                onClick={() =>
                  !initialCourseData.newCourse &&
                  toast.error("Cannot update thumbnail image")
                }
              >
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  onChange={getImage}
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  disabled={isDisabled}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructor name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            className="w-full bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            {!initialCourseData.newCourse ? "Update Course" : "Create Course"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
