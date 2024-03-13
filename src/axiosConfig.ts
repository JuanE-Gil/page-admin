import axios from "axios";
import tokenUtils from "./tokenUtils";

const authToken = tokenUtils.getToken();
const baseURL = "https://rapiauto.azurewebsites.net";


const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
