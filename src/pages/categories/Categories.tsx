import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import "./categories.scss"

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/categoria");
        const catgetoria = response.data.data;
        setData(
          catgetoria.map((cat) => ({
            id: cat.idCategoria,
            description: cat.descripcion,
            img: cat.img
          })),
        );
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
      headerName: "Imagen",
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
      field: "description",
      type: "string",
      headerName: "Descripcion",
      width: 150,
    },

  ];

  return (
    <>
      <div className="categories">
        <div className="info">
          <h1>Usuarios</h1>
          <button onClick={() => setOpen(true)}>Agregar Nueva Categoria</button>
        </div>
        {isLoading ? (
          <div className="loading">
          <p>Cargando categorias disponibles...</p>
          <img src="/1.png" alt="" />
        </div>
        ) : data.length > 0 ? (
          <DataTable slug="category" columns={columns} rows={data} />
        ) : (
          <p>No se han encontrado categorias disponibles.</p>
        )}
        {open && <Add slug="category" columns={columns} setOpen={setOpen} />}
      </div>
    </>
  )
}

export default Categories