import {Navigate, Outlet} from "react-router-dom" 


const isAuthenticated = ()=>{

    return  (


        !! localStorage.getItem("token")
        
    )
}


const ProtectedRoute=()=>{

    return isAuthenticated ()?   <Outlet/>: <Navigate to = "/login"/>
}

export default ProtectedRoute