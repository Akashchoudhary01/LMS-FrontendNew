import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { createNewCourse } from "../../redux/Slices/CourseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: " ",
    category: " ",
    createdBy: " ",
    description: " ",
    thumbnail: null,
    previewImage: "",
  });

  // function to handel image upload
  const handelImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };

  //  function to handel user input
  const handelUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  //  function to submit form
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.thumbnail
    ) {
      toast.error("All Filds Are mendetory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: " ",
        category: " ",
        createdBy: " ",
        description: " ",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-2/3 my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold ">Create New Course</h1>

          <main className="flex flex-col md:grid md:grid-cols-2 gap-x-10">
            <div className="gap-y-6">
                <div>
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {userInput.previewImage? (
                            <img
                            className="w-full h-44 m-auto border"
                            src={userInput.previewImage}
                            />
                            
                        ):(
                            <div className="w-full h-44 m-auto flex items-center justify-center border">
                                <h1 className="font-bold text-lg">upload your course Thumbnail</h1>
                                
                            </div>
                        )}

                    </label>
                    <input type="file"
                     className="hidden"
                     id="image_uploads" 
                     accept=".jpg , .jpeg , .png"
                     name="image_uploads"
                     onChange={handelImageUpload}
                     />
                    
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="text-lg font-semibold"
                    > Course title</label>
                    <input 
                    type="text"
                     required 
                     name="title"
                     id="title"
                     placeholder="Enter Course Title"
                     className="bg-transparent px-2 py-1 border"  
                     value={userInput.title}
                     onChange={handelUserInput}/>
                </div>
            </div>

            <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
                    <label htmlFor="createdBy" className="text-lg font-semibold"
                    > Course Instructor </label>
                    <input 
                    type="text"
                     required 
                     name="createdBy"
                     id="createdBy"
                     placeholder="Enter Course Instructor"
                     className="bg-transparent px-2 py-1 border"  
                     value={userInput.createdBy}
                     onChange={handelUserInput}/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-lg font-semibold"
                    > Course Category </label>
                    <input 
                    type="text"
                     required 
                     name="category"
                     id="category"
                     placeholder="Enter Course category"
                     className="bg-transparent px-2 py-1 border"  
                     value={userInput.category}
                     onChange={handelUserInput}/>
                    
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-lg font-semibold"
                    > Course description</label>
                    <textarea 
                     required 
                     name="description"
                     id="description"
                     placeholder="Enter Course description"
                     className="bg-transparent h-24 overflow-y-scroll px-2 py-1 border resize-none"  
                     value={userInput.description}
                     onChange={handelUserInput}/>
                    
                </div>
            </div>

          </main>

          <button type="submit" className=" w-full font-semibold text-lg cursor-pointer bg-blue-500 hover:bg-blue-600 py-2 rounded-sm transition-all ease-in-out duration-300">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default CreateCourse;
