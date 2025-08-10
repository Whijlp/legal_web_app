import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoToolTip from "../popup/InfoToolTip";
import Popup from "../popup/Popup";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const [data, setData] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const mostrarTooltip = (mensaje, exito, redirigir = false) => {
    setTooltipMessage(mensaje);
    setIsSuccess(exito);
    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
      if (redirigir) navigate("/inicio");
    }, exito ? 2000 : 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, password } = data;
    if (!nombre || !email || !password) {
      mostrarTooltip("Completa todos los campos para registrarte.", false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo: email, password }),
      });

     if (!res.ok) {
  const errorData = await res.json();
  throw new Error(errorData.message || "Error en el registro");
};

      const result = await res.json();
      login({ nombre, token: result.token });

      mostrarTooltip("Usuario registrado correctamente.", true, true);
    } catch (err) {
      mostrarTooltip(err.message, false);
    }
  };

  return (
    <>
      <h1>Registro de usuario</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input className="login_input-name" type="text" name="nombre" placeholder="Nombre de usuario" onChange={handleChange} />
        <input className="login_input-name" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input  className="login_input-name" type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
        <button className="login_button" type="submit">Registrar</button>
      </form>
      <p className="login_text">
        ¿Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>
      </p>

      {tooltipVisible && (
        <Popup
          message={<InfoToolTip isSuccess={isSuccess} message={tooltipMessage} />}
          onClose={() => setTooltipVisible(false)}
        />
      )}
    </>
  );
}

export default Register;
