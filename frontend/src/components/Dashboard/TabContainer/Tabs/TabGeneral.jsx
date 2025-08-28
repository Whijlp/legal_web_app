import { useState, useEffect } from "react";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";
import { useTutela } from "../../../../utils/useTutela";
import TabsButton from "../Tabs/TabsButton";
import SelectTermino from "../../../../utils/SelecTermino";
import DateInput from "../../../../utils/DateInput";
import TextInput from "../../../../utils/TextInput";
import InfoToolTip from "../../../popup/InfoToolTip"; 

function TabGeneral({ tutelaId }) {
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [termino, setTermino] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const { guardarTutela, loading, mensaje, isSuccess } = useTutela();

  const [formData, setFormData] = useState({
    accionante: "",
    radicado: "",
    despacho: "",
    convocatoria: "",
    temaEspecifico: "",
    abogado: "",
    termino: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (fechaIngreso && termino) {
      const vencimiento = sumarDiasHabiles(fechaIngreso, parseInt(termino));
      setFechaVencimiento(vencimiento);
    } else {
      setFechaVencimiento("");
    }
  }, [fechaIngreso, termino]);


{  /*useEffect(() => {
  if (fechaIngreso && termino) {
    const vencimiento = sumarDiasHabiles(fechaIngreso, parseInt(termino));

    const fechaISO = vencimiento
    setFechaRespuesta(fechaISO);
  } else {
    setFechaRespuesta("");
  }
}, [fechaIngreso, termino]);
*/}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fechaIngreso || !termino || !fechaVencimiento) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.accionante || !formData.radicado || !formData.despacho || !formData.convocatoria || !formData.temaEspecifico || !formData.abogado) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    const dataToSend = {
      ...formData,
      fechaIngreso,
      termino,
      fechaVencimiento, 
      fallo_1_instancia: null,
      fallo_2_instancia: null,
      incidentesDesacato: null,
    };

    console.log("📌 Enviando formulario:", dataToSend);
    console.log("Estados antes de enviar:", { fechaIngreso, termino, fechaVencimiento, formData });

    await guardarTutela(dataToSend, tutelaId);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };
  return (
    <div className="tabs">
      <form className="tabs_form" onSubmit={handleSubmit}>
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
            value={fechaVencimiento}
            readOnly
            placeholder="Fecha de vencimiento"
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
            name="temaEspecifico"
            value={formData.temaEspecifico}
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

        <TabsButton />
      </form>

      {/* Popup condicional */}
      {showPopup && (
        <InfoToolTip
          isSuccess={isSuccess}
          errorMessage={mensaje || (isSuccess ? "Guardado con éxito" : "Ocurrió un error")}
        />
      )}
    </div>
  );
}

export default TabGeneral;
