import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function Singup() {
  const dispatch = useDispatch();
  const nevigator = useNavigate();

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

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto flex-col h-[100vh] items-center justify-center">
        <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 items-center shadow-[0_0_10px_black]">
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
                  type="password"
                  required
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
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
export default Singup;
