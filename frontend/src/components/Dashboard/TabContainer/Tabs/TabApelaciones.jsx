import { useState } from "react";
import SelectField from "../../../../utils/SelectField";
import DateInput from "../../../../utils/DateInput";

function TabApelaciones() {
  const [impugnacion, setImpugnacion] = useState("");
  const [fechaImpugnacion, setFechaImpugnacion] = useState("");

  return (
    <div className="tab_apelacion">
      <SelectField
        value={impugnacion}
        onChange={(e) => setImpugnacion(e.target.value)}
        options={[
          "Concede impugnación a la CNSC",
          "Concede impugnación a otra entidad",
          "Concede impugnación al accionante",
          "Niega impugnación a la CNSC",
          "Niega impugnación a otra entidad",
          "Niega impugnación al accionante"
        ]}
        className="tabs_inputs"
      />

      <DateInput
        value={fechaImpugnacion}
        onChange={(e) => setFechaImpugnacion(e.target.value)}
        className="input-mini"
      />

      <SelectField
        value={impugnacion}
        onChange={(e) => setImpugnacion(e.target.value)}
        options={[
          "Concede impugnación a la CNSC",
          "Concede impugnación a otra entidad",
          "Concede impugnación al accionante",
          "Niega impugnación a la CNSC",
          "Niega impugnación a otra entidad",
          "Niega impugnación al accionante"
        ]}
        className="tabs_inputs"
      />

      <DateInput
        value={fechaImpugnacion}
        onChange={(e) => setFechaImpugnacion(e.target.value)}
        className="input-mini"
      />
    </div>
  );
}

export default TabApelaciones;
