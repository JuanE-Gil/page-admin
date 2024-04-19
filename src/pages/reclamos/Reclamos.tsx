import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { get } from "../../axiosConfig";
import DataTable from "../../components/dataTable/DataTable";
import "./sales.scss";

const Reclamos = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await get("/reclamos_sugerencias/listar");
        const reclamos = response.data;
        console.log(response)
        setData(
          reclamos.map((reclamo) => ({
            id: reclamo.idre_su,
            user: reclamo.usuario.nombre,
            email: reclamo.usuario.correoElectronico,
            phone: reclamo.usuario.celular,
            img: reclamo.img,
            date: reclamo.fecha,
            message: reclamo.mensaje,
          }))
        );
        console.log(reclamos);
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
      field: "user",
      type: "string",
      headerName: "Usuario",
      width: 100,
    },

    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 200,
    },


    {
      field: "phone",
      type: "string",
      headerName: "Celular",
      width: 150,
    },

    {
      field: "date",
      type: "string",
      headerName: "Fecha",
      width: 150,
    },

    {
      field: "message",
      type: "string",
      headerName: "Mensaje",
      width: 400,
    },
  ];

  return (
    <>
      <div className="sales">
        <div className="info">
          <h1>Reclamos y Sugerencias</h1>
        </div>
        {isLoading ? (
          <div className="loading">
            <p>Cargando Reclamos disponibles...</p>
            <img src="/1.png" alt="" />
          </div>
        ) : data.length > 0 ? (
          <DataTable slug="sales" columns={columns} rows={data} />
        ) : (
          <p>No se han encontrado reclamos disponibles.</p>
        )}
      </div>
    </>
  );
};
export default Reclamos;
