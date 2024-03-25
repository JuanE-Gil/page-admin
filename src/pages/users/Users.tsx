import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
import { del, get } from "../../axiosConfig";
import AddUser from "../../components/addUser/AddUser";
import UpdateUser from "../../components/updateUser/UpdateUser";

interface UserData {
  id: number;
  username: string;
  img: string;
  name: string;
  paternal_lastname: string;
  maternal_lastname: string;
  email: string;
  phone: string;
  country: string;
  rol: string;
  state: boolean;
}

const Users = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [data, setData] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await get("/usuario/listar_solo_usuarios");
        console.log(response);
        const userData: UserData[] = response.data.map((user) => ({
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
        }));
        console.log(userData);
        setData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await del(`/usuario/eliminar_admin?id=${id}`);
      console.log(id + " has been deleted!");
      alert(id + " has been deleted!");
      console.log(response);
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "img",
      headerName: "Avatar",
      width: 100,
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
    {
      field: "action",
      headerName: "Opciones",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="action">
            <div
              onClick={() => {
                setOpenUpdateUser(true), setIdUser(params.row.id);
              }}
            >
              <img src="/view.svg" alt="updateUser" />
            </div>
            <div className="delete" onClick={() => handleDelete(params.row.id)}>
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Usuarios</h1>
          <button onClick={() => setOpenAddUser(true)}>
            Agregar Nuevo Usuario
          </button>
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
        {openAddUser && <AddUser setOpenAddUser={setOpenAddUser} />}
        {openUpdateUser && (
          <UpdateUser setOpenUpdateUser={setOpenUpdateUser} userId={idUser} />
        )}
      </div>
    </>
  );
};

export default Users;
