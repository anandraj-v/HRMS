import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDepartmentById,
  updateDepartment,
  createDepartment,
} from "../../services/Departments";

const DepartmentFormComponent = () => {
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
      return <h2 className="text-center h-3 my-4 head">Update Department</h2>;
    } else {
      return <h2 className="text-center h-3 my-4 head">Add Department</h2>;
    }
  }
  console.log("Department data:", data);
  return (
    <div className="container mt-8">
      <div className="mt-4">
        {pageTitle()}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3 d-flex justify-content-center">
            <div className="col-md-6 mb-2">
              <label className="form-label text">Department Name:</label>
              <input
                type="text"
                className="form-control input-outline text-center"
                name="departmentName"
                value={data.departmentName}
                onChange={handleChange}
              />
              {errors.departmentName && (
                <div className="text-danger">{errors.departmentName}</div>
              )}
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

export default DepartmentFormComponent;
