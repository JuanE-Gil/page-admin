import { useEffect, useState } from "react";
import tokenUtils from "../../tokenUtils";
import axios from "axios";
import React from "react";
import "../../styles/output.css"

function Profile() {
    const [userData, setUserData] = useState([]);
    const [editable, setEditable] = useState(true);

    // Estados para los datos del usuario
    const [nombre, setNombre] = useState("");
    const [apellido_Paterno, setApellido_Paterno] = useState("");
    const [apellido_Materno, setApellido_Materno] = useState("");
    const [correo_electronico, setCorreo_electronico] = useState("");
    const [img, setImg] = useState<null | File>(null);
    const [celular, setCelular] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [idRol, setIdRol] = useState("1");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const authToken = tokenUtils.getToken();
                const baseURL = "https://rapidauto.up.railway.app";
                const axiosGet = axios.create({
            baseURL,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
                const response = await axiosGet.get("/usuario/buscar_usuario");
                setUserData(response.data.data);
                console.log(userData);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDeleteAccount = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        console.log("");
        setIsModalOpen(false);
    };


    const handleEditData = () => {
        setEditable(false);
        setNombre(userData.nombre);
        setApellido_Paterno(userData.apellido_Paterno);
        setApellido_Materno(userData.apellido_Materno);
        setCorreo_electronico(userData.correoElectronico);
        setCelular(userData.celular);
        setContrasena(userData.contrasena);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = tokenUtils.getToken();
        const baseURL = "https://rapidauto.up.railway.app";
        const axiosUpdate = axios.create({
            baseURL,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data",
            },
        });

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido_Paterno", apellido_Paterno);
        formData.append("apellido_Materno", apellido_Materno);
        formData.append("correo_electronico", correo_electronico);
        formData.append("celular", celular);
        formData.append("contrasena", contrasena);
        formData.append("idrol", idRol);

        formData.append("img", img);

        try {
            const response = await axiosUpdate.put(`/usuario/actualizar_admin?usuario=${userData.id_usuario}`, formData);
            alert("Usuario Actualizado")
            window.location.href = "/profile";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setEditable(true);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-900">
            <div className="flex w-full max-w-6xl flex-col items-center space-y-6 rounded-lg bg-slate-800 p-10 shadow-xl ">
                <h1 className="mb-4 text-5xl font-bold text-white">{`Bienvenido ${userData.nombre}`}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full items-center space-x-8">
                        <img
                            src={`data:image/jpeg;base64,${userData.img}`}
                            alt="Perfil"
                            className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-xl"
                        />
                        <div className="flex-grow">
                            <div className="mb-6">
                                <label
                                    htmlFor="nombre"
                                    className="text-lg font-semibold text-white"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={userData.username}
                                    className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none `}
                                    disabled={true}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="nombre"
                                    className="text-lg font-semibold text-white"
                                >
                                    Nombres
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={editable ? userData.nombre : nombre}
                                    onChange={(event) => setNombre(event.target.value)}
                                    className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                    disabled={editable}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="nombre"
                                    className="text-lg font-semibold text-white"
                                >
                                    Apellido Paterno
                                </label>
                                <input
                                    type="text"
                                    id="apellido"
                                    value={editable ? userData.apellido_Paterno : apellido_Paterno}
                                    onChange={(event) => setApellido_Paterno(event.target.value)}
                                    className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                    disabled={editable}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="nombre"
                                    className="text-lg font-semibold text-white"
                                >
                                    Apellido Materno
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={editable ? userData.apellido_Materno : apellido_Materno}
                                    onChange={(event) => setApellido_Materno(event.target.value)}
                                    className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                    disabled={editable}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="correo"
                                    className="text-lg font-semibold text-white"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="text"
                                    id="correo"
                                    value={editable ? userData.correoElectronico : correo_electronico}
                                    onChange={(event) => setCorreo_electronico(event.target.value)}
                                    className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                    disabled={editable}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="celular"
                                    className="text-lg font-semibold text-white"
                                >
                                    Celular
                                </label>
                                <input
                                    type="text"
                                    id="celular"
                                    value={editable ? userData.celular : celular}
                                    onChange={(event) => setCelular(event.target.value)}
                                    className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                    disabled={editable}
                                />
                            </div>
                            <div className="mb-6">
                                {editable ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                        <label
                                            htmlFor="contrasena"
                                            className="text-lg font-semibold text-white"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            id="contrasena"
                                            value={contrasena || ""}
                                            onChange={(event) => setContrasena(event.target.value)}
                                            className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                            disabled={editable}
                                        />
                                        <label
                                            htmlFor="img"
                                            className="text-lg font-semibold text-white"
                                        >
                                            Imagen
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={(e) => setImg(e.target.files[0])}
                                            className={`focus:shadow-outline w-full appearance-none rounded border border-transparent bg-gray-700 px-3 py-2 leading-tight text-gray-50 shadow focus:outline-none ${editable ? '' : 'bg-gray-400'}`}
                                            disabled={editable}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <br />
                <div className="flex w-full justify-center space-x-5 ">
                    <button
                        onClick={handleDeleteAccount}
                        className="rounded-md border border-red-600 px-6 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
                    >
                        Eliminar Cuenta
                    </button>
                    {editable ? (
                        <>
                            <button
                                onClick={handleEditData}
                                className="rounded-md border border-blue-600 px-6 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                            >
                                Editar Datos
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSubmit}
                                className="rounded-md border border-green-600 px-6 py-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                            >
                                Enviar Datos
                            </button>
                        </>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <h2 className="font-bold text-lg">¿Estás seguro que quieres eliminar esta cuenta?</h2>
                        <div className="flex justify-around mt-4">
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300">
                                Sí
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-700 transition duration-300">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
