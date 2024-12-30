import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstances from '../../Helpers/axiosInstances'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role :localStorage.getItem('role') || "  ",
    data :localStorage.getItem('data') || "  ",
};
// Function to handle singup
export const createAccount = createAsyncThunk("/auth/signup", async (data, { rejectWithValue }) => {
    try {
      // Start the API request
      const response = await axiosInstances.post("user/register", data);
      
      // Return the response data to the redux slice
      return response.data;
    } catch (err) {
      // Handle errors and return the error message to redux slice
      return rejectWithValue(err.response?.data?.message || "Failed to create account");
    }
  });
  
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer