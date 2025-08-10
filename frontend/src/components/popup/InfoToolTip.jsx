import succesCheck from "../../images/checksucces.svg";
import errorCheck from "../../images/errorlogin.svg";

const InfoToolTip = ({ isSuccess, errorMessage }) => {
  return (
    <div className="popup__info">
      <img
        className="popup__info-image"
        src={isSuccess ? succesCheck : errorCheck}
        alt={isSuccess ? "Éxito" : "Error"}
      />
      <p>{errorMessage}</p>
    </div>
  );
};

export default InfoToolTip;
