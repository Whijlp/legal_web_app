import { useState, useEffect, useContext } from "react";
import { sumarDiasHabiles } from "../../../../utils/fechaUtils";
import { useTutela } from "../../../../utils/useTutela";
import { TabsContext } from "../../../../utils/TabsContext";
import TabsButton from "../Tabs/TabsButton";
import SelectTermino from "../../../../utils/SelecTermino";
import DateInput from "../../../../utils/DateInput";
import TextInput from "../../../../utils/TextInput";
import InfoToolTip from "../../../popup/InfoToolTip";

function TabGeneral({ tutelaId }) {
  const { datosTabs, handleGuardarTab } = useContext(TabsContext);
  const { guardarTutela, loading, mensaje, isSuccess } = useTutela();

  // Inicializar estados con datos de TabsContext
  const [fechaIngreso, setFechaIngreso] = useState(datosTabs?.general?.fechaIngreso || "");
  const [termino, setTermino] = useState(datosTabs?.general?.termino || "");
  const [fechaVencimiento, setFechaVencimiento] = useState(datosTabs?.general?.fechaVencimiento || "");
  const [formData, setFormData] = useState({
    general: {
      accionante: datosTabs?.general?.accionante || "",
      radicado: datosTabs?.general?.radicado || "",
      despacho: datosTabs?.general?.despacho || "",
      convocatoria: datosTabs?.general?.convocatoria || "",
      temaEspecifico: datosTabs?.general?.temaEspecifico || "",
      abogado: datosTabs?.general?.abogado || "",
      fechaIngreso: datosTabs?.general?.fechaIngreso || "",
      fechaVencimiento: datosTabs?.general?.fechaVencimiento || "",
      termino: datosTabs?.general?.termino || "",
    },
    fallos: datosTabs?.fallos || {},
    apelacion: datosTabs?.apelacion || {},
    incidentes: datosTabs?.incidentes || {},
    otros: datosTabs?.otros || {},
  });

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sincronizar formData y TabsContext con estados locales
  useEffect(() => {
    const nuevosDatos = {
      ...formData,
      general: {
        ...formData.general,
        fechaIngreso,
        termino: String(termino),
        fechaVencimiento,
      },
    };
    setFormData(nuevosDatos);
    handleGuardarTab("general", nuevosDatos.general);
  }, [fechaIngreso, termino, fechaVencimiento]);

  // Actualizar formData cuando cambien otros campos
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        ...datosTabs?.general, // Mantener sincronización con datosTabs
      },
    }));
  }, [datosTabs]);

  // Calcular fechaVencimiento cuando cambian fechaIngreso o termino
  useEffect(() => {
    if (fechaIngreso && termino) {
      try {
        const vencimiento = sumarDiasHabiles(fechaIngreso, parseInt(termino));
        setFechaVencimiento(vencimiento);
      } catch (error) {
        console.error("Error en sumarDiasHabiles:", error);
        setErrorMessage("Error al calcular la fecha de vencimiento");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } else {
      setFechaVencimiento("");
    }
  }, [fechaIngreso, termino]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = {
      ...formData,
      general: { ...formData.general, [name]: value },
    };
    setFormData(nuevosDatos);
    handleGuardarTab("general", nuevosDatos.general);
    
  };

  const handleDateChange = (value) => {
    
    setFechaIngreso(value);
  };

  const handleTerminoChange = (value) => {

    setTermino(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    if (!fechaIngreso) {
      setErrorMessage("La fecha de ingreso es obligatoria");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!termino) {
      setErrorMessage("El término es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!fechaVencimiento) {
      setErrorMessage("La fecha de vencimiento es obligatoria");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.general.accionante) {
      setErrorMessage("El campo accionante es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.general.radicado) {
      setErrorMessage("El campo radicado es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.general.despacho) {
      setErrorMessage("El campo despacho es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.general.convocatoria) {
      setErrorMessage("El campo convocatoria es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.general.temaEspecifico) {
      setErrorMessage("El campo tema específico es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    if (!formData.general.abogado) {
      setErrorMessage("El campo abogado es obligatorio");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    const dataToSend = {
      ...formData.general, 
      fechaIngreso, 
      termino, 
      fechaVencimiento, 
      fallo_1_instancia: formData.fallos?.fallo_1_instancia || null, 
      fallo_2_instancia: formData.fallos?.fallo_2_instancia || null, 
      apelacion: formData.apelacion || null, 
      incidentesDesacato: formData.incidentes || null, 
      otros: formData.otros || null, 
    }


    try {
      await guardarTutela(dataToSend, tutelaId);
      setErrorMessage("Tutela guardada con éxito");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setErrorMessage(error.message || "Error al guardar la tutela");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="tabs">
      <form className="tabs_form" onSubmit={handleSubmit}>
        <div className="tabs_date">
          <DateInput
            value={fechaIngreso}
            onChange={handleDateChange}
            placeholder="Fecha de ingreso"
            label="Fecha de ingreso"
            required
          />
          <SelectTermino
            value={termino}
            onChange={handleTerminoChange}
            required
          />
          <DateInput
            value={fechaVencimiento}
            readOnly
            placeholder="Fecha de vencimiento"
            label="Fecha de vencimiento"
          />
        </div>

        <div className="tabs_form-tuela" id="tabs_form-tuela">
          <TextInput
            name="accionante"
            value={formData.general.accionante || ""}
            onChange={handleInputChange}
            placeholder="Accionante"
            className="tabs_inputs"
            required
          />
          <TextInput
            name="radicado"
            value={formData.general.radicado || ""}
            onChange={handleInputChange}
            placeholder="Radicado"
            className="tabs_inputs"
            required
          />
          <TextInput
            name="despacho"
            value={formData.general.despacho || ""}
            onChange={handleInputChange}
            placeholder="Despacho"
            className="tabs_inputs"
            required
          />
          <TextInput
            name="temaEspecifico"
            value={formData.general.temaEspecifico || ""}
            onChange={handleInputChange}
            placeholder="Tema específico"
            className="tabs_inputs"
            required
          />
          <TextInput
            name="convocatoria"
            value={formData.general.convocatoria || ""}
            onChange={handleInputChange}
            placeholder="Convocatoria"
            className="tabs_inputs"
            required
          />
          <TextInput
            name="abogado"
            value={formData.general.abogado || ""}
            onChange={handleInputChange}
            placeholder="Abogado"
            className="tabs_inputs"
            required
          />
        </div>

        <TabsButton />
      </form>

      {showPopup && (
        <InfoToolTip
          isSuccess={isSuccess}
          errorMessage={errorMessage || mensaje || "Ocurrió un error"}
        />
      )}
    </div>
  );
}

export default TabGeneral;