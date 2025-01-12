import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
    })();
  }, []);

  return (
    <Layout>
      <div className="min-h-[90vh]  flex flex-col items-center justify-center">

      {/* courses container for displaying the cards */}
      <div className=" flex pt-20 flex-wrap gap-10 text-black items-center justify-center">
        <h1 className="text-center text-3xl font-semibold">
          Explore the courses made by{" "}
          <span className="font-bold text-blue-500">Industry Experts</span>
        </h1>

        {/* wrapper for courses card */}
        <div className="mb-10 justify-center items-center flex flex-wrap gap-5">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
          </div>
    </Layout>
  );
};

export default Courses;