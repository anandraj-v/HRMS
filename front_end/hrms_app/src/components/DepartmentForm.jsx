import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDepartmentById,
  updateDepartment,
  createDepartment,
} from "../services/Departments";

const DepartmentForm = () => {
  const [data, setData] = useState({
    departmentName: "",
  });
  const [errors, setErrors] = useState({
    departmentName: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching department:", error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidate()) {
      if (id) {
        updateDepartment(id, data)
          .then(() => {
            navigate("/departments");
          })
          .catch((error) => {
            console.error("Error updating department:", error);
          });
      } else {
        createDepartment(data)
          .then(() => {
            navigate("/departments");
          })
          .catch((error) => {
            console.error("Error creating department:", error);
          });
      }
    }
  };

  const formValidate = () => {
    let isValid = true;
    const newErrors = {
      departmentName: "",
    };

    if (!data.departmentName) {
      newErrors.departmentName = "Department name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  }
  console.log("Department data:", data);
  return (
    <div className="container ">
      <div className="row ">
        <div className="card mt-5 col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="departmentName"
                  value={data.departmentName}
                  onChange={handleChange}
                />
                {errors.departmentName && (
                  <div className="text-danger">{errors.departmentName}</div>
                )}
              </div>
              <button type="submit" className="btn btn-bg ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
