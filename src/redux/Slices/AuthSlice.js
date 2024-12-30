import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstances from '../../Helpers/axiosInstances'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role :localStorage.getItem('role') || "  ",
    data :localStorage.getItem('data') || "  ",
};
// Function to handle singup
export const createAccount = createAsyncThunk("/auth/singup" , async(data)=>{
  try{
    const res = axiosInstances.post("user/register" , data);
    toast.promise(res,{
      loading: "Wait ! creating your Account",
      success:(data) =>{
        return data?.data?.message;
      },
      error:"failed to create account"
    })
    return (await res).data;

  }
  catch(err){
    toast.error(err?.response?.data?.message)
  }
})


// Function to handle singup
export const login= createAsyncThunk("/auth/login" , async(data)=>{
  try{
    const res = axiosInstances.post("user/login" , data);
     toast.promise(res, {
      loading: "Wait ! authintication in process",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });
    return(await res).data;

    // getting response resolved here
  
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// Logout
export const Logout = createAsyncThunk("/auth/logout" ,  async()=>{
  try {
    const res = axiosInstances.get("user/logout");
      toast.promise(res, {
        loading: "Wait ! Logout in process",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to logOut in",
    })
    
  } catch (error) {
    toast.error(error?.response?.data?.message);
    
  }
})

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
      builder.addCase(login.fulfilled,(state , action)=>{
        localStorage.setItem("data" , JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn" , true);
        localStorage.setItem("role" , action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role=action?.payload?.user?.role

      })
      .addCase(Logout.fulfilled,(state)=>{
        localStorage.clear();
        state.data = {}
        state.isLoggedIn = false
        state.role={}
        



      })
    }
});


export const {} = AuthSlice.actions;

export default AuthSlice.reducer