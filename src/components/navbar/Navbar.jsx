import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [token, setToken] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const jwt = localStorage.getItem("token");
            setToken(jwt);
        };

        checkToken();
        window.addEventListener("storage", checkToken);
        return () => window.removeEventListener("storage", checkToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("chatMessages");

        setToken(null);
        navigate("/login");
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav>
            <button className="menu-toggle" onClick={toggleMenu}>

            </button>
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                <NavLink to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink>
                {!token && (
                    <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
                )}
                {!token && (
                    <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                )}
                {token && (
                    <NavLink to="/chat" onClick={() => setMenuOpen(false)}>Chat</NavLink>
                )}
                {token && (
                    <button
                        onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                        }}
                        className="logout-btn"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
