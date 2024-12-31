import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from '../Layouts/HomeLayout'
import CourseCard from "../Components/courseCard";
import {getAllCourses} from '../redux/Slices/CourseSlice'

const Courses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
    })();
  }, []);

  return (
    <HomeLayout>
      {/* courses container for displaying the cards */}
      <div className="min-h-[90vh] pt-12 pl-8 flex flex-col flex-wrap gap-10  text-white">
        <h1 className="text-center text-3xl mt-6 font-semibold">
          Explore the courses made by{" "}
          <span className="font-bold text-blue-500">Industry Experts</span>
        </h1>

        {/* wrapper for courses card */}
        <div className="mb-10 justify-center items-center flex flex-wrap gap-14">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Courses;