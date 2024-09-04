import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/main.scss";

const Homelayout = () => {
  return (
    <div className="home_main">
      <Outlet />
    </div>
  );
};

export default Homelayout;
