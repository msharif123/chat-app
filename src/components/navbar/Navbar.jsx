import React from "react"
import {Link}from "react-router-dom"
import "./Navbar.css"


const Navbar= ()=>{
    return(


        <nav>
         <Link to = "home">Home</Link>
         <Link to = "register">Register</Link>
        <Link to = "login">Login</Link>
        <Link to = "chat">Chat</Link>
        <Link to = "logout">Logut</Link> 


        </nav>
    )
}
export default Navbar