import logoutwhite from "../images/logoutwhite.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sidebar">
       <Link className="sidebar_list-item" to="/dashboard/inicio"><h2 className="sidebar_inicio">Inicio</h2></Link>
      <ul className="sidebar_list">
        <li className="sidebar_list-item">
        </li>
        <li className="sidebar_list-item">
          <Link className="sidebar_list-item" to="/dashboard/basededatos">Base de datos</Link>
        </li>
        <li className="sidebar_list-item">
          <Link className="sidebar_list-item" to="/dashboard/ingresarregistos">Ingresar y modificar Registros</Link>
        </li>
        <li className="sidebar_list-item">
          <Link className="sidebar_list-item" to="/dashboard/tutelas">Tutelas asignadas</Link>
        </li>
        <li className="sidebar_list-item">
          <Link className="sidebar_list-item" to="/dashboard/fallos">Fallos concede</Link>
        </li>
        <li className="sidebar_list-item">
          <Link className="sidebar_list-item" to="/dashboard/incidentes">Incidentes</Link>
        </li>
        <li className="sidebar_list-item">
          <Link className="sidebar_list-item" to="/dashboard/accionesp">Acciones populares</Link>
        </li>
      </ul>

      <div className="sidebar_logout">
        <button onClick={handleLogout} className="sidebar_butto-logout">
          Cerrar sesión
          <img className="sidebar_logut-img" src={logoutwhite} alt="Icono de salida" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;