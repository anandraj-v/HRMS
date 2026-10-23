import React from "react";
import { Link, Outlet } from "react-router-dom";

const HrmsMain = () => {
  return (
    <div className="container-fluid  p-1 mt-5">
      <div id="display" className=" mt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default HrmsMain;
