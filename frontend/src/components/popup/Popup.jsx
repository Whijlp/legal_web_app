import { useEffect, useRef } from "react";
import x from "../../images/cerra_ventana.png";

const Popup = (props) => {
  const { title, message, onClose, children } = props;

  const popupRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="popup" id="popupProfile">
      <div className="popup__overlay"></div>
      <div className="forms">
        <h3 className="forms__title"> {title} </h3>
        {message} 
        {children}

        <button
          className="forms__close-button close__button forms-profile-button"
          title="cerrar"
          type="button"
          onClick={onClose}
        >
          <img className="forms__image-button" src={x} alt="imagen de una X" />
        </button>
      </div>
    </div>
  );
};

export default Popup;
