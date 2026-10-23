import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/departments";

export const listDepartments = async () => await axios.get(REST_API_BASE_URL);

export const createDepartment = async (department) => await axios.post(REST_API_BASE_URL, department);

export const getDepartmentById = async (id) => await axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateDepartment = async (id, department) => await axios.put(`${REST_API_BASE_URL}/${id}`, department);

export const deleteDepartment = async (id) => await axios.delete(`${REST_API_BASE_URL}/${id}`);