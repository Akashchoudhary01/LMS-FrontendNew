import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstances from "../../Helpers/axiosInstances";

const initialState = {
    allUsersCount:0,
    subscribedCount:0
};

export const getStatsData = createAsyncThunk("stats/get" , async()=>{
    try {
        const response = axiosInstances.get('/admin/stats/users');
        toast.promise(response , {
            loading: "Getting the Stats...",
            success:(data)=>{
                return data?.data?.message
            },
            error: "Failed to load The stats"
        });
        return (await response).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})
const StatSlice = createSlice({
    name: "state",
    initialState,
    reducers:{},
    extraReducers:()=>{

    }

})