import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import "./vehicles.scss";
import { GridColDef } from "@mui/x-data-grid";
import { del, get } from "../../axiosConfig";

const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await get("/auto");
        const carData = response.data;
        setData(
          carData.map((car) => ({
            id: car.idAuto,
            category_id: car.idCategoria.descripcion,
            img: car.img2,
            model: car.modelo,
            engine: car.motor,
            mileage: car.kilometraje,
            status: car.estatus,
            brand: car.marca,
            country: car.pais,
            description: car.descripcion,
            price: car.precio,
            user: car.idusuario.nombre,
          }))
        );
        console.log(carData);
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
      await del(`/auto/eliminar?id=${id}`);
      alert(id + " has been deleted!");
      await fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Image",
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
      field: "model",
      type: "string",
      headerName: "Modelo",
      width: 150,
    },
    {
      field: "engine",
      type: "string",
      headerName: "Motor",
      width: 150,
    },
    {
      field: "mileage",
      type: "string",
      headerName: "Kilometraje",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Marca",
      type: "string",
      width: 150,
    },
    {
      field: "category_id",
      headerName: "Categoria",
      type: "string",
      width: 150,
    },
    {
      field: "user",
      headerName: "Usuario",
      type: "string",
      width: 100,
    },
    {
      field: "price",
      headerName: "Precio",
      type: "number",
      width: 100,
    },
    {
      field: "status",
      headerName: "Estatus",
      type: "boolean",
      width: 100,
    },
    {
      field: "action",
      type: "actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="action">
            <div className="edit" onClick={() => handleDelete(params.row.id)}>
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


  return (
    <div className="vehicles">
      <div className="info">
        <h1>Listado de Autos</h1>
      </div>
      {isLoading ? (
        <div className="loading">
          <p>Cargando autos disponibles...</p>
          <img src="/1.png" alt="" />
        </div>
      ) : data.length > 0 ? (
        <DataTable slug="vehicle" columns={columns} rows={data} />
      ) : (
        <p>No se han encontrado autos disponibles.</p>
      )}
      {open && <Add slug="vehicle" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Vehicles;
