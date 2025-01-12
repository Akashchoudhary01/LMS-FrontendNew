import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";
import logo from '../Assets/Images/logo.png'

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking user logged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for dispaying the options, according to user role
  const role = useSelector((state) => state?.auth?.role);

  // function to hide the drawer on close button click
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    // collapsing the drawer-side width to zero
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };

  // function for changing the drawer width on menu button click
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  // function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();

    // calling logout action
    const res = await dispatch(logout());

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-[100vh] relative bg-gradient-to-r from-sky-200 to-sky-100">
       
      {/* Drawer */}
      <div className="absolute top-3  right-4 mb-2">
        <img src={logo}
        onClick={() => navigate("./About")}
          alt="Logo" className="h-16 w-auto md:h-16 lg:h-20" />{" "}
      </div>

      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              size="32px"
              className="font-bold  m-4 text-blue-500"
              onClick={changeWidth}

            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 h-[100%]  w-48 sm:w-80 bg-sky-100 text-black">
            <li className="w-fit absolute right-2 z-50 ">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24}  />
              </button>
            </li>
            <div>

           
            <li className="border border-black rounded-md ">
              <Link to="/">Home</Link>
            </li>
             {/* displaying dashboard, if user is logged in */}
            {isLoggedIn && role === "ADMIN" && (
              <li className="border border-black rounded-md mt-1">
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <li className="border border-black rounded-md mt-1">
                <Link to="/course/create">Create Course</Link>
              </li>
            )}
            <li className="border border-black rounded-md mt-1">
              <Link to="/courses">All Courses</Link>
            </li>
            <li className="border border-black rounded-md mt-1">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="border border-black rounded-md mt-1">
              <Link to="/about">About Us</Link>
            </li>
            {!isLoggedIn && (
              <li className="bottom-7 absolute w-[90%] gap-3 h-22 hover:bg-transparent">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary bg-blue-500 py-1 px-4 font-semibold rounded-md w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-secondary text-black bg-yellow-400 py-1 px-4 font-semibold rounded-md w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <Link to="/register">Signup</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="bottom-7 absolute w-[90%] gap-3 hover:bg-transparent">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary bg-blue-500 py-1 px-4 font-semibold rounded-md w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-black bg-yellow-400 py-1 px-4 font-semibold rounded-md w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
            </div>
          </ul>
        </div>
      </div>

      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;