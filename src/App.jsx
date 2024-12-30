import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import Singup from './Pages/Signup';
import Login from './Pages/Login';
// import Footer from './Components/Footer'

function App() {
 
  return (
    <>
      <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/About' element={<AboutUs/>}></Route>
            <Route path='/register' element={<Singup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>

            <Route path='*' element={<NotFound/>}></Route>
       </Routes> 
      
    </>
  )
}

export default App