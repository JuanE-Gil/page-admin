import { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import "./sales.scss";

const Sales = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/venta");
        const saleData = response.data.data;
        setData(
          saleData.map((sale) => ({
            id: sale.id_venta,
            car: sale.idauto.modelo,
            user: sale.idusuario.nombre,
            creation_date: sale.fecha_creacion,
            price: sale.precio_auto,
            completion_date: sale.fecha_finalizacion,
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
    { field: "id", headerName: "ID", width: 50 },

    {
      field: "car",
      type: "string",
      headerName: "Auto",
      width: 200,
    },
    {
      field: "user",
      type: "string",
      headerName: "Usuario",
      width: 150,
    },
    {
      field: "creation_date",
      type: "date",
      headerName: "Fecha Creacion",
      width: 150,
      valueFormatter: (params) => {
        const dateFormatter = new Intl.DateTimeFormat('es-PE', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return dateFormatter.format(new Date(params.value));
      },
    },
    {
      field: "price",
      type: "number",
      headerName: "Precio",
      headerAlign: "center",
      width: 150,
      valueFormatter: (params) => {
        const price = parseFloat(params.value);
        return `${price.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 })}`;
      },
    },
    {
      field: "completion_date",
      type: "boolean",
      headerName: "Vendido",
      width: 200,
    },
  ];

  return (
    <>
      <div className="sales">
        <div className="info">
          <h1>Listado de Ventas</h1>
          {/* <button onClick={() => setOpen(true)}>Agregar Nuevo Usuario</button> */}
        </div>
        {isLoading ? (
          <div className="loading">
          <p>Cargando ventas disponibles...</p>
          <img src="/1.png" alt="" />
        </div>
        ) : data.length > 0 ? (
          <DataTable slug="sales" columns={columns} rows={data} />
        ) : (
          <p>No se han encontrado ventas disponibles.</p>
        )}
        {open && <Add slug="sales" columns={columns} setOpen={setOpen} />}
      </div>
    </>
  );
};
export default Sales;
