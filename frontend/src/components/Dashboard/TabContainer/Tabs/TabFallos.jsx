import { useContext } from "react";
import { TabsContext } from "../../../../utils/TabsContext";
import FalloInstancia from "./FalloInstancia";

function TabFallos() {
  const { datosTabs, handleGuardarTab } = useContext(TabsContext);


  return (
    <div>
      <FalloInstancia
        titulo="Fallo de 1° instancia"
        falloOptions={[
          "Concede",
          "Niega",
          "Concede no Ordena",
          "Declara improcedente",
          "Desistimiento de la acción",
        ]}
        registroGuardado={datosTabs.fallos?.falloPrimera || {}}
        onGuardar={(datos) => handleGuardarTab("fallos", { ...datosTabs.fallos, falloPrimera: datos })}
      />
      <FalloInstancia
        titulo="Fallo de 2° instancia"
        falloOptions={[
          "Concede",
          "Niega",
          "Concede no Ordena",
          "Declara improcedente",
          "Desistimiento de la acción",
        ]}
        registroGuardado={datosTabs.fallos?.falloSegunda || {}}
        onGuardar={(datos) => handleGuardarTab("fallos", { ...datosTabs.fallos, falloSegunda: datos })}
      />
    </div>
  );
}

export default TabFallos;