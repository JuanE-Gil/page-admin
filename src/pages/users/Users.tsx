import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
import {get} from "../../axiosConfig";
import AddUser from "../../components/addUser/AddUser";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await get("/listar_solo_usuarios");
        const userData = response.data;
        setData(
          userData.map((user) => ({
            id: user.id_usuario,
            username: user.username,
            img: user.img,
            name: user.nombre,
            paternal_lastname: user.apellido_Paterno,
            maternal_lastname: user.apellido_Materno,
            email: user.correoElectronico,
            phone: user.celular,
            country: user.pais,
            rol: user.idRol.descripcion,
            state: user.estado,
          }))
        );
        console.log(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "img",
      headerName: "Avatar",
      width: 90,
      renderCell: (params) => {
        return (
          <img
            src={`data:image/jpeg;base64,${params.row.img}` || "/noavatar.png"}
            alt=""
          />
        );
      },
    },
    {
      field: "username",
      type: "string",
      headerName: "Username",
      width: 150,
    },
    {
      field: "name",
      type: "string",
      headerName: "Nombre",
      width: 150,
    },
    {
      field: "paternal_lastname",
      type: "string",
      headerName: "Apellido Paterno",
      width: 150,
    },
    {
      field: "maternal_lastname",
      type: "string",
      headerName: "Apellido Materno",
      width: 150,
    },
    {
      field: "email",
      type: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      type: "string",
      headerName: "Celular",
      headerAlign: "center",
      width: 150,
    },
    {
      field: "country",
      type: "string",
      headerName: "Pais",
      width: 90,
    },
    {
      field: "state",
      headerName: "Estado",
      width: 100,
      type: "boolean",
    },
  ];

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Usuarios</h1>
          <button onClick={() => setOpen(true)}>Agregar Nuevo Usuario</button>
        </div>
        {isLoading ? (
          <div className="loading">
            <p>Cargando usuarios disponibles...</p>
            <img src="/1.png" alt="" />
          </div>
        ) : data.length > 0 ? (
          <DataTable slug="usuario" columns={columns} rows={data} />
        ) : (
          <p>No se han encontrado usuarios disponibles.</p>
        )}
        {open && <AddUser setOpen={setOpen} />}
      </div>
    </>
  );
};

export default Users;
