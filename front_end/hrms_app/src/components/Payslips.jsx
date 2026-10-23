import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { listPayslips, deletePayslips } from "../services/Payslips";

const Payslips = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    listPayslips()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const addPayslip = () => {
    navigate("/add-payslip");
  };
  const updatePayslip = (id) => {
    navigate(`/update-payslip/${id}`);
  };

  const handleDelete = (id) => {
    deletePayslips(id)
      .then(() => {
        setData(data.filter((payslip) => payslip.payslipId !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };
  console.log("payslips data", data);
  return (
    <div>
      <h2 className="text-center head my-3">List of Payslips</h2>
      <button className="btn btn-bg text-white mb-2" onClick={addPayslip}>
        Add Payslip
      </button>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th className="center-cell fs-5">Payslip Id</th>
            <th className="center-cell fs-5">Employee Id</th>
            <th className="center-cell fs-5">Employee First Name</th>
            <th className="center-cell fs-5">Employee Last Name</th>
            <th className="center-cell fs-5">Email</th>
            <th className="center-cell fs-5">Month</th>
            <th className="center-cell fs-5">Year</th>
            <th className="center-cell fs-5">Base Salary</th>
            <th className="center-cell fs-5">Allowance</th>
            <th className="center-cell fs-5">Deductions</th>
            <th className="center-cell fs-5">Net Pay</th>
            <th className="center-cell fs-5">Payment Status</th>
            <th className="center-cell fs-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((payslip) => (
            <tr key={payslip.payslipId}>
              <td className="center-cell">{payslip.payslipId}</td>
              <td className="center-cell">{payslip.EmployeeId.employeeId}</td>
              <td className="center-cell">{payslip.EmployeeId.firstName}</td>
              <td className="center-cell">{payslip.EmployeeId.lastName}</td>
              <td className="center-cell">{payslip.EmployeeId.email}</td>
              <td className="center-cell">{payslip.month}</td>
              <td className="center-cell">{payslip.year}</td>
              <td className="center-cell">{payslip.basicPay}</td>
              <td className="center-cell">{payslip.allowances}</td>
              <td className="center-cell">{payslip.deductions}</td>
              <td className="center-cell">{payslip.netPay}</td>
              <td className="center-cell">{payslip.paymentStatus}</td>
              <td className="center-cell">
                <button
                  className="btn btn-info mx-3 mb-2"
                  onClick={() => updatePayslip(payslip.payslipId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDelete(payslip.payslipId)}
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

export default Payslips;
