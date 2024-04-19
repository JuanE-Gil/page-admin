import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useEffect, useState } from "react";
import { get } from "../../axiosConfig";
import AddUser from "../../components/addUser/AddUser";
import UpdateUser from "../../components/updateUser/UpdateUser";
import axios from "axios";
import tokenUtils from "../../tokenUtils";

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
  const [idUser, setIdUser] = useState();
  const [data, setData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: any = await get("/usuario/listar_solo_usuarios");
      const userData: UserData[] = response.data.map((user: any) => ({
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
      setData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const authToken = tokenUtils.getToken();

      const axiosInstance = axios.create({
        baseURL: 'https://rapidauto.up.railway.app',
        headers: {
          Authorization: `Bearer ${authToken}`
        }

      });

      await axiosInstance.put(`/usuario/desactivado_por_admin?id=${id}`);
      alert(id + " ha sido desactivado");
      await fetchData();
    } catch (error) {
      console.error("Error al desactivar elemento:", error);
    }
  };

  const handleEditClick = (id: number) => {
    setIdUser(id);
    setOpenUpdateUser(true);
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
      type: "string",
    },
    {
      field: "action",
      type: "actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="action">
            <div className="edit" onClick={() => handleEditClick(params.row.id)}>
              <img src="/view.svg" alt="" />
            </div>
            <div className="delete" onClick={() => handleDelete(params.row.id)}>
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
    fetchData();
  };

  const handleCloseUpdateUser = () => {
    setOpenUpdateUser(false);
    fetchData();
  };

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
        {openAddUser && (
          <AddUser
            setOpenAddUser={setOpenAddUser}
            onUserAdded={handleCloseAddUser}
          />
        )}
        {openUpdateUser && (
          <UpdateUser
            setOpenUpdateUser={setOpenUpdateUser}
            onUserUpdated={handleCloseUpdateUser}
            userId={idUser}
          />
        )}
      </div>
    </>
  );
};

export default Users;
