import { Link } from "react-router-dom";
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <h2>Välkommen till m-Chat-app.netlify.app</h2>
        <p>En hemsida som byggd med React och hostad på Netlify.</p>
        <p className="login-prompt">
          Please <Link to="/login" className="login-link">click here to Login</Link> to access your account
        </p>
      </header>
    </div>
  );
};

export default Home;