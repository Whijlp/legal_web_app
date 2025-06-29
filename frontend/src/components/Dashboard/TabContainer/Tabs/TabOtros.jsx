
import { useState } from "react";
import DateInput from "../../../../utils/DateInput";

function TabOtros() {
  // Cada requerimiento: { desc: "", fecha: "" }
  const [reqs, setReqs] = useState([{ desc: "", fecha: "" }]);

  // Cambios en los campos
  const handleChange = (idx, field, value) => {
    const nuevos = [...reqs];
    nuevos[idx][field] = value;
    setReqs(nuevos);
  };

  // Agregar nuevo requerimiento
  const addReq = () =>
    setReqs([...reqs, { desc: "", fecha: "" }]);

  // Eliminar uno existente
  const removeReq = (idx) =>
    setReqs(reqs.filter((_, i) => i !== idx));

  return (
    <div className="tabOtros">
      {reqs.map((item, idx) => (
        <div className="otros-item" key={idx}>
          {/* Descripción libre */}
          <input
            type="text"
            placeholder={`Requerimiento ${idx + 1}`}
            className="input-desc"
            value={item.desc}
            onChange={(e) => handleChange(idx, "desc", e.target.value)}
          />

          {/* Fecha asociada */}
          <DateInput
            value={item.fecha}
            onChange={(e) => handleChange(idx, "fecha", e.target.value)}
            className="input-mini"
          />

          {/* Botón eliminar */}
          <button
            type="button"
            onClick={() => removeReq(idx)}
            className="btn-eliminar"
          >
            ✕
          </button>
        </div>
      ))}

      {/* Botón agregar */}
      <button type="button" onClick={addReq} className="btn-agregar">
        + Agregar Requerimiento
      </button>
    </div>
  );
}

export default TabOtros;
