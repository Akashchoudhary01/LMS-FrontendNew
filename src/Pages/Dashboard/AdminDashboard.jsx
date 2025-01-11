import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/courseSlice";
import { getStatsData } from "../../Redux/statSlice";
import { getPaymentRecord } from "../../Redux/razorpaySlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state.course.coursesData);

  const handleCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));

      if (res.payload.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <Layout >
      <div className="min-h-[90vh]  flex flex-col items-center justify-center pt-5 px-4 sm:px-10 text-white gap-10">
        <h1 className="text-center mt-10 text-3xl font-semibold text-blue-700">
          Admin Dashboard
        </h1>

        <div className="justify-center items-center grid gap-10 sm:grid-cols-2 w-full">
          <div className="flex flex-col items-center gap-5 p-5 shadow-lg rounded-md bg-blue-300 w-full">
            <div className="w-full max-w-[400px] h-auto">
              <Pie data={userData} />
            </div>

            <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2">
              <div className="flex items-center justify-between bg-blue-600 py-5 px-4 gap-4 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between bg-blue-600 py-5 px-4 gap-4 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold ">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedUsersCount}</h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 p-5 shadow-lg rounded-md bg-blue-300 w-full">
            <div className="w-full max-w-[400px] h-auto">
              <Bar data={salesData} />
            </div>

            <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2">
              <div className="flex items-center justify-between bg-blue-600 py-5 px-4 gap-4 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscriptions Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between bg-blue-600 py-5 px-4 gap-4 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full items-center ml-5  justify-center  bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-between p-4">
            <h1 className="text-2xl font-semibold">Courses Overview</h1>
            <button
              onClick={() =>
                navigate("/course/create", {
                  state: {
                    initialCourseData: {
                      newCourse: true,
                      title: "",
                      category: "",
                      createdBy: "",
                      description: "",
                      thumbnail: undefined,
                      previewImage: "",
                    },
                  },
                })
              }
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg"
            >
              Create New Course
            </button>
          </div>

          <table className="w-full text-left table-auto text-wrap">
            <thead className="bg-gray-900">
              <tr>
                <th className="p-2">S No.</th>
                <th className="p-2">Course Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Instructor</th>
                <th className="p-2">Lectures</th>
                <th className="p-2">Description</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses?.map((course, index) => (
                <tr key={course._id} className="bg-gray-700">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{course.title}</td>
                  <td className="p-2">{course.category}</td>
                  <td className="p-2">{course.createdBy}</td>
                  <td className="p-2">{course.numberOfLectures}</td>
                  <td className="p-2 truncate">{course.description}</td>
                  <td className="p-2 flex gap-2">
                    <button className="bg-yellow-500 px-2 py-1 rounded">
                      <MdOutlineModeEdit />
                    </button>
                    <button onClick={handleCourseDelete}
                     className="bg-red-500 px-2 py-1 rounded">
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
