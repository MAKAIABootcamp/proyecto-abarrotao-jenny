import React, { useState } from 'react'
import Home from '../components/Home/Home'
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from '../components/Profile/Profile';
import Turnos from '../components/Turnos/Turnos';
import Glocer from '../components/Tiendas/Glocer';



const DashBoardRouter = () => {
  const navigate = useNavigate();  
  const [glocerName, setGlocerName] = useState('');
  const name = (name) => {
    navigate(`/tienda/:${name}`)
    
  }
  const getGlocerName = (nombreTienda) => {    
    setGlocerName(nombreTienda)
    name(nombreTienda)
  }
 


  return (
    <Routes>
      <Route path='/home' element={<Home getGlocerName={getGlocerName} setGlocerName={setGlocerName}/>} />
      <Route path='/perfil' element={<Profile />} />
      <Route path='/turnos' element={<Turnos />} />
      <Route path='/tienda/:name' element={<Glocer glocerName={glocerName}/>} />
    </Routes>
  )
}

export default DashBoardRouter