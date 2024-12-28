import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
// import Footer from './Components/Footer'

function App() {
 
  return (
    <>
      <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/About' element={<AboutUs/>}></Route>
       </Routes> 
      
    </>
  )
}

export default App