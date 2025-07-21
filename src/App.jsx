import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Chat from "./components/Chat"
import Home from "./components/Home"
import Register from "./components/Register"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Logout from "./components/Logout"

import ProtectedRotue from "./components/ProtectedRoute"







const App=()=> {
  return(

<BrowserRouter> 
    <Navbar/>
     


       <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
    
        <Route path="/home" element={<Home />} />


        <Route element = {<ProtectedRotue/>} >
        <Route path="chat" element = {<Chat/>} />
      
       </Route>
        </Routes>


 
    </BrowserRouter>
  );
};

export default App;
     
       