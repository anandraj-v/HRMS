import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listClients, deleteClient } from "../services/Clients";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listClients()
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);
  const addClient = () => {
    navigate("/add-client");
  };
  const updateClient = (id) => {
    navigate(`/update-clients/${id}`);
  };
  const handleDelete = (id) => {
    deleteClient(id)
      .then(() => {
        setClients(clients.filter((client) => client.clientId !== id));
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };
  return (
    <div>
      <h2 className="text-center head my-3">List of Clients</h2>
      <button className="btn btn-bg mb-2 text-white" onClick={addClient}>
        Add Client
      </button>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th className="center-cell text1 fs-5">ID</th>
            <th className="center-cell text1 fs-5">Name</th>
            <th className="center-cell text1 fs-5">Industry</th>
            <th className="center-cell text1 fs-5">Email</th>
            <th className="center-cell text1 fs-5">Status</th>
            <th className="center-cell text1 fs-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId}>
              <td className="center-cell">{client.clientId}</td>
              <td className="center-cell">{client.clientName}</td>
              <td className="center-cell">{client.industry}</td>
              <td className="center-cell">{client.contactEmail}</td>
              <td className="center-cell">{client.status}</td>
              <td className="center-cell">
                <button
                  className="btn btn-sm btn-info mr-2 "
                  onClick={() => updateClient(client.clientId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger mx-3"
                  onClick={() => handleDelete(client.clientId)}
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

export default Clients;
