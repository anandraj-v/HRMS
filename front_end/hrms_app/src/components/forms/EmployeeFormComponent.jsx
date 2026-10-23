import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  listEmployees,
  getEmployeeById,
  updateEmployee,
  createEmployee,
} from "../../services/Employees";
import { listDepartments } from "../../services/Departments";
import { listClients } from "../../services/Clients";

const EmployeeFormComponent = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hireDate: "",
    baseSalary: "",
    departmentId: "",
    clientId: "",
    managerId: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hireDate: "",
    baseSalary: "",
    departmentId: "",
    clientId: "",
  });
  const [departments, setDepartments] = useState([]);

  const [clients, setClients] = useState([]);

  const [employees, setEmployees] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });

    listClients()
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });

    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });

    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setData((prevData) => ({
      ...prevData,
      managerId: prevData.managerId === "" ? null : prevData.managerId,
    }));

    console.log("calling handle submit");
    if (formValidate()) {
      console.log("inside");
      if (id) {
        updateEmployee(id, data).then(() => {
          navigate("/employees");
        });
      } else {
        createEmployee(data).then(() => {
          navigate("/employees");
        });
      }
      //console.log("employees data", data);
    }
  };

  const formValidate = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      hireDate: "",
      baseSalary: "",
      departmentId: "",
      clientId: "",
    };

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    if (!data.hireDate.trim()) {
      newErrors.hireDate = "Hire date is required";
      isValid = false;
    }
    if (!data.baseSalary) {
      newErrors.baseSalary = "Base salary is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-center h-3 my-4 head">Update Employee</h2>;
    } else {
      return <h2 className="text-center h-3 my-4 head">Add Employee</h2>;
    }
  }

  return (
    <div className="container mt-8 ">
      <div className="mt-4">
        {pageTitle()}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 ">
              <label className="form-label text">First Name:</label>
              <input
                type="text"
                className="form-control input-outline text-center"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <div className="text-danger">{errors.firstName}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label text">Last Name:</label>
              <input
                type="text"
                className="form-control input-outline text-center"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text">Email:</label>
              <input
                type="email"
                className="form-control input-outline text-center"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label text">Phone Number:</label>
              <input
                type="tel"
                className="form-control input-outline text-center"
                name="phone"
                value={data.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text">Hire Date:</label>
              <input
                type="date"
                className="form-control input-outline text-center"
                name="hireDate"
                value={data.hireDate}
                onChange={handleChange}
              />
              {errors.hireDate && (
                <div className="text-danger">{errors.hireDate}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label text">Base Salary:</label>
              <input
                type="number"
                className="form-control input-outline text-center"
                name="baseSalary"
                value={data.baseSalary}
                onChange={handleChange}
              />
              {errors.baseSalary && (
                <div className="text-danger">{errors.baseSalary}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text">Department Id:</label>
              <select
                className="form-control input-outline text-center"
                name="departmentId"
                value={data.departmentId}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {` ${dept.departmentName} ${dept.departmentId}`}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <div className="text-danger">{errors.departmentId}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label text">Client Id:</label>
              <select
                className="form-control input-outline text-center"
                name="clientId"
                value={data.clientId}
                onChange={handleChange}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.clientId} value={client.clientId}>
                    {` ${client.clientName} ${client.clientId}`}
                  </option>
                ))}
              </select>
              {errors.clientId && (
                <div className="text-danger">{errors.clientId}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text">Manager Id:</label>
              <select
                className="form-control input-outline text-center"
                name="managerId"
                value={data.managerId || ""}
                onChange={handleChange}
              >
                <option value="">Select Manager</option>

                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {` ${employee.firstName} ${employee.employeeId}`}
                  </option>
                ))}
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

export default EmployeeFormComponent;
