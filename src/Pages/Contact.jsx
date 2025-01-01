import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";

import axiosInstances from "../Helpers/axiosInstances";
function Contact() {
    const [userInput , setUserInput] = useState({
        name : "",
        email:"",
        message:"",
    });
    const handelInputChange =(e)=>{
        const {name , value} = e.target;
        console.log(name , value);
        setUserInput ({
            ...userInput,
            [name]: value
        })
        
    }
    // function to send form data to backend

   const onFormSubmit= async(e)=>{
        e.preventDefault();
        if(!userInput.email || !userInput.name ||!userInput.message){
            toast.error('All filds are mandatory');
            return;
        }
        if(!userInput.email.match( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            toast.error("Invalid Email")
            return;
        }
        try{
            const response = axiosInstances.post('/contact' , {...userInput});
            toast.promise(response , {
                loading: 'Submitting your request',
                success: 'Form Submitted Successfully',
                error: 'Failed to submit the form'

            });
            const contactResponse = await response;
            if(contactResponse.data.success){
                setUserInput({
                    name : "",
                    email:"",
                    message:"",

                })
            }
        }catch(err){
            toast.error('Operation Failed')
        }
    }
    


return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh]">
        <form 
        onSubmit={onFormSubmit} 
        className="flex flex-col item center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
         noValidate>
        <h1 className="text-3xl text-center font-semibold">Contact Form</h1>

       {/* Name */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" 
            className="text-xl font-semibold"> Name</label>
            <input type="text" 
            className="bg-transparent border px-2 py-1 rounded-sm " 
            id="name" 
            name="name" 
            placeholder="Enter Your Name"
            onChange={handelInputChange}
            value={userInput.name}/>
          </div>

       {/* Email */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" 
            className="text-xl font-semibold"> Email</label>
            <input type="email" 
            className="bg-transparent border px-2 py-1 rounded-sm " 
            id="email" 
            name="email" 
            placeholder="Enter Your email"
            onChange={handelInputChange}
            value={userInput.email}/>
          </div>

       {/* Message */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" 
            className="text-xl font-semibold"> Message</label>
            <textarea 
            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40 " 
            id="message" 
            name="message" 
            placeholder="Enter Your query"
            onChange={handelInputChange}
            value={userInput.message}
            />
          </div>
          <button type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
            Submit
          </button>

        </form>
      </div>
    </HomeLayout>
  );
}
export default Contact;
