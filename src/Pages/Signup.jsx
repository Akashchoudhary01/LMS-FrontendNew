import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast' 
import { createAccount } from "../redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [singupData, setSingupData] = useState({
    fullName: "",
    email: "",
    Password: "",
    avatar: "",
  });

  function handelUserInput(e) {
    const { name, value } = e.target;
    setSingupData({
      ...singupData,
      [name]: value,
    });
  }
//   image handling
function getImage(event){
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    if(uploadedImage){
        setSingupData({
            ...singupData,
            avatar :uploadedImage
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load" , function(){
            
            setPreviewImage(this.result);
        })
    }
}
// create Account function

async function createNewAccount(event){
  event.preventDefault();
  if(!singupData.email || !singupData.Password ||!singupData.fullName){
    toast.error('Please Fill all the details');
    return;
  }
  // Avatar
  if(!singupData.avatar){
    toast.error('Please add a profile picture');
    return;
  }

  // checking name fild length
  if(singupData.fullName.length<5){
    toast.error('Name should be at least 5 characters')
    return;
  }
  if(singupData.fullName.length>25){
    toast.error('Name should be less then 25 characters')
    return;
  }
  //  checking valid email
  if(!singupData.email.match( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
    toast.error('Invalid Email Id')
    return;
  }

  // Checking Password Validation
  if (!singupData.Password.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
    toast.error('Password should be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

   const formData = new FormData();
  formData.append("fullName" , singupData.fullName);
   formData.append( "email" ,singupData.email);
   formData.append("Password" , singupData.Password);
   formData.append( "avatar" , singupData.avatar);

  //  dispatch create account action
  const res = await dispatch(createAccount(formData));
  console.log(res);

  // redirecting to login page if true
  if (res.payload.success) navigate("/login");


  setSingupData({
    fullName: "",
    email: "",
    Password: "",
    avatar: ""
  });

  setPreviewImage("");
}

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto flex-col h-[100vh] items-center justify-center">
        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 items-center shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

{/* Input for imag {/* Image Upload */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full m-auto"
                alt="preview-image"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            type="file"
            id="image_uploads"
            className="hidden"
            name="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />


          <div className="flex flex-col gap-1">
            <label htmlFor="fullName"> User Name</label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter Your Name"
              className="bg-transparent px-2 py-1 border"
              onChange={handelUserInput}
              value={singupData.fullName}
            />
            <div />

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
                value={singupData.email}
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
                  value={singupData.Password}
                />
              </div>
              <button
                type="submit"
                className="mt-3 rounded-lg h-9 bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300"
              >
                Create Account
              </button>

              <p className="text-center">
                Already have an account ? &nbsp;
                <Link
                  className=" link text-blue-600 cursor-pointer decoration-transparent"
                  to="/login"
                >
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
