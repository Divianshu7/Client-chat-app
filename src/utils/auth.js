import axios from "axios";

export const register = async (data) => await axios.post(`${process.env.REACT_APP_API}/auth/register`, data)
export const login = async (data) => await axios.post(`${process.env.REACT_APP_API}/auth/login`, data)
export const setAvatar = async (userId, data) => await axios.post(`${process.env.REACT_APP_API}/auth/setAvatar/${userId}`, data)
export const allUsers = async (userId) => await axios.get(`${process.env.REACT_APP_API}/auth/allUsers/${userId}`)
export const sendMsg = async (data) => await axios.post(`${process.env.REACT_APP_API}/addMsg`, data)
export const getAllMessage = async (data) => await axios.post(`${process.env.REACT_APP_API}/getMsg`, data)
