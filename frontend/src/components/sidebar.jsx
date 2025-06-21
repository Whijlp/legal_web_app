import logout from "../images/logout.png";
function Sidebar() {
  return (
    <div className="sidebar">
      <h2>incio</h2>
      <ul>
        <li>Base de datos</li>
        <li>Ingresar y modificar Registros</li>
        <li>Tutelas asignadas</li>
        <li>Fallos concede</li>
        <li>incidentes</li>
        <li>Acciones populares</li>

        <button>Cerrar seseopm <img src={logout} alt="Icono de salida" /></button>
      </ul>
    </div>
  );
}

export default Sidebar;