import { useState } from "react";
import axiosInstance from "../../axiosConfig";
import tokenUtils from "../../tokenUtils";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const button = e.target.querySelector("button");
    button.disabled = true;

    const request = {
      username,
      contrasena,
    };

    try {
      const response = await axiosInstance.post("/login", request);
      tokenUtils.setToken(response.data.token);
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        // Check for specific error codes or messages from the server
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
      } else {
        setErrorMessage("Error de red. Verifique su conexión a internet.");
      }
    } finally {
      button.disabled = false;
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
