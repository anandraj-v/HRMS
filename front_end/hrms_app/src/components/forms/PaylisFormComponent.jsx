import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  listPayslips,
  getPayslipsById,
  updatePayslips,
  createPayslips,
} from "../../services/Payslips";

const PaylisFormComponent = () => {
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
      return <h2 className="text-center h-3 my-4 head">Update Payslip</h2>;
    } else {
      return <h2 className="text-center h-3 my-4 head">Add Payslip</h2>;
    }
  }

  return (
    <div className="container mt-8">
      <div className=" mt-4">
        {pageTitle()}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fs-5 text">Employee Id :</label>
              <input
                type="number"
                className="form-control input-outline text-center"
                name="employeeId"
                value={data.employeeId}
                onChange={handleChange}
              />
              {error.employeeId && (
                <div className="text-danger">{errors.employeeId}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label fs-5 text">Month :</label>
              <select
                className="form-control input-outline text-center"
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
              {error.month && <div className="text-danger">{errors.month}</div>}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fs-5 text">Year :</label>
              <input
                type="number"
                className="form-control input-outline text-center"
                name="year"
                value={data.year}
                onChange={handleChange}
              />
              {error.year && <div className="text-danger">{errors.year}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fs-5 text">Basic pay :</label>
              <input
                type="number"
                className="form-control input-outline text-center"
                name="basicPay"
                value={data.basicPay}
                onChange={handleChange}
              />
              {error.basicPay && (
                <div className="text-danger">{errors.basicPay}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fs-5 text">Allowance :</label>
              <input
                type="number"
                className="form-control input-outline text-center"
                name="allowances"
                value={data.allowances || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fs-5 text">Deduction :</label>
              <input
                type="number"
                className="form-control input-outline text-center"
                name="deductions"
                value={data.deductions || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fs-5 text">Payment Status :</label>
              <select
                className="form-control input-outline text-center"
                name="paymentStatus"
                value={data.paymentStatus}
                onChange={handleChange}
              >
                <option value="">Select Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-bg text-white w-25 fs-5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaylisFormComponent;
