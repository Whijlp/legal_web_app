import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import {TabsContext} from "../../../utils/TabsContext"

function TabContainer() {
  const tabs = ["general", "fallos", "apelacion", "incidentes", "otros"];
  const navigate = useNavigate();
  const location = useLocation();
  const [datosTabs, setDatosTabs] = useState({
  falloInstancia: null,
  notificacion: null,

});
const handleGuardarTab = (nombreTab, nuevosDatos) => {
  setDatosTabs((prev) => ({
    ...prev,
    [nombreTab]: nuevosDatos,
  }));
  console.log(`Guardado ${nombreTab}:`, nuevosDatos);
};

const currentTab = tabs.find((tab) => location.pathname.endsWith(tab)) || "general";

  const [activeTab, setActiveTab] = useState(currentTab || "general");

  useEffect(() => {
    setActiveTab(currentTab || "general");
  }, [location]);

  const handleTabClick = (tab) => {
    navigate(tab); 
  };


  return (
    <TabsContext.Provider value={{ datosTabs, handleGuardarTab }}>
    <div className="tabContainer">
      <div
        role="tablist"
        aria-label="Secciones del formulario"
        className="tabContainer_tabs"
      >
        <div className="tabContainer_tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab}
              name={tab}
              role="tab"
              aria-selected={activeTab === tab}
              tabIndex={activeTab === tab ? 0 : -1}
              className={`pestaña ${activeTab === tab ? "activa" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tabContainer_tabs-content">
      


          <Outlet />
        </div>
      </div>
    </div>
    </TabsContext.Provider>
  );
}

export default TabContainer;