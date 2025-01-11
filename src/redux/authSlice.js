import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  // Check if 'data' exists in localStorage before parsing, otherwise set it to an empty object.
  data: (() => {
    const data = localStorage.getItem("data");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing 'data' from localStorage:", error);
        return {}; // Return an empty object if parsing fails
      }
    }
    return {}; // Return an empty object if 'data' doesn't exist
  })(),role: localStorage.getItem("role") || "",
};


// Function to handle signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = await axiosInstance.post("user/register", data);
    toast.success(res?.data?.message || "Account created successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create account");
    throw error;
  }
});

// Function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstance.post("/user/login", data);
    toast.success(res?.data?.message || "Login successful");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "Failed to log in");
    throw error;
  }
});

// Function to handle logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axiosInstance.post("/user/logout");
    toast.success(res?.data?.message || "Logged out successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "Failed to log out");
    throw error;
  }
});

// Function to fetch user data
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = await axiosInstance.get("/user/me");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "Failed to fetch user data");
    throw error;
  }
});

// Function to change user password
export const changePassword = createAsyncThunk("/auth/changePassword", async (userPassword) => {
  try {
    const res = await axiosInstance.post("/user/change-password", userPassword);
    toast.success(res?.data?.message || "Password changed successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to change password");
    throw error;
  }
});

// Function to handle forget password
export const forgetPassword = createAsyncThunk("auth/forgetPassword", async (email) => {
  try {
    const res = await axiosInstance.post("/user/reset", { email });
    toast.success(res?.data?.message || "Verification email sent");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to send verification email");
    throw error;
  }
});

// Function to update user profile
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
  try {
    const res = await axiosInstance.put(`/user/update/${data[0]}`, data[1]);
    toast.success(res?.data?.message || "Profile updated successfully");
    toast.loading( "Updating Your Profile")
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update profile");
    throw error;
  }
});

// Function to reset password
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    const res = await axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });
    toast.success(res?.data?.message || "Password reset successful");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to reset password");
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For user login
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action.payload.user.role);
        state.isLoggedIn = true;
        state.data = action.payload.user;
        state.role = action.payload.user.role;
      })
      // For user logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = "";
      })
      // For fetching user details
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.data = action.payload.user;
        state.role = action.payload.user.role;
      });
  },
});

export default authSlice.reducer;
