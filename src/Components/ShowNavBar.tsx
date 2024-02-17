import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavBar = ({ children }: any) => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/signUpPage" ||
      location.pathname === "/firstHomePage"
    ) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);
  return <div>{showNavBar && children}</div>;
};

export default ShowNavBar;
