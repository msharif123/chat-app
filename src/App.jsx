import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./components/home/Home"
import Navbar from "./components/navbar/Navbar"
import Register from "./components/register/Register"
import Footer from "./components/footer/Footer"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import ProtectedRoute from "./components/ProtectedRoute"
import Chat from "./components/chat/Chat"







const App=()=> {
  return(

<BrowserRouter> 

    <Navbar/>
   
     


       <Routes>
        <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
       
        
        
    
        


        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<Chat />} />
         
      
      
       </Route>
        </Routes>


       <Footer />
    </BrowserRouter>
  );
};

export default App;
     
       