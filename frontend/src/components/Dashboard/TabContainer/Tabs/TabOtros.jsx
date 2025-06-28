import construccion from "../../../../images/construccion.png";

function TabOtros() {
  return (
    <div className="tabContainer_tab-otros">
      <h1>
        Otros
        <img src={construccion} className="app_construccion" alt="" />
      </h1>
      <p>
        Esta sección está en construcción. Por favor, regresa más tarde para ver
        las actualizaciones.
      </p>
    </div>
  );
}
export default TabOtros;