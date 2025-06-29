import { useState } from "react";
import SelectField from "../../../../utils/SelectField";
import DateInput from "../../../../utils/DateInput";

function TabApelaciones() {
  const [impugnacion, setImpugnacion] = useState("");
  const [fechaImpugnacion, setFechaImpugnacion] = useState("");

  return (
    <div className="tabContainer_tabs-content">
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
        className="select-mini"
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
