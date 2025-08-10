import React from "react";
import PropTypes from "prop-types";

function BotonGuardar({ onClick, texto = "Guardar", disabled = false }) {
  return (
    <button
      type="button"
      className="registros_form-button"
      onClick={onClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}

BotonGuardar.propTypes = {
  onClick: PropTypes.func.isRequired,
  texto: PropTypes.string,
  disabled: PropTypes.bool,
};

export default BotonGuardar;