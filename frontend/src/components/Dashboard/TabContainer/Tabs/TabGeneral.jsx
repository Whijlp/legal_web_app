import { useState, useEffect } from "react";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";
import SelectTermino from "../../../../utils/SelecTermino";
import DateInput from "../../../../utils/DateInput";
import TextInput from "../../../../utils/TextInput";

function TabGeneral() {
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [termino, setTermino] = useState("");
  const [fechaRespuesta, setFechaRespuesta] = useState("");

  const [formData, setFormData] = useState({
    accionante: "",
    radicado: "",
    despacho: "",
    convocatoria: "",
    tema: "",
    abogado: "",
  });

  useEffect(() => {
    if (fechaIngreso && termino) {
      const vencimiento = sumarDiasHabiles(fechaIngreso, parseInt(termino));
      setFechaRespuesta(vencimiento);
    } else {
      setFechaRespuesta("");
    }
  }, [fechaIngreso, termino]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="tabs">
      <form className="tabs_form">
        <div className="tabs_date">
          <DateInput
            value={fechaIngreso}
            onChange={(e) => setFechaIngreso(e.target.value)}
            placeholder="Fecha de ingreso"
          />

          <SelectTermino
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
           
          />

          <DateInput
            value={fechaRespuesta}
            readOnly
            placeholder="Fecha de respuesta"
          />
        </div>

        <div className="tabs_form-tuela" id="tabs_form-tuela">
          <TextInput
            name="accionante"
            value={formData.accionante}
            onChange={handleInputChange}
            placeholder="Accionante"
            className="tabs_inputs"
          />
          <TextInput
            name="radicado"
            value={formData.radicado}
            onChange={handleInputChange}
            placeholder="Radicado"
            className="tabs_inputs"
          />
          <TextInput
            name="despacho"
            value={formData.despacho}
            onChange={handleInputChange}
            placeholder="Despacho"
            className="tabs_inputs"
          />
              <TextInput
            name="tema"
            value={formData.tema}
            onChange={handleInputChange}
            placeholder="Tema específico"
            className="tabs_inputs"
          />
          <TextInput
            name="convocatoria"
            value={formData.convocatoria}
            onChange={handleInputChange}
            placeholder="Convocatoria"
            className="tabs_inputs"
          />
      
          <TextInput
            name="abogado"
            value={formData.abogado}
            onChange={handleInputChange}
            placeholder="Abogado"
            className="tabs_inputs"
          />
        </div>
      </form>
    </div>
  );
}

export default TabGeneral;
