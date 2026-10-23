import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <nav className="navbar  navbar-expand-sm  navbar-dark dark-bg fixed-top ">
      <div className="container-fluid h3 ps-5">
        <a className="navbar-brand fw-bold " href="#">
          HRMS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className=" collapse navbar-collapse " id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/clients" className="btn link-bg text-white">
              Clients
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/departments" className="btn link-bg text-white">
              Departments
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/employees" className="btn link-bg text-white">
              Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/payslips" className="btn link-bg text-white">
              Payslips
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderComponent;
