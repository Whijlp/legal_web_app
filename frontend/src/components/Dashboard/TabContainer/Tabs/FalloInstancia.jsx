import { useState, useEffect } from "react";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";
import SelectField from "../../../../utils/SelectField";
import DateInput from "../../../../utils/DateInput";
import SelectTermino from "../../../../utils/SelecTermino";

function FalloInstancia({ titulo, falloOptions }) {
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fallo, setFallo] = useState("");
  const [termino, setTermino] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const esConcede = fallo === "Concede";

  useEffect(() => {
    if (fechaEntrada && termino && esConcede) {
      const vencimiento = sumarDiasHabiles(fechaEntrada, parseInt(termino));
      setFechaVencimiento(vencimiento);
    } else {
      setFechaVencimiento("");
    }
  }, [fechaEntrada, termino, fallo]);

  return (
    <div className="fallo-seccion">
      <label className="fallo-label">{titulo}</label>

      {/* Fecha de entrada */}
      <div className="fallo-row">
        <label>📅 Fecha:</label>
        <DateInput
          value={fechaEntrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
          className="fallo-input-date"
        />
      </div>


      <div className="fallo-row">
        <SelectField
          label="📄 Fallo:"
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
      </div>
      {esConcede && (
        <div className="fallo-row">
          <label>⏱ Término:</label>
          <SelectTermino
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            className="select-mini"
          />

          <label>📆 Vencimiento:</label>
          <DateInput
            value={fechaVencimiento}
            onChange={() => {}}
            readOnly
            className="fallo-input-date"
          />
        </div>
      )}
    </div>
  );
}

export default FalloInstancia;
