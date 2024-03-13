import { Link } from "react-router-dom";
import "./navbar.scss";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState([]);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     setUsername(user);
  //   }
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/usuario/Buscar/Usuario");
        const usuario = response.data.data;
        setUsername(usuario.username);
        setImg(usuario.img);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.closest(".user") === null) {
        setShowDropdown(false);
      }
    };

    const handleLogout = () => {
      setUsername("");
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
        <span>Dashboard</span>
      </div>
      <div className="icons">
        {isLoading ? (
          <p>Cargando...</p>
        ) : username.length > 0 ? (
          <div className="user">
            <Link to="/profile">
              <img
                src={`data:image/jpeg;base64,${img}` || "/noavatar.png"}
                alt=""
              />
            </Link>
            <span onClick={() => setShowDropdown(!showDropdown)}>
              {username}
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="/profile">Perfil</a>
                <a href="/login">Cerrar sesión</a>
              </div>
            )}
          </div>
        ) : (
          <p>Ha ocurrido un error.</p>
        )}
        <img src="/settings.svg" alt="settings" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
