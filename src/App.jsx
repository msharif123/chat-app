import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Chat from "./components/Chat"
import Register from "./components/Register"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Logout from "./components/Logout"

import ProtectedRoute from "./components/ProtectedRoute"
import MessageList from "./components/MessageList"
import MessageForm from "./components/MessageForm"







const App=()=> {
  return(

<BrowserRouter> 
    <Navbar/>
    <Footer />
     


       <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        
        
    
        


        <Route element = {<ProtectedRoute/>} >
        <Route path="chat" element = {<Chat/>} />
      
      
       </Route>
        </Routes>


 
    </BrowserRouter>
  );
};

export default App;
     
       