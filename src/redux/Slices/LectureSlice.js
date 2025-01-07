import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstances from '../../Helpers/axiosInstances';
const initialState = {
    lectures: []
}

// Get Lecture
export const getCourseLecture = createAsyncThunk("/course/lecture/get" , async(cid) =>{
    try {
        const response = axiosInstances.get(`/courses/${cid}`);
        toast.promise(response, {
            loading: 'Fetching course lectures',
            success :"lectures Fatched Successfully",
            error :" Failed To load the lectures"
        });
        return (await response).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

// add lecture
export const addCourseLecture = createAsyncThunk("/course/lecture/add" , async(data) =>{
    try {
        const formData = new formData();
        formData.append("lecture" , data.lecture);
        formData.append("title" , data.title);
        formData.append("description" , data.description);

        const response = axiosInstances.post(`/courses/${data.id}`, formData);
        toast.promise(response, {
            loading: 'adding course lectures',
            success :"lectures added Successfully",
            error :" Failed To add the lectures"
        });
        return (await response).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

// delete Lecture
export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete" , async(data) =>{
    try {
        const response = axiosInstances.delete(`/courses?courseId=${data.courseId}&lectureID=${data.lectureId}`);
        toast.promise(response, {
            loading: 'deleting course lectures',
            success :"lectures deleted Successfully",
            error :" Failed To delete the lectures"
        });
        return (await response).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})
const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase
        (getCourseLecture.fulfilled , (state , action)=>{
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture , fulfilled , (state , action)=>{
            state.lectures = action?.payload?.course?.lectures;
        } )
    }

});
export default lectureSlice.reducer;