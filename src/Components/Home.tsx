import React from "react";
import "./SigntUpCss.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get("userName");
  let Navigate = useNavigate();

  const logoutHandeling = () => {
    alert("Are you sure do you want to logout?");
    Navigate("/");
  };

  const deleteAccount = () => {
    localStorage.clear();
  };
  return (
    <>
      <h1> Hello {userName}</h1>
      <button onClick={logoutHandeling} className="logOutBtn">
        LogOut
      </button>
      <button onClick={deleteAccount} className="deleteBtn">
        Delete
      </button>
    </>
  );
};

export default Home;
