import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    Password: "",
  });

  //function to handle the user input
  function handelUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  // handel function to login

  async function loginAccount(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.Password) {
      toast.error("Please Fill all the details");
      return;
    }

    //  dispatch login  actions
    const response = await dispatch(login(loginData));
    console.log(response);

    // redirecting to login page if true
    if (response?.payload?.success) {
        navigate("/");
        toast.success("User logged in successfully!");
      } else {
        toast.error(response?.payload?.message || "Login failed");
      }
      
    setLoginData({
      email: "",
      Password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto flex-col h-[100vh] items-center justify-center">
        <form
          noValidate
          onSubmit={loginAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 items-center shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="bg-transparent px-2 py-1 border"
              onChange={handelUserInput}
              value={loginData.email}
            />
            <div />
            <div className="flex flex-col gap-1">
              <label htmlFor="Password"> Password</label>
              <input
                type="Password"
                required
                name="Password"
                id="Password"
                placeholder="Enter Your Password"
                className="bg-transparent px-2 py-1 border"
                onChange={handelUserInput}
                value={loginData.Password}
              />
            
            </div>
            <button
              type="submit"
              className="mt-3 rounded-lg h-9 bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300"
            >
              Login Account
            </button>

            <p className="text-center">
              Already have an account ? &nbsp;
              <Link
                className=" link text-blue-600 cursor-pointer decoration-transparent"
                to="/register"
              >
                {" "}
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};
export default Login;
