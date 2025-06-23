import succesCheck from "../../images/checksucces.svg";
import errorCheck from "../../images/errorlogin.svg";

const InfoToolTip = (props) => {
  const {
    isSuccess,
    errorMessage = "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
  } = props;

  return (
    <div className="popup__info">
      <img
        className="popup__info-image"
        src={isSuccess ? errorCheck : succesCheck}
      />
      <p>{isSuccess ? "¡Correcto! Ya estás registrado." : errorMessage}</p>
    </div>
  );
};

export default InfoToolTip;
