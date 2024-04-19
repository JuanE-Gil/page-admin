import { useState } from "react";
import { login } from "../../axiosConfig";
import tokenUtils from "../../tokenUtils";
import "./login.scss";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authToken = tokenUtils.getToken();
  const baseURL = "https://rapidauto.up.railway.app";

  const handleLogin = async (e) => {
    e.preventDefault();

    const request = {
      username,
      contrasena,
    };

    const axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await axiosInstance.post("/login", request);
      if (response.data.Rol == "ADMIN") {
        if (response.data.Estado == "Activo") {
          tokenUtils.setToken(response.data.token);
          window.location.href = "/";
        }
      } else {
        alert("Cuenta Inactiva, consultar con un administrador");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 403:
            setErrorMessage("Usuario o contraseña incorrecta.");
            break;
          case 500:
            setErrorMessage(
              "Error interno del servidor. Intente nuevamente más tarde."
            );
            break;
          default:
            setErrorMessage(
              "Error al iniciar sesión. Consulte con el administrador."
            );
        }
      }
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <img src="/1.png" alt="" />
        <h1>Bienvenido de nuevo!</h1>
        <form onSubmit={handleLogin}>
          <div className="inputContainer">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer">
            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <a href="#">Olvidaste tu contraseña?</a>
          <button type="submit" className="loginBtn">
            <p>Iniciar sesión</p>
          </button>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
