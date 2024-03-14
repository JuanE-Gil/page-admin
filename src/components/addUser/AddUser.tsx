import { useState } from "react";

import "./addUser.scss";

import { registerUser } from "../../axiosConfig";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Navigate } from "react-router-dom";

type Props = {
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddUser = (props: Props) => {
  const [username, setUsername] = useState("")
  const [nombre, setNombre] = useState("");
  const [apellido_Paterno, setApellido_Paterno] = useState("");
  const [apellido_Materno, setApellido_Materno] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [celular, setCelular] = useState("");
  const [pais, setPais] = useState("");
  const [idRol, setIdRol] = useState("3");
  const [img, setImg] = useState<null | File>(null);
  const [showPassword, setShowPassword] = useState(false);

  const createFormData = (idRol: string, img?: File) => {
    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("username", username);
    formData.append("apellido_Paterno", apellido_Paterno);
    formData.append("apellido_Materno", apellido_Materno);
    formData.append("correo_electronico", correoElectronico);
    formData.append("contrasena", contrasena);
    formData.append("celular", celular);
    formData.append("pais", pais);
    formData.append("idrol", idRol);

    if (img) {
      formData.append("img", img);
    }

    return formData;
  };

  const getIdRol = () => {
    setIdRol("3");
    return idRol;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtener el valor actual de idRol
    const idRol = await getIdRol();

    // Crear el objeto FormData
    const formData = createFormData(idRol, img);

    try {
      const response = await registerUser(formData);

      if (response.estado == "OK") {
        console.log("Usuario registrado exitosamente!");
        console.log(response);
        props.setOpen(false);
        window.location.replace("/users");
      } else {
        console.log("Error al registrar usuario:", response.data.message);
        console.log(response);
      }
    } catch (error) {
      console.log("Error inesperado al registrar usuario:", error.message);
    } finally {
      console.log(formData);
    }
  };

  return (
    <div className="addUser">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>X</span>
        <h1>Agregar Nuevo Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              placeholder="nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Apellido Paterno</label>
            <input
              type="text"
              name="apellido_Paterno"
              value={apellido_Paterno}
              placeholder="Apellido Paterno"
              onChange={(e) => setApellido_Paterno(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Apellido Materno</label>
            <input
              type="text"
              name="apellido_Materno"
              value={apellido_Materno}
              placeholder="Apellido Materno"
              onChange={(e) => setApellido_Materno(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correoElectronico"
              value={correoElectronico}
              placeholder="Correo Electrónico"
              onChange={(e) => setCorreoElectronico(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Contraseña </label>
            <input
              type={showPassword ? "text" : "password"}
              name="contrasena"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              InputAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="item">
            <label>Celular</label>
            <input
              type="tel"
              name="celular"
              value={celular}
              placeholder="Celular"
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
          <div className="item">
            <label>País</label>
            <select
              id="pais"
              name="pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="">Seleccionar Pais</option>
              <option value="Peru">Perú</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
            </select>
          </div>
          <div className="item">
            <label>Imagen</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
