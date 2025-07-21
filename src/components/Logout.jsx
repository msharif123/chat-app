
import { useEffect, useInsertionEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = ()=>{
    const navigage = useNavigate()
    useEffect(()=>{
        localStorage.removeItem("token")
        navigate ("/login")

    }, [navigage])
    return( <h3>login</h3>


    )
}


export default Logout