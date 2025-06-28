import cnsc from "../images/cnsc.png";
import preator from "../images/praetoreLogo.png";
import preatorName from "../images/praetorName.png";

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
  {isLoginPage ? (
      <Link to="/" className="header_login">
        ⬅ Volver al inicio
      </Link>
    ) : user ? (
      <span>👤 Bienvenido: {user.name}</span>
    ) : (
      <Link to="/auth/login" className="header_login">
        Iniciar sesión o
        Registrate
      </Link>
    )}
    </header>
  );
}

export default Header;
