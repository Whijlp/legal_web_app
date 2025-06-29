import { useState } from "react";
import SelectField from "../../../../utils/SelectField";
import DateInput from "../../../../utils/DateInput";
import SelectTermino from "../../../../utils/SelecTermino";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";

function TabIncidentes() {
  const [requerimientos, setRequerimientos] = useState([
    { req: "", fecha: "", termino: "" }
  ]);

  const handleChange = (index, field, value) => {
    const nuevos = [...requerimientos];
    nuevos[index][field] = value;
    setRequerimientos(nuevos);
  };

  const agregarRequerimiento = () => {
    setRequerimientos([...requerimientos, { req: "", fecha: "", termino: "" }]);
  };

  const eliminarRequerimiento = (index) => {
  const nuevos = requerimientos.filter((_, i) => i !== index);
  setRequerimientos(nuevos);
};

  return (
    <div className="tabIncidentes" style={{ backgroundColor: "white" }}>
      {requerimientos.map((item, index) => {
        const vencimiento =
          item.fecha && item.termino
            ? sumarDiasHabiles(item.fecha, parseInt(item.termino))
            : "";

        return (
          <div className="requerimiento-item" key={index}>
            <SelectField
              label={`Requerimiento ${index + 1}`}
              value={item.req}
              onChange={(e) => handleChange(index, "req", e.target.value)}
              options={[
                "Previo a la CNSC",
                "A otra entidad",
                "Apertura de incidente a la CNSC",
                "Apertura de incidente a otra entidad",
                "Incidente sanciona a la CNSC",
                "Incidente sanciona a otra entidad",
              ]}
              className="select-mini"
            />
            <DateInput
              value={item.fecha}
              onChange={(e) => handleChange(index, "fecha", e.target.value)}
              className="input-mini"
            />
            <SelectTermino
              value={item.termino}
              onChange={(e) => handleChange(index, "termino", e.target.value)}
              className="select-mini"
            />
            <DateInput
              value={vencimiento}
              onChange={() => {}}
              className="input-mini"
            />

            <button
              type="button"
              onClick={() => eliminarRequerimiento(index)}
              className="btn-eliminar"
            >
              ✕
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={agregarRequerimiento}
        className="btn-agregar"
      >
        + Agregar Requerimiento
      </button>
    </div>
  );
}

export default TabIncidentes;
