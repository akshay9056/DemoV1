import React from 'react'
import "./index.css";
import Header from './component/Header';

import VPI_PARENT from "./component/VPI/VPI_PARENT"
import { Outlet } from 'react-router-dom';
import LogoHeader from './component/LogoHeader';
import TaskDeskProvider from "./context/TaskdeskContextApi";
function App() {
  return (
   <>
   <LogoHeader/>
   <Header/>
   <Outlet/>

   </> 
  )
}

export default App