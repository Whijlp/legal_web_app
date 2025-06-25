import Sidebar from "../Sidebar";
import { Outlet } from "react-router";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_content">
        
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
