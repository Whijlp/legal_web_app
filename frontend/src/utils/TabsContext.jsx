import { createContext, useState } from "react";

export const TabsContext = createContext();

export function TabsProvider({ children }) {
  const [datosTabs, setDatosTabs] = useState({
    general: {
      accionante: "",
      radicado: "",
      despacho: "",
      convocatoria: "",
      temaEspecifico: "",
      abogado: "",
      fechaIngreso: "",
      fechaVencimiento: "",
      termino: "",
    },
    fallos: {},
    apelacion: {},
    incidentes: {},
    otros: {},
  });

  const handleGuardarTab = (tabName, data) => {
    setDatosTabs((prev) => {
      const nuevosDatos = {
        ...prev,
        [tabName]: { ...prev[tabName], ...data },
      };
      return nuevosDatos;
    });
  };

  return (
    <TabsContext.Provider value={{ datosTabs, handleGuardarTab }}>
      {children}
    </TabsContext.Provider>
  );
}