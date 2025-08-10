import cnsc from "../images/cnsc.png";
import preator from "../images/praetoreLogo.png";
import preatorName from "../images/praetorName.png";
import login from "../images/login.png"
import{House, UserCog} from "lucide-react"

import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";


function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login"
  return (
    <header className="header">
      <img src={cnsc} className="header_img-cnsc" alt="Logo cnsc" />

      <div className="header_center">
        <img src={preator} className="header_img-praetor" alt="Logo preator" />
        <img
          src={preatorName}
          className="header_img-praetor-name"
          alt="Logo preator"
        />
        <h2 className="header_title">
          Sistema para la Gestion para de Acciones Constitucionales
        </h2>
      </div>
 {user ? (
  <span className="header_login">👤 Bienvenido: {user.nombre}</span>
) : location.pathname === "/auth/login" ? (
  <Link to="/" className="header_login">
    <span className="header_login-text">⬅ Volver al inicio</span>
    <House className="header_login-img"/>

    </Link>
) : (
  <Link to="/auth/login" className="header_login">
    <span className="header_login-text">Iniciar sesión o Regístrate</span>
   <UserCog  className="header_login-img"/>
  </Link>
  
)}

    </header>
  );
}

export default Header;
