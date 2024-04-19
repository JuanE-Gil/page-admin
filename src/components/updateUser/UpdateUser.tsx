import { useEffect, useState } from "react";

import "./UpdateUser.scss";

import { get, post } from "../../axiosConfig";

const UpdateUser = (props) => {
  const { setOpenUpdateUser, onUserUpdated, userId } = props;
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido_Paterno, setApellido_Paterno] = useState("");
  const [apellido_Materno, setApellido_Materno] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [celular, setCelular] = useState("");
  const [img, setImg] = useState<null | File>(null);

  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await get(
          `/usuario/buscar_usuario_por_id?id=${userId}`
        );
        setUsername(response.data.username);
        setNombre(response.data.nombre);
        setApellido_Paterno(response.data.apellido_Paterno);
        setApellido_Materno(response.data.apellido_Materno);
        setCorreoElectronico(response.data.correoElectronico);
        setCelular(response.data.celular);
        setImg(response.data.img);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const createFormData = (img?: File) => {
    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("username", username);
    formData.append("apellido_Paterno", apellido_Paterno);
    formData.append("apellido_Materno", apellido_Materno);
    formData.append("correo_electronico", correoElectronico);
    formData.append("celular", celular);

    if (img) {
      formData.append("img", img);
    }

    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = createFormData(img);

    try {
      const response: any = await post(
        `/usuario/actualizar_admin?usuario=${userId}`,
        formData,
        "multipart/form-data"
      );
      console.log(response);
      if (response.estado == "OK") {
        console.log("Usuario actualizado exitosamente!");
        console.log(userId + " has been update!");
        alert(userId + " has been update!");

        // window.location.replace("/users");
      } else {
        console.log("Error al actualizar usuario:", response);
      }
    } catch (error) {
      console.log(userId + "  not update!");
      alert(userId + "  not update!");
      console.log("Error inesperado al actualizar usuario:", error);
    } finally {
      setOpenUpdateUser(false);
      console.log(formData);
    }
  };

  const handleClose = () => {
    setOpenUpdateUser(false);
    onUserUpdated && onUserUpdated();
  };

  return (
    <div className="UpdateUser">
      <div className="modal">
        <span className="close" onClick={handleClose}>
          X
        </span>
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

export default UpdateUser;
