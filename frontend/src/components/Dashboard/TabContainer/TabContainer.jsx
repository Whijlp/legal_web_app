import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { TabsContext } from "../../../utils/TabsContext";

function TabContainer({ registro }) {
  const tabs = ["general", "fallos", "apelacion", "incidentes", "otros"];
  const navigate = useNavigate();
  const location = useLocation();
  const [datosTabs, setDatosTabs] = useState({
    general: {},
    fallos: {},
    apelacion: {},
    incidentes: {},
    otros: {},
  });

  // Función para inicializar datosTabs con el registro
  const handleGuardarTab = (nombreTab, nuevosDatos) => {
    setDatosTabs((prev) => ({
      ...prev,
      [nombreTab]: { ...prev[nombreTab], ...nuevosDatos },
    }));
    console.log(`Guardado ${nombreTab}:`, nuevosDatos);
  };

  // Sincronizar datosTabs con el registro al montar o cambiar
  useEffect(() => {
    if (registro) {
      console.log("Inicializando datosTabs con registro:", registro); // Depuración
      setDatosTabs((prev) => ({
        ...prev,
        general: {
          ...prev.general,
          accionante: registro.accionante?.nombre || (typeof registro.accionante === "string" ? registro.accionante : ""),
          radicado: registro.radicado || "",
          despacho: registro.despacho?.nombre || (typeof registro.despacho === "string" ? registro.despacho : ""),
          convocatoria: registro.convocatoria?.nombre || (typeof registro.convocatoria === "string" ? registro.convocatoria : ""),
          temaEspecifico: registro.temaEspecifico?.nombre || (typeof registro.temaEspecifico === "string" ? registro.temaEspecifico : ""),
          abogado: registro.abogado?.nombre || (typeof registro.abogado === "string" ? registro.abogado : ""),
          fechaIngreso: registro.termino?.fechaIngreso || "",
          fechaVencimiento: registro.termino?.fechaVencimiento || "",
          termino: registro.termino?.termino || "",
        },
        fallos: {
          ...prev.fallos,
          falloPrimera: {
            fechaEntrada: registro.falloPrimera?.fecha || "",
            fallo: registro.falloPrimera?.fallo || "",
            termino: registro.falloPrimera?.termino || "",
            fechaVencimiento: registro.falloPrimera?.fechaVencimiento || "",
          },
          falloSegunda: {
            fechaEntrada: registro.falloSegunda?.fecha || "",
            fallo: registro.falloSegunda?.fallo || "",
            termino: registro.falloSegunda?.termino || "",
            fechaVencimiento: registro.falloSegunda?.fechaVencimiento || "",
          },
        },
      }));
    }
  }, [registro]);

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