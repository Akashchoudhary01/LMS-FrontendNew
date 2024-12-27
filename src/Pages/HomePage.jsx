import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-60 h-[90vh]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold">
            Find Out The Best !{" "}
            <span className="text-blue-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We Have Large lybrary of courses tought by Highly and qualified
            facuilty at a very afforadable cost
          </p>
          <div className="space-x-6">
            <Link to="/courses">
              <button className="bg-blue-600 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-700 transition-all ease-in-out duration-300">
                Explore courses
              </button>
            </Link>

            <Link to="/contact">
              <button className=" px-5 py-3 rounded-md font-semibold text-lg border-2 border-blue-600 cursor-pointer hover:bg-blue-600 transition-all ease-in-out duration-300">
                Contact-us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
        <img src="" alt="Home Page image" />

        </div>
      </div>
    </HomeLayout>
  );
}
export default HomePage;
