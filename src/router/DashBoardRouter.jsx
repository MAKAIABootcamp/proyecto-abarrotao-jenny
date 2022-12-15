import React from 'react'
import Home from '../components/Home/Home'
import { Route, Routes } from "react-router-dom";
import Profile from '../components/Profile/Profile';


const DashBoardRouter = () => {
  return (
    <Routes>
        <Route path='/home' element={<Home />}/>        
        <Route path='/perfil' element={<Profile/>}/>        
    </Routes>
  )
}

export default DashBoardRouter