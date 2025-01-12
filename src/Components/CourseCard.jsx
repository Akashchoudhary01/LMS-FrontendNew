import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="text-black w-[18rem] h-[480px] shadow-[0_0_10px_black] lg:p-6 rounded-lg cursor-pointer group overflow-hidden bg-sky-100"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-48 rounded-tl-lg rounded-tr-lg m-auto group-hover:scale-[1.1] border border-gray-400 transition-all ease-in-out duration-300 "
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>

      {/* course details */}
      <div className="p-3 space-y-1 text-black">
        <h2 className="text-xl font-bold text-blue-500 line-clamp-2">
          {data?.title}
        </h2>
        <p className="line-clamp-2">{data?.description}</p>
        <p className="font-semibold">
          <span className="text-blue-500 font-bold">Category : </span>
          {data?.category}
        </p>
        <p className="font-semibold">
          <span className="text-blue-500 font-bold">Total Lectures : </span>
          {data?.numberOfLectures}
        </p>
        <p className="font-semibold">
          <span className="text-blue-500 font-bold">Instructor : </span>
          {data?.createdBy}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
