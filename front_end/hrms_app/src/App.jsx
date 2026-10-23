import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clients from "./components/Clients.jsx";
import ClientsForm from "./components/ClientsForm.jsx";
import Department from "./components/Department.jsx";
import DepartmentForm from "./components/DepartmentForm.jsx";
import Employees from "./components/Employees.jsx";
import EmployeesForm from "./components/EmployeesForm.jsx";
import Payslips from "./components/Payslips";
import PayslipsForm from "./components/PayslipsForm";
import HrmsMain from "./components/HrmsMain";
import HeaderComponent from "./components/utils/HeaderComponent";
import ClientsFormComponent from "./components/forms/ClientsFormComponent";
import DepartmentFormComponent from "./components/forms/DepartmentFormComponent";
import EmployeeFormComponent from "./components/forms/EmployeeFormComponent";
import PaylisFormComponent from "./components/forms/PaylisFormComponent";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        <Route element={<HrmsMain />}>
          <Route path="/" element={<PaylisFormComponent />} />
          <Route path="/clients" element={<Clients />} />
          <Route
            path="/update-clients/:id"
            element={<ClientsFormComponent />}
          />
          <Route path="/add-client" element={<ClientsFormComponent />} />
          <Route path="/departments" element={<Department />} />
          <Route
            path="/update-department/:id"
            element={<DepartmentFormComponent />}
          />
          <Route path="/add-department" element={<DepartmentFormComponent />} />
          <Route path="/employees" element={<Employees />} />
          <Route
            path="/update-employee/:id"
            element={<EmployeeFormComponent />}
          />
          <Route path="/add-employee" element={<EmployeeFormComponent />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/update-payslip/:id" element={<PaylisFormComponent />} />
          <Route path="/add-payslip" element={<PaylisFormComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
