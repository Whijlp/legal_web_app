import logoutwhite from "../images/logoutwhite.png";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar_inicio">Incio</h2>
      <ul className="sidebar_list">
        <li className="sidebar_list-item">Base de datos</li>
        <li className="sidebar_list-item">Ingresar y modificar Registros</li>
        <li className="sidebar_list-item">Tutelas asignadas</li>
        <li className="sidebar_list-item">Fallos concede</li>
        <li className="sidebar_list-item">incidentes</li>
        <li className="sidebar_list-item">Acciones populares</li>
      </ul>
      <div className="sidebar_logout">
        <button onClick={handleLogout} className="sidebar_butto-logout">
          Cerrar sesion
          <img className="sidebar_logut-img" src={logoutwhite} alt="Icono de salida" />
        </button>
        
      </div>
    </div>
  );
}

export default Sidebar;
