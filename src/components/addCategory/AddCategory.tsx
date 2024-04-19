import { useState } from "react";

import "./addUser.scss";

import { registerCategory } from "../../axiosConfig";




const AddUser = ({ setOpenAddCategory, onCategoryAdded }) => {
  const [descripcion, setDescripcion] = useState("")

  const [img, setImg] = useState<null | File>(null);

  const createFormData = (img?: File) => {
    const formData = new FormData();

    formData.append("descripcion", descripcion);

    if (img) {
      formData.append("img", img);
    }
    return formData;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = createFormData(img);

    try {
      const response = await registerCategory(formData);

      if (response.estado == 'OK') {
        console.log("Categoria registrado exitosamente!");
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Error inesperado al categoria usuario:", error.message);
    } finally {
    }
  };

  const handleClose = () => {
    setOpenAddCategory(false);
    onCategoryAdded && onCategoryAdded();
  };

  return (
    <div className="addUser">
      <div className="modal">
        <span className="close" onClick={handleClose}>X</span>
        <h1>Agregar Nueva Categoria</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Nombre</label>
            <input
              type="text"
              name="descripcion"
              value={descripcion}
              placeholder="descripcion"
              onChange={(e) => setDescripcion(e.target.value)}
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

export default AddUser;
