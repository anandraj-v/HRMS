import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientById, updateClient, createClient } from "../services/Clients";

const ClientsForm = () => {
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
      return <h2 className="text-center">Update Client</h2>;
    } else {
      return <h2 className="text-center">Add Client</h2>;
    }
  }
  return (
    <div className="container ">
      <div className="row ">
        <div className="card mt-5 col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">Client Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="clientName"
                  value={data.clientName}
                  onChange={handleChange}
                />
                {errors.clientName && (
                  <div className="text-danger">{errors.clientName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Industry:</label>
                <input
                  type="text"
                  className="form-control"
                  name="industry"
                  value={data.industry}
                  onChange={handleChange}
                />
                {errors.industry && (
                  <div className="text-danger">{errors.industry}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Contact Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="contactEmail"
                  value={data.contactEmail}
                  onChange={handleChange}
                />
                {errors.contactEmail && (
                  <div className="text-danger">{errors.contactEmail}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Status:</label>
                <select
                  className="form-control"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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

export default ClientsForm;
