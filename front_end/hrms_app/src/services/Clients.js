import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/clients";

export const listClients = async () => await axios.get(REST_API_BASE_URL);

export const createClient = async (client) => await axios.post(REST_API_BASE_URL, client);

export const getClientById = async (id) => await axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateClient = async (id, client) => await axios.put(`${REST_API_BASE_URL}/${id}`, client);

export const deleteClient = async (id) => await axios.delete(`${REST_API_BASE_URL}/${id}`);