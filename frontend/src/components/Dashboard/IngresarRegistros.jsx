function IngresarRegistros() {
  return (
    <div className="registros">
      <h1 className="registros_title">Ingresar y modificar Registros</h1>
      <form className="registros_form">
        <div className="registros_form-group">
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Buscar accionanate"
        />
        <button className=""
        id="nombre_button">Buscar</button>
        </div>
        <div className="">
               <input
          type="text"
          id="radicado"
          name="radicado"
          placeholder="Buescar por numero radicado"
        />
        <button className=""
        id="radicado_button">Buscar</button>
        </div>

      </form>
    </div>
  );
}
export default IngresarRegistros;
