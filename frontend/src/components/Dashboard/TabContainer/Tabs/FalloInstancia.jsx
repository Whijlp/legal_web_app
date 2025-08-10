import { useState, useEffect } from "react";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";
import SelectField from "../../../../utils/SelectField";
import DateInput from "../../../../utils/DateInput";
import SelectTermino from "../../../../utils/SelecTermino";
import TabsButton from "../Tabs/TabsButton";
function FalloInstancia({ titulo, falloOptions, registroGuardado, onGuardar }) {
  const esActualizar =
    registroGuardado && Object.keys(registroGuardado).length > 0;

  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fallo, setFallo] = useState("");
  const [termino, setTermino] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const esConcede = fallo === "Concede";

    useEffect(() => {
    if (esActualizar) {
      setFechaEntrada(registroGuardado.fechaEntrada || "");
      setFallo(registroGuardado.fallo || "");
      setTermino(registroGuardado.termino || "");
      setFechaVencimiento(registroGuardado.fechaVencimiento || "");
    }
  }, [registroGuardado]);

  useEffect(() => {
    if (fechaEntrada && termino && esConcede) {
      const vencimiento = sumarDiasHabiles(fechaEntrada, parseInt(termino));
      setFechaVencimiento(vencimiento);
    } else {
      setFechaVencimiento("");
    }
  }, [fechaEntrada, termino, fallo]);

  const handleGuardar = () => {
    const datos = {
      fechaEntrada,
      fallo,
      termino: esConcede ? termino : "",
      fechaVencimiento: esConcede ? fechaVencimiento : "",
    };

    onGuardar(datos);
  };

  return (
    <div className="fallo-seccion">
      <label className="fallo-label">{titulo}</label>
      <div className="fallos_container">
        <DateInput
          value={fechaEntrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
          className="fallo-input-date"
        />

        <SelectField
          label="Fallo:"
          value={fallo}
          onChange={(e) => {
            const val = e.target.value;
            setFallo(val);
            if (val !== "Concede") {
              setTermino("");
              setFechaVencimiento("");
            }
          }}
          options={falloOptions}
          className="fallo-select"
        />
        <TabsButton
          onClick={handleGuardar}
          texto={esActualizar ? "Actualizar" : "Guardar"}
        />
      </div>

      {esConcede && (
        <div className="fallos_container">
          <SelectTermino
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            className="select-mini"
          />
          <DateInput
            value={fechaVencimiento}
            onChange={() => {}}
            readOnly
            className="tabs_date-input"
          />

          <TabsButton
            onClick={handleGuardar}
            texto={esActualizar ? "Actualizar" : "Guardar"}
          />
        </div>
      )}
    </div>
  );
}

export default FalloInstancia;
