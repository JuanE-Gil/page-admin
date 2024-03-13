const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

const getToken = () => {
  return localStorage.getItem("authToken");
};

const decodeToken = (token: string) => {
  return JSON.parse(atob(token.split(".")[1]));
};

export default { setToken, getToken, decodeToken };
