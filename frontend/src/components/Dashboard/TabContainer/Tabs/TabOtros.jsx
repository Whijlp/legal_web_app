
import { useState } from "react";
import DateInput from "../../../../utils/DateInput";

function TabOtros() {

  const [reqs, setReqs] = useState([{ desc: "", fecha: "" }]);


  const handleChange = (idx, field, value) => {
    const nuevos = [...reqs];
    nuevos[idx][field] = value;
    setReqs(nuevos);
  };

  const addReq = () =>
    setReqs([...reqs, { desc: "", fecha: "" }]);

  const removeReq = (idx) =>
    setReqs(reqs.filter((_, i) => i !== idx));

  return (
    <div className="tabOtros">
      {reqs.map((item, idx) => (
        <div className="otros-item" key={idx}>
         
          <input
            type="text"
            placeholder={`Notificacion ${idx + 1}`}
            className="tabs_inputs"
            value={item.desc}
            onChange={(e) => handleChange(idx, "desc", e.target.value)}
          />

    
          <DateInput
            value={item.fecha}
            onChange={(e) => handleChange(idx, "fecha", e.target.value)}
            className="tabs_date-input"
          />

       
          <button
            type="button"
            onClick={() => removeReq(idx)}
            className="btnotros"
          >
            Eliminar notificacion 
          </button>
        </div>
      ))}
    
      <button type="button" onClick={addReq} className="btnotros">
        + Agregar notificacion
      </button>
    </div>
  );
}

export default TabOtros;
