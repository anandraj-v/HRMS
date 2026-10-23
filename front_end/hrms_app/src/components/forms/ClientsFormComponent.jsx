import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClientById,
  updateClient,
  createClient,
} from "../../services/Clients";

const ClientsFormComponent = () => {
  const [data, setData] = useState({
    clientName: "",
    industry: "",
    contactEmail: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    clientName: "",
    industry: "",
    contactEmail: "",
    status: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getClientById(id)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching client:", error);
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
        updateClient(id, data)
          .then(() => {
            navigate("/clients");
          })
          .catch((error) => {
            console.error("Error updating client:", error);
          });
      } else {
        createClient(data)
          .then(() => {
            navigate("/clients");
          })
          .catch((error) => {
            console.error("Error creating client:", error);
          });
      }
    }
  };

  const formValidate = () => {
    let isValid = true;
    const newErrors = {
      clientName: "",
      industry: "",
      contactEmail: "",
      status: "",
    };
    if (!data.clientName) {
      newErrors.clientName = "Client Name is required";
      isValid = false;
    }
    if (!data.industry) {
      newErrors.industry = "Industry is required";
      isValid = false;
    }
    if (!data.contactEmail) {
      newErrors.contactEmail = "Contact Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.contactEmail)) {
      newErrors.contactEmail = "Contact Email is invalid";
      isValid = false;
    }
    if (!data.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  function pageTitle() {
    if (id) {
      return <h2 className="text-center h-3 my-4 head">Update Client</h2>;
    } else {
      return <h2 className="text-center h-3 my-4 head">Add Client</h2>;
    }
  }
  return (
    <div className="container mt-8">
      <div className="mt-4">{pageTitle()}</div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className=" col-md-6">
            <label className="form-label text">Client Name :</label>
            <input
              type="text"
              className="form-control input-outline text-center"
              name="clientName"
              value={data.clientName}
              onChange={handleChange}
            />
            {errors.clientName && (
              <div className="text-danger">{errors.clientName}</div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label text">Industry:</label>
            <input
              type="text"
              className="form-control input-outline text-center"
              name="industry"
              value={data.industry}
              onChange={handleChange}
            />
            {errors.industry && (
              <div className="text-danger">{errors.industry}</div>
            )}
          </div>
        </div>
        <div className="row mb-3 ">
          <div className="col-md-6 ">
            <label className="form-label text">Contact Email:</label>
            <input
              type="email"
              className="form-control input-outline text-center"
              name="contactEmail"
              value={data.contactEmail}
              onChange={handleChange}
            />
            {errors.contactEmail && (
              <div className="text-danger">{errors.contactEmail}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label align-center text">Status:</label>
            <select
              className="form-control input-outline text-center"
              name="status"
              value={data.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <div className="text-danger">{errors.status}</div>
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
  );
};

export default ClientsFormComponent;
