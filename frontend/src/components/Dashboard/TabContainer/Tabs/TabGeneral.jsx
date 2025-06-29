function TabGeneral() {
  return (
    <div className="tabs">
      <form className="tabs_form">
       <div className="tabs_date">
        <input type="date" placeholder="Fecha de ingreso" />
        <input type="text" placeholder="Termino " />
        <input type="text" placeholder="Fecha de respuesta" />
        </div>
        <div className="tabs_form-tuela" id="tabs_form-tuela">
          <input type="text" placeholder="Nombre de accionnte" className="tabs_inputs" />
          <input type="text" placeholder="Numero de Radicado" className="tabs_inputs" />
          <input type="text" placeholder="Despacho " className="tabs_inputs"/>
          <input type="text" placeholder="Convocatoria" className="tabs_inputs"/>
          <input type="text" placeholder="Tema especifico" className="tabs_inputs"/>
          <input type="text" placeholder="Abogado" className="tabs_inputs"/>
        </div>
      </form>
    </div>
  );
}

export default TabGeneral;
