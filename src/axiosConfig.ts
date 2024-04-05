import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import tokenUtils from "./tokenUtils";

const authToken = tokenUtils.getToken();
const baseURL = "https://rapidauto.up.railway.app";
// const baseURL = "http://localhost:8890";

interface IHeaders {
  Authorization?: string;
  "Content-Type"?: string;
}

const createHeaders = (authToken: string, contentType?: string): IHeaders => {
  const headers: IHeaders = {
    Authorization: `Bearer ${authToken}`,
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
};

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const setAuthToken = (authToken: string) => {
  axiosInstance.defaults.headers.common = createHeaders(authToken) as AxiosRequestHeaders;
};

const get = async <T>(url: string): Promise<T> => {
  const headers = createHeaders(authToken);
  const response = await axiosInstance.get<T>(url, { headers });
  return response.data;
};

const post = async <T>(
  url: string,
  data?: any,
  contentType?: string
): Promise<T> => {
  const headers = createHeaders(authToken, contentType);
  const response = await axiosInstance.post<T>(url, data, { headers });
  return response.data;
};

const put = async <T>(url: string, data?: any): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

const del = async <T>(url: string): Promise<T> => {
  const headers = createHeaders(authToken);
  const response = await axiosInstance.delete<T>(url, { headers });
  return response;
};

const registerUser = async (formData: FormData): Promise<AxiosResponse> => {
  try {
    const response = await post(
      "/usuario/registrar_usuario",
      formData,
      "multipart/form-data"
    );
    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return Promise.reject(error);
  }
};

const registerAdmin = async (formData: FormData): Promise<AxiosResponse> => {
  try {
    const response = await post(
      "/usuario/registrar_admin",
      formData,
      "multipart/form-data"
    );
    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return Promise.reject(error);
  }
};

export { setAuthToken, get, post, put, del, registerUser, registerAdmin };
