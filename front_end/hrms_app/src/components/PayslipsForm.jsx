import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  listPayslips,
  getPayslipsById,
  updatePayslips,
  createPayslips,
} from "../services/Payslips";

const PayslipsForm = () => {
  const [data, setData] = useState({
    employeeId: "",
    month: "",
    year: "",
    basicPay: "",
    allowances: "",
    deductions: "",
    paymentStatus: "",
  });

  const [error, setError] = useState({
    employeeId: "",
    month: "",
    year: "",
    basicPay: "",
    allowances: "",
    deductions: "",
    paymentStatus: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPayslipsById(id)
        .then((response) => {
          setData(response.data);
          setData((prevData) => ({
            ...prevData,
            employeeId:
              response.data.EmployeeId?.employeeId || prevData.employeeId,
          }));
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, [id]);
  console.log("payslis data", data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preveData) => ({
      ...preveData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      updatePayslips(id, data).then(() => {
        navigate("/payslips");
      });
    } else {
      createPayslips(data).then(() => {
        navigate("/payslips");
      });
    }
  };

  const formValidate = () => {
    let isValid = true;
    const newErrors = {
      employeeId: "",
      month: "",
      year: "",
      basicPay: "",
      allowances: "",
      deductions: "",
      paymentStatus: "",
    };

    if (!data.employeeId) {
      newErrors.employeeId = "Employee id is required";
      isValid = false;
    }
    if (!data.month) {
      newErrors.month = "Month is required";
      isValid = false;
    }
    if (!data.year) {
      newErrors.year = "Years is required";
      isValid = false;
    }
    if (!data.basicPay) {
      newErrors.basicPay = "Basic pay is required";
      isValid = false;
    }
    if (!data.paymentStatus) {
      newErrors.paymentStatus = "Payment Status is required ";
      isValid = false;
    }
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Payslip</h2>;
    } else {
      return <h2 className="text-center">Add Payslip</h2>;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card mt-5 col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">Employee Id :</label>
                <input
                  type="number"
                  className="form-control"
                  name="employeeId"
                  value={data.employeeId}
                  onChange={handleChange}
                />
                {error.employeeId && (
                  <div className="text-danger">{errors.employeeId}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Month :</label>
                <select
                  className="form-control"
                  name="month"
                  value={data.month}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                {error.month && (
                  <div className="text-danger">{errors.month}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Year :</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={data.year}
                  onChange={handleChange}
                />
                {error.year && <div className="text-danger">{errors.year}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Basic pay :</label>
                <input
                  type="number"
                  className="form-control"
                  name="basicPay"
                  value={data.basicPay}
                  onChange={handleChange}
                />
                {error.basicPay && (
                  <div className="text-danger">{errors.basicPay}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Allowance :</label>
                <input
                  type="number"
                  className="form-control"
                  name="allowances"
                  value={data.allowances || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Deduction :</label>
                <input
                  type="number"
                  className="form-control"
                  name="deductions"
                  value={data.deductions || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Payment Status :</label>
                <select
                  className="form-control"
                  name="paymentStatus"
                  value={data.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Payment Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipsForm;
