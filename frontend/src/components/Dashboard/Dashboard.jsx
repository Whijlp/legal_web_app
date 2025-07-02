import TareasDashboard from "./TareasDashboard";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ClimaApi from "../Dashboard/ClimaApi";

function Dashboard() {
  const location = useLocation();
  const esRutaPrincipal = location.pathname === "/inicio";
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_content">
        {esRutaPrincipal && <TareasDashboard /> }
        {esRutaPrincipal &&  <ClimaApi />}
        
        <Outlet />
      </div>
    </div>
  );
}
export default Dashboard;
