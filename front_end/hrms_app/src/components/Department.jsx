import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { listDepartments, deleteDepartment } from "../services/Departments";

const Department = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listDepartments()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const addDepartment = () => {
    navigate("/add-department");
  };

  const handleUpdate = (id) => {
    navigate(`/update-department/${id}`);
  };

  const handleDelete = (id) => {
    deleteDepartment(id)
      .then(() => {
        setData(data.filter((department) => department.departmentId !== id));
      })
      .catch((error) => {
        console.error("Error deleting department:", error);
      });
  };

  // console.log("Department data:", data);
  return (
    <div>
      <h2 className="text-center head my-3">List of Departments</h2>
      <button className="btn btn-bg text-white mb-2" onClick={addDepartment}>
        Add Department
      </button>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th className="center-cell text1 fs-5">Department Id</th>
            <th className="center-cell text1 fs-5">Department Name</th>
            <th className="center-cell text1 fs-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((department) => (
            <tr key={department.departmentId}>
              <td className="center-cell">{department.departmentId}</td>
              <td className="center-cell">{department.departmentName}</td>
              <td className="center-cell">
                <button
                  className="btn btn-info "
                  onClick={() => handleUpdate(department.departmentId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDelete(department.departmentId)}
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

export default Department;
