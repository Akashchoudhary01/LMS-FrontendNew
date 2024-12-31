import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstances from "../../Helpers/axiosInstances";

const initialState ={
    courseData: []

}
export const getAllCourses = createAsyncThunk("/course/get" , async()=>{
    try {
        const response = axiosInstances.get("/courses")
        toast.promise(response , {
            loading:"loading courses data ...",
            success:"Courses Loaded Successfully",
            error:"failed to get courses",
        })
        return(await response).data.courses;
        
    } catch (error) {
        toast.error(error?.response?.data)
        
    }
})

const CourseSlice = createSlice({
    name: "courses",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{

    }
});

export default CourseSlice.reducer;