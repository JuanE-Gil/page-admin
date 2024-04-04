import "./topBox.scss";
import { useState, useEffect } from "react";
import { get } from "../../axiosConfig";

const TopBox = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await get("/usuario/listar_solo_usuarios");
        const userData = response.data.slice(0, 7);
        setData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="topBox">
      <h1>Nuevos Usuarios</h1>
      {isLoading ? (
        <p>Cargando usuarios</p>
      ) : data.length > 0 ? (
        <div className="list">
          {data.map((user) => (
            <div className="listItem" key={user.id_usuario}>
              <div className="user">
                <img src={`data:image/jpeg;base64,${user.img}`} alt="" />
                <div className="userTexts">
                  <span className="username">{user.nombre}</span>
                  <span className="email">{user.username}</span>
                </div>
              </div>
              <span className="amount">{user.pais}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron usuarios .</p>
      )}
    </div>
  );
};

export default TopBox;
