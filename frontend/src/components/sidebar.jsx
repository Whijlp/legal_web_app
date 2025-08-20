import logoutwhite from "../images/logoutwhite.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Gavel, Menu, DoorOpen, DatabaseBackup,
  PencilLine, LayoutList, FileWarning, Landmark, X
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const auth = useAuth();
  const { logout } = auth
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
 
    <span className="sidebar_burguer" onClick={() => setIsOpen(true)}>
      { !isOpen && <Menu /> }
    </span> 
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <span className="sidebar_close" onClick={closeSidebar}>
         { isOpen && <X />}
        </span>

        <Link className="sidebar_list-item" to="/inicio" onClick={closeSidebar}>
          <DoorOpen className="sidebar_list-icon"/>
          <span className="sidebar_text">Inicio</span>
        </Link>

        <ul className="sidebar_list">
          <li className="sidebar_list-item">
          
            <Link className="sidebar_list-item" to="/inicio/basededatos" onClick={closeSidebar}> 
              <DatabaseBackup className="sidebar_list-icon" />
            <span className="sidebar_text">Base de datos</span> 
            </Link>
          </li>
          <li className="sidebar_list-item">
           
            <Link className="sidebar_list-item" to="/inicio/ingresarregistos" onClick={closeSidebar}>
            <PencilLine className="sidebar_list-icon" />
           <span className="sidebar_text"> Ingresar y modificar Registros</span>
           </Link>
          </li>
          <li className="sidebar_list-item">
            
            <Link className="sidebar_list-item" to="/inicio/tutelas" onClick={closeSidebar}>
            <LayoutList className="sidebar_list-icon" />
            <span className="sidebar_text">Tutelas asignadas</span></Link>
          </li>
          <li className="sidebar_list-item">
            
            <Link className="sidebar_list-item" to="/inicio/fallos" onClick={closeSidebar}>
            <Gavel className="sidebar_list-icon" />
            <span className="sidebar_text">Fallos concede</span>
            </Link>
          </li>
          <li className="sidebar_list-item">
        
            <Link className="sidebar_list-item" to="/inicio/incidentes" onClick={closeSidebar}>
                <FileWarning className="sidebar_list-icon" />
            <span className="sidebar_text">Incidentes</span>
            </Link>
          </li>
          <li className="sidebar_list-item">
            
            <Link className="sidebar_list-item" to="/inicio/accionesp" onClick={closeSidebar}>
            <Landmark className="sidebar_list-icon"/>
            <span className="sidebar_text">Acciones populares</span></Link>
          </li>
        </ul>

        <div className="sidebar_logout">
          <button onClick={handleLogout} className="sidebar_butto-logout">
            <span className="sidebar_text">Cerrar sesión</span>
            <img className="sidebar_logout-img" src={logoutwhite} alt="Icono de salida" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
