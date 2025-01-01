import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="text-white w-[18rem] h-[480px] shadow-lg lg:p-6 rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-48 rounded-tl-lg rounded-tr-lg m-auto group-hover:scale-[1.2]  transition-all ease-in-out duration-300 "
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>

      {/* course details */}
      <div className="p-3 space-y-1 text-white">

        <h2 className="text-xl text-center m-auto font-bold text-blue-500 line-clamp-2">
          {data?.title || "untitled course"}
        </h2>
        <p className="line-clamp-2">
            {data?.description || "No description available."}
            </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold">Category : </span>
          {data?.category || "Uncategorized"}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold">Total Lectures : </span>
          {data?.numberOfLectures || "N/A"}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold">Instructor : </span>
          {data?.createdBy || "undefined"}
        </p>
      </div>
    </div>
  );
};
export default CourseCard;
