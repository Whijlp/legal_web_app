import { useState, useEffect } from "react";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";
import SelectField from "../../../../utils/SelectField";
import DateInput from "../../../../utils/DateInput";
import SelectTermino from "../../../../utils/SelecTermino";
import TabsButton from "../Tabs/TabsButton";

function FalloInstancia({ titulo, falloOptions, registroGuardado, onGuardar }) {
  const esActualizar =
    registroGuardado && Object.keys(registroGuardado).length > 0;

  const [fechaEntrada, setFechaEntrada] = useState(
    registroGuardado?.fechaEntrada || ""
  );
  const [fallo, setFallo] = useState(registroGuardado?.fallo || "");
  const [termino, setTermino] = useState(registroGuardado?.termino || "");
  const [fechaVencimiento, setFechaVencimiento] = useState(
    registroGuardado?.fechaVencimiento || ""
  );

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
    } else if (!esConcede) {
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
    if (onGuardar) {
      onGuardar(datos);
    }
  };

  const handleFalloChange = (e) => {
    if (!e || !e.target) {
      console.error("Evento inválido en FalloInstancia:", e);
      return;
    }
    const val = e.target.value;
    setFallo(val);
    if (val !== "Concede") {
      setTermino("");
      setFechaVencimiento("");
    }
  };

  const handleTerminoChange = (e) => {
    if (!e || !e.target) {
      console.error("Evento inválido en FalloInstancia:", e);
      return;
    }
    setTermino(e.target.value);
  };

  return (
    <div className="fallo-seccion">
      <label className="fallo-label">{titulo}</label>
      <div className="fallos_container">
        <DateInput
          label="Fecha de entrada"
          value={fechaEntrada}
          onChange={setFechaEntrada}
          className="fallo-input-date"
        />
        <SelectField
          label="Fallo:"
          value={fallo}
          onChange={handleFalloChange}
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
            label="Término"
            value={termino}
            onChange={handleTerminoChange}
            className="select-mini"
          />
          <DateInput
            label="Fecha de vencimiento"
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