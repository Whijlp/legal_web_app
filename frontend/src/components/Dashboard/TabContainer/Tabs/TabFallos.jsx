import FalloInstancia from "./FalloInstancia";
import {useTabs} from "../../../../utils/TabsContext";

function TabFallos() {
  const { datosTabs, handleGuardarTab } = useTabs();

  return (
    <div>
      <FalloInstancia
        titulo="Fallo de 1° instancia"
        falloOptions={[
          "Concede",
          "Niega",
          "Concede no Ordena",
          "Declara improcedente",
          "Desistimiento de la accion ",
        ]}
        registroGuardado={datosTabs.falloInstancia}
        onGuardar={(datos) => handleGuardarTab("falloInstancia", datos)}
      />
      <FalloInstancia
        titulo="Fallo de 2° instancia"
        falloOptions={[
          "Concede",
          "Niega",
          "Concede no Ordena",
          "Declara improcedente",
          "Desistimiento de la accion ",
        ]}
        registroGuardado={datosTabs.falloInstancia}
        onGuardar={(datos) => handleGuardarTab("falloInstancia", datos)}
      />
    </div>
  );
}

export default TabFallos;
