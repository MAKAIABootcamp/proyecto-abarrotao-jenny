import React from 'react'
import Home from '../components/Home/Home'
import { Route, Routes } from "react-router-dom";


const DashBoardRouter = ({glocerList}) => {
  return (
    <Routes>
        <Route path='/home' element={<Home glocerList={glocerList}/>}/>        
    </Routes>
  )
}

export default DashBoardRouter