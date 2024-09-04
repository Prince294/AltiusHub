import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/main.scss";

const Loginlayout = () => {
  return (
    <div className="login_main">
      <Outlet />
    </div>
  );
};

export default Loginlayout;
