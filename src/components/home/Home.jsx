import { Link } from "react-router-dom";
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <h2>Welcome to m-Chat-app.netlify.app</h2>
        <p>A website that built with React and hosted on Netlify.</p>
        <p className="login-prompt">
          Please <Link to="/login" className="login-link">click here</Link> 
        </p>
      </header>
    </div>
  );
};

export default Home;


