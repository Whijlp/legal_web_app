import { useState } from "react";
import TabContainer from "./TabContainer/TabContainer";


function IngresarRegistros() {
  const [showTab, setShowTab] = useState(false);

  const handleShowTab = (e) => {
    e.preventDefault();
    setShowTab(prev => !prev);}

  return (
    <div className="registros">
      
      
     {!showTab ? (
      <>
        <h1 className="registros_title">Ingresar y modificar Registros</h1>
        <form className="registros_form">
          <div className="registros_form-group">
            <input
              className="registros_form-item"
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Buscar accionante"
            />
            <button className="registros_form-button" type="button" id="nombre_button">Buscar</button>
          </div>
          <div>
            <input
              className="registros_form-item"
              type="text"
              id="radicado"
              name="radicado"
              placeholder="Buscar por número radicado"
            />
            <button className="registros_form-button" type="button" id="radicado_button">Buscar</button>
          </div>

          <button
            type="button"
            className="registros_form-button crear_registro"
            onClick={handleShowTab}
          >
            Crear registros
          </button>
        </form>
      </>
    ) : (
      <>
      <TabContainer />
        <button
          type="button"
          className="registros_form-button cerrar_registro"
          onClick={handleShowTab}
        >
          Cerrar
        </button>
        
      </>
    )}
    </div>
  );
}""
export default IngresarRegistros;
