import image from "../images/image7.png";

function Landingnew() {
  return (
    <div className="landing-new">
      <img src={image} alt="imagen de noticia" />

      <div className="landing-new-container">
        <p className="landing-new-subtitle "> Comunicado oficial de la Comisión Nacional del Servicio Civil</p>
        <p className="landing-new-text">
          {" "}
          La Comisión Nacional del Servicio Civil expresa su profundo rechazo
          ante el atentado perpetrado contra el senador Miguel Uribe Turbay.
          Martes 10 de Junio de 2025
        </p>
      </div>
    </div>
  );
}

export default Landingnew;
