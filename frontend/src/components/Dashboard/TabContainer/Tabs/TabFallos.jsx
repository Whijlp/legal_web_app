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
        registroGuardado={datosTabs.fallos?.fallo_1_instancia || {}}
        onGuardar={(datos) => handleGuardarTab("fallos", { ...datosTabs.fallos, fallo_1_instancia: datos })}
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
        registroGuardado={datosTabs.fallos?.fallo_2_instancia || {}}
        onGuardar={(datos) => handleGuardarTab("fallos", { ...datosTabs.fallos, fallo_2_instancia: datos })}
      />
    </div>
  );
}

export default TabFallos;