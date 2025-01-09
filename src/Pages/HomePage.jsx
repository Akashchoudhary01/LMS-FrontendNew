import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/main-image.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Layout>
     <div className="pt-10  h-[90vh] p-15 text-white flex flex-col-reverse  md:flex-row-reverse items-center justify-center gap-10   px-4">
      {/* Right Image Section (Moved to the Top on Mobile) */}
      <div className="w-full md:w-1/2 flex items-center justify-center order-1  md:mt-4 md:order-none">
        <img src={homePageMainImage} alt="Home Page" className="w-[70%] md:w-full max-w-sm md:max-w-none " />
      </div>
    
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:ml-10 md:text-left order-none md:order-1">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Find Out The Best!{" "}
          <span className="text-blue-500 font-bold">Online Courses</span>
        </h1>
        <p className="text-base md:text-xl text-gray-200">
          <span className=" font-bold text-red-600">CodeCraft</span> is your one-stop-shop for <span className=" text-blue-500">upscaling</span>. Get maximum value for time
          and resources you invest, with  <span className=" text-blue-500">job-ready courses </span> & high-technology,
          available at the lowest cost.
        </p>
    
        {/* Button Section */}
        <div className="flex  flex-col md:flex-row gap-4 md:gap-6 mb-2">
          <Link to="/courses">
            <button className="bg-blue-600 px-5 py-3 rounded-md font-semibold text-sm md:text-lg cursor-pointer hover:bg-blue-700 transition-all ease-in-out duration-300">
              Explore Courses
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-5 py-3 rounded-md font-semibold text-sm md:text-lg border cursor-pointer hover:bg-blue-600 hover:border-none transition-all ease-in-out duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Homepage;