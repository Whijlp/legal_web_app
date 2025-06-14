import cnsc from "../images/cnsc.png";
import preator from "../images/praetoreLogo.png";
import preatorName from "../images/praetorName.png";

function Header() {
  return (
    <header className="header">
        <img src={cnsc} className="header_img-cnsc" alt="Logo cnsc" />

      <div className="header_center">
            <img src={preator} className="header_img-praetor" alt="Logo preator" />
            <img src={preatorName} className="header_img-praetor-name" alt="Logo preator" />
            <h2 className="header_title">Sistema para la Gestion para de Acciones Constitucionales</h2>
      </div>
      <a href="/login" className="header_login">
    Login <span role="img" aria-label="login icon">🔐</span>
  </a>
    </header>
  );
}

export default Header;
