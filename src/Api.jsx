import axios from "axios";

export const Api = axios.create({
  baseURL: "https://password-vault-server-eq9u.onrender.com/api/v1",
});
