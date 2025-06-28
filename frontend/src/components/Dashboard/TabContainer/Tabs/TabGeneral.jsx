function TabGeneral() {
  return (
    <div className="Tabs">
      <form className="tabs_form">
        <button className="tabs_button">Fecha de admision</button>
        <input type="text" placeholder="Termino " />
        <input type="date" placeholder="Fecha de respuesta" />
        <div className="tabs_form-tuela">
          <input type="text" placeholder="Nombre de accionnte" />
          <input type="text" placeholder="Numero de Radicado" />
          <input type="text" placeholder="Despacho " />
          <input type="text" placeholder="Convocatoria" />
          <input type="text" placeholder="Tema especifico" />
          <input type="text" placeholder="Abogado" />
        </div>
      </form>
    </div>
  );
}

export default TabGeneral;
