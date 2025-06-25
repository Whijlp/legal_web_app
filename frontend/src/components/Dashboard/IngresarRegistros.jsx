function IngresarRegistros() {
  return (
    <div className="registros">
      <h1 className="registros_title">Ingresar y modificar Registros</h1>
      <form className="registros_form">
        <div className="registros_form-group">
        <input
        className="registros_form-item"
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Buscar accionanate"
        />
        <button className="registros_form-button"
        id="nombre_button">Buscar</button>
        </div>
        <div className="">
               <input className="registros_form-item"
          type="text"
          id="radicado"
          name="radicado"
          placeholder="Buescar por numero radicado"
        />
        <button className="registros_form-button"
        id="radicado_button">Buscar</button>
        </div>

         <button className="registros_form-button">Crear registros</button>
      </form>
    </div>
  );
}
export default IngresarRegistros;
