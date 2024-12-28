import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import mainImage from '../assets/images/main-image.png/'

function HomePage() {
  return (
    <HomeLayout>
       <div className="pt-10 h-[90vh] text-white flex flex-col-reverse md:flex-row items-center justify-center gap-20   px-4">
  {/* Right Image Section (Moved to the Top on Mobile) */}
  <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-none">
    <img src={mainImage} alt="Home Page" className="w-3/4 md:w-full max-w-sm md:max-w-none" />
  </div>

  {/* Left Content Section */}
  <div className="w-full md:w-1/2 space-y-6 text-center md:text-left order-none md:order-1">
    <h1 className="text-3xl md:text-5xl font-semibold">
      Find Out The Best!{" "}
      <span className="text-blue-500 font-bold">Online Courses</span>
    </h1>
    <p className="text-base md:text-xl text-gray-200">
      We Have a Large Library of Courses Taught by Highly Qualified Faculty at a Very Affordable Cost
    </p>

    {/* Button Section */}
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-1">
      <Link to="/courses">
        <button className="bg-blue-600 px-5 py-3 rounded-md font-semibold text-sm md:text-lg cursor-pointer hover:bg-blue-700 transition-all ease-in-out duration-300">
          Explore Courses
        </button>
      </Link>
      <Link to="/contact">
        <button className="px-5 py-3 rounded-md font-semibold text-sm md:text-lg border-2 border-blue-600 cursor-pointer hover:bg-blue-600 transition-all ease-in-out duration-300">
          Contact Us
        </button>
      </Link>
    </div>
  </div>
</div>

    </HomeLayout>
  );
}
export default HomePage;
