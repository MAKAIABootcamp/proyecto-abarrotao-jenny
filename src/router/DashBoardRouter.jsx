import React from 'react'
import Home from '../components/Home/Home'
import { Route, Routes } from "react-router-dom";
import Profile from '../components/Profile/Profile';
import Turnos from '../components/Turnos/Turnos';


const DashBoardRouter = () => {
  return (
    <Routes>
        <Route path='/home' element={<Home />}/>        
        <Route path='/perfil' element={<Profile/>}/>        
        <Route path='/turnos' element={<Turnos/>}/>        
        <Route path='/tienda/:name' element={<Turnos/>}/>        
    </Routes>
  )
}

export default DashBoardRouter