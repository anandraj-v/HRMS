import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { listEmployees, deleteEmployee } from "../services/Employees";

const Employees = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const addEmployee = () => {
    navigate("/add-employee");
  };

  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`);
  };

  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => {
        setData(data.filter((employee) => employee.employeeId !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div>
      <h2 className="text-center head my-3">List of Employees</h2>
      <button className="btn btn-bg text-white mb-2" onClick={addEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-hover table-bordered overflow-scroll">
        <thead>
          <tr>
            <th className="center-cel  fs-5">Employee Id</th>
            <th className="center-cell  fs-5">First Name</th>
            <th className="center-cell  fs-5">Last Name</th>
            <th className="center-cell  fs-5">Email</th>
            <th className="center-cell  fs-5">Phone</th>
            <th className="center-cell  fs-5">Hire Date</th>
            <th className="center-cell  fs-5">Base Salary</th>
            <th className="center-cell  fs-5">Department Id</th>
            <th className="center-cell  fs-5">Department Name</th>
            <th className="center-cell fs-5">Client Id</th>
            <th className="center-cell fs-5">Client Name</th>
            <th className="center-cell fs-5">Manager Id </th>
            <th className="center-cell fs-5">Subordinates Id</th>
            <th className="center-cell fs-5">Payslips Id</th>
            <th className="center-cell fs-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.employeeId}>
              <td className="center-cell">{employee.employeeId}</td>
              <td className="center-cell">{employee.firstName}</td>
              <td className="center-cell">{employee.lastName}</td>
              <td className="center-cell">{employee.email}</td>
              <td className="center-cell">{employee.phone}</td>
              <td className="center-cell">{employee.hireDate}</td>
              <td className="center-cell">{employee.baseSalary}</td>
              <td className="center-cell">
                {employee.department ? employee.department.departmentId : ""}
              </td>
              <td className="center-cell">
                {employee.department ? employee.department.departmentName : ""}
              </td>
              <td className="center-cell">
                {employee.client ? employee.client.clientId : "N/A"}
              </td>
              <td className="center-cell">
                {employee.client ? employee.client.clientName : "N/A"}
              </td>
              <td className="center-cell">
                {employee.manager ? employee.manager.employeeId : "N/A"}
              </td>
              <td className="center-cell">
                {employee.subordinates
                  .map((subordinate) => subordinate.employeeId)
                  .join(", ")}
              </td>
              <td className="center-cell">
                {employee.payslips
                  .map((payslip) => payslip.payslipId)
                  .join(", ")}
              </td>
              <td className="center-cell">
                <button
                  className="btn btn-info mx-3 mb-2"
                  onClick={() => handleUpdate(employee.employeeId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDelete(employee.employeeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
