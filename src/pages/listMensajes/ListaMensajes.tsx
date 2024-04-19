import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./listaMensajes.scss";
import { useEffect, useState } from "react";
import { get } from "../../axiosConfig";

const ListaMensajes = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await get("/cliente/listar");
                const data = response.data;
                setData(
                    data.map((data) => ({
                        id: data.id_cliente,
                        nombre: data.usuario.nombre,
                        img: data.usuario.img,
                        apellido_paterno: data.usuario.apellido_Paterno,
                        apellido_materno: data.usuario.apellido_Materno,
                        email: data.usuario.correoElectronico,
                        celular: data.usuario.celular,
                        descripcion: data.descripcion

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
            width: 150,
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
            field: "nombre",
            type: "string",
            headerName: "Nombre",
            width: 150,
        },

        {
            field: "apellido_paterno",
            type: "string",
            headerName: "Apellido Paterno",
            width: 150,
        },

        {
            field: "apellido_materno",
            type: "string",
            headerName: "Apellido Materno",
            width: 150,
        },

        {
            field: "email",
            headerName: "Email",
            type: "string",
            width: 150,
        },

        {
            field: "celular",
            type: "number",
            headerName: "Celular",
            width: 150,
        },

        {
            field: "descripcion",
            headerName: "Descripcion",
            type: "string",
            width: 300,
        },

    ];
    return (
        <>
            <div className="sales">
                <div className="info">
                    <h1>Listado de Mensajes</h1>
                </div>
                {isLoading ? (
                    <div className="loading">
                        <p>Cargando mensajes disponibles...</p>
                        <img src="/1.png" alt="" />
                    </div>
                ) : data.length > 0 ? (
                    <DataTable slug="" columns={columns} rows={data} />
                ) : (
                    <p>No se han encontrado mensajes disponibles.</p>
                )}
            </div>
        </>
    );
};
export default ListaMensajes;