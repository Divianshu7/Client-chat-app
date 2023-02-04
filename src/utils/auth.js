import axios from "axios";

export const register = async (data) => await axios.post(`${process.env.REACT_APP_API}/auth/register`, data)
export const login = async (data) => await axios.post(`${process.env.REACT_APP_API}/auth/login`, data)
