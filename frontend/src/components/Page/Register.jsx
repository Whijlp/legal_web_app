import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoToolTip from "../popup/InfoToolTip"; // Ajusta ruta según tu proyecto
import Popup from "../popup/Popup";
import { useAuth } from "../../contexts/AuthContext"; // Ajusta ruta según tu proyecto

function Register() {
  const [data, setData] = useState({});
  const { setUser } = useAuth();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const mostrarTooltip = (mensaje, exito, redirigir = false) => {
    setTooltipMessage(mensaje);
    setIsSuccess(exito);
    setTooltipVisible(true);

    setTimeout(
      () => {
        setTooltipVisible(false);
        if (redirigir) navigate("/dashboard");
      },
      exito ? 2000 : 3000
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = data;

    if (!name || !email || !password) {
      mostrarTooltip("Completa todos los campos para registrarte.", false);
      return;
    }
    setUser({ name });
    localStorage.setItem("user", JSON.stringify({ name, email }));
    mostrarTooltip("Usuario registrado correctamente.", true, true);
  };

  return (
    <>
      <h1>Registro de usuario</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login_input-name"
          type="text"
          id="name"
          name="name"
          placeholder="Nombre de usuario"
          onChange={handleChange}
        />
        <input
          className="login_input-name"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="login_input-password"
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit" className="login_button">
          Registrar
        </button>
      </form>

      <p className="login_text">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="register-login-link">
          Inicia sesión
        </Link>
      </p>

      {tooltipVisible && (
        <Popup
          message={
            <InfoToolTip isSuccess={isSuccess} message={tooltipMessage} />
          }
          onClose={() => setTooltipVisible(false)}
        />
      )}
    </>
  );
}

export default Register;
