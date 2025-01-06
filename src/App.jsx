import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import Singup from './Pages/Signup';
import CourseList from './Pages/Course/CourseList';
import Login from './Pages/Login';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import RequireAuth from './Components/Auth/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';
import Checkout from './Pages/Payment/Checkout';


function App() {
 
  return (
    <>
      <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/About' element={<AboutUs/>}></Route>
            <Route path='/courses' element={<CourseList/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/denied' element={<Denied/>}></Route>
            <Route path='/course/description' element={<CourseDescription/>}></Route>

            <Route path='/register' element={<Singup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>

            <Route element={<RequireAuth allowedRoles = {["ADMIN"]}/>}>
            <Route path='/courses/create' element={<CreateCourse/>}></Route>

            </Route>

            <Route element={<RequireAuth allowedRoles = {["ADMIN" , "USER"]}/>}>
            <Route path='/user/profile' element={<Profile/>}></Route>
            <Route path='/user/editprofile' element={<EditProfile/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>

            </Route>

            <Route path='*' element={<NotFound/>}></Route>
       </Routes> 
      
    </>
  )
}

export default App