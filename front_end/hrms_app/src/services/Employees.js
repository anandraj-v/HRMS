import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/employees";


export const listEmployees = async () => await axios.get(REST_API_BASE_URL);

export const createEmployee = async (employee) => await axios.post(REST_API_BASE_URL, employee);

export const getEmployeeById = async (id) => await axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateEmployee = async (id, employee) => await axios.put(`${REST_API_BASE_URL}/${id}`, employee);

export const deleteEmployee = async (id) => await axios.delete(`${REST_API_BASE_URL}/${id}`);

