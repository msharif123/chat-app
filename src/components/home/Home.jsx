import { Link } from "react-router-dom";
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <header>
        <h2>Welcome to m-Chat-app.netlify.app</h2>
        {/* <Link to="/chat/123123"><button>testa fejk-chat</button></Link> */}
        <p>A website that built with React and hosted on Netlify.</p>
        <p className="login-prompt">
          Please <Link to="/login" className="login-link">click here</Link>
        </p>
      </header>
    </div>
  );
};

export default Home;


