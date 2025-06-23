import Sidebar from '../Sidebar';
import { Outlet } from 'react-router';


function Dashboard() {
  return (
    <>
    <Sidebar/>
    <div className="dashboard">
      <div className="dashboard_content">


        
        <Outlet />
      </div>

   
    </div>
    </>
  );
}

export default Dashboard;