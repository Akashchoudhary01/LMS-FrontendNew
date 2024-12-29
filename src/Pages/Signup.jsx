import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";

function Singup(){

    const [previewImage , setPreviewImage] = useState("");

    return(
        <HomeLayout>
            <div className="flex overflow-x-auto flex-col h-[100vh] items-center justify-center">
                <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 items-center shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_upload" classname ="cursor-pointer" >
                        {previewImage ? (
                            <img src={previewImage} className="w-24 h-24 rounded-full m-auto"/>
                        ) :(
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}
                    </label>
                    <input type="file"
                     id="imageUploader"
                      className="hidden"
                      name="image_uploads"
                    accept=".jpg , .jpeg ,.png ,.svg" />
                </form>
            </div>

        </HomeLayout>
    )

}
export default Singup;