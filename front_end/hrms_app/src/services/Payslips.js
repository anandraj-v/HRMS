import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/payslips";


export const listPayslips = async () => await axios.get(REST_API_BASE_URL);

export const createPayslips = async (payslips) => await axios.post(REST_API_BASE_URL, payslips);

export const getPayslipsById = async (id) => await axios.get(`${REST_API_BASE_URL}/${id}`);

export const updatePayslips = async (id, payslips) => await axios.put(`${REST_API_BASE_URL}/${id}`, payslips);

export const deletePayslips = async (id) => await axios.delete(`${REST_API_BASE_URL}/${id}`);

