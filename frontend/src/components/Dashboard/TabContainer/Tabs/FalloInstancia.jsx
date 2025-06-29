import { useState, useEffect } from "react";


const festivosColombia = new Set([
  "2025-01-01", "2025-01-06", "2025-03-24", "2025-04-17", "2025-04-18",
  "2025-05-01", "2025-06-02", "2025-06-23", "2025-06-30", "2025-07-20",
  "2025-08-07", "2025-08-18", "2025-10-13", "2025-11-03", "2025-11-17",
  "2025-12-08", "2025-12-25"
]);

// 📅 Función para sumar días hábiles excluyendo fines de semana y festivos
const sumarDiasHabiles = (fechaInicio, diasHabiles) => {
  const fecha = new Date(fechaInicio);
  const esHabil = (f) =>
    f.getDay() !== 0 &&
    f.getDay() !== 6 &&
    !festivosColombia.has(f.toISOString().split("T")[0]);

  const dias = Array.from({ length: diasHabiles * 2 + 20 }, (_, i) => {
    const f = new Date(fecha);
    f.setDate(f.getDate() + i + 1);
    return f;
  });

  const habiles = dias.filter(esHabil);
  return habiles[diasHabiles - 1]?.toISOString().split("T")[0] || "";
};

function FalloInstancia({ titulo }) {
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fallo, setFallo] = useState("");
  const [termino, setTermino] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const mostrarCamposConcedido = fallo === "concedido";

  useEffect(() => {
    if (fechaEntrada && termino && fallo === "concedido") {
      const vencimiento = sumarDiasHabiles(fechaEntrada, parseInt(termino));
      setFechaVencimiento(vencimiento);
    } else {
      setFechaVencimiento("");
    }
  }, [fechaEntrada, termino, fallo]);

  return (
    <div className="fallo-seccion">
      <label className="fallo-label">{titulo}</label>

      <div className="fallo-row">
        <label>📅 </label>
        <input
          type="date"
          className="fallo-input-date"
          value={fechaEntrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
        />
      </div>

      <div className="fallo-row">
        <label>📄 Fallo:</label>
        <select
          className="fallo-select"
          value={fallo}
          onChange={(e) => {
            setFallo(e.target.value);
            if (e.target.value !== "concedido") {
              setTermino("");
              setFechaVencimiento("");
            }
          }}
        >
          <option value="">Seleccione un fallo</option>
          <option value="concedido">Concede</option>
          <option value="negado">Niega</option>
        </select>
      </div>

      {mostrarCamposConcedido && (
        <div className="fallo-row">
          <label>⏱ Término:</label>
          <select
            className="fallo-select mini"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
          >
            <option value="">término</option>
            <option value="1">1 día</option>
            <option value="2">2 días</option>
            <option value="3">3 días</option>
          </select>

          <label>📆</label>
          <input
            type="date"
            className="fallo-input-date"
            value={fechaVencimiento}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default FalloInstancia;