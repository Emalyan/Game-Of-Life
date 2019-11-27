import axios from "axios";

export const apiCall = axios.create({
  withCredentials: true,
  baseURL: "https://localhost:44371",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
});
