import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import "./vehicles.scss";
import { GridColDef } from "@mui/x-data-grid";
import axiosInstance from "../../axiosConfig";

const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/auto");
        const carData = response.data.data;
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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      width: 250,
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
      width: 200,
    },
    {
      field: "brand",
      headerName: "Marca",
      type: "string",
      width: 200,
    },
    {
      field: "category_id",
      headerName: "Categoria",
      type: "string",
      width: 200,
    },
    {
      field: "user",
      headerName: "Usuario",
      type: "string",
      width: 200,
    },
  ];

  return (
    <div className="vehicles">
      <div className="info">
        <h1>Autos</h1>
        <button onClick={() => setOpen(true)}>Agregar Nuevo Auto</button>
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
