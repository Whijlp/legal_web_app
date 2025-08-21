import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import InfoToolTip from "../popup/InfoToolTip";
import Popup from "../popup/Popup";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const mostrarTooltip = (mensaje, exito, redirigir = false) => {
    setErrorMessage(mensaje);
    setIsSuccess(exito);
    setTooltipVisible(true);

    setTimeout(
      () => {
        setTooltipVisible(false);
        if (redirigir) navigate("/inicio");
      },
      exito ? 2000 : 3000
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!nombre || !password) {
      mostrarTooltip("Por favor completa todos los campos.", false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error desconocido");
      }

      const data = await res.json();
      if (res.ok) {
        login({ ...data.user, token: data.token });
      }

      mostrarTooltip(`¡Bienvenido, ${nombre}!`, true, true);
    } catch (error) {
      mostrarTooltip("Credenciales incorrectas", false);
    }
  };

  return (
    <>
      <h1 className="login_title">Datos de usuario</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          name="nombre"
          className="login_input-name"
          type="text"
          placeholder="nombre de usuario"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          name="password"
          className="login_input-name"
          type="password"
          placeholder="contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login_button" type="submit">
          Login
        </button>
        <p className="login_text">
          ¿No tienes cuenta? <Link to="/auth/register">Regístrate</Link>
        </p>
      </form>

      {tooltipVisible && (
        <Popup
          message={
            <InfoToolTip isSuccess={isSuccess} errorMessage={errorMessage} />
          }
          onClose={() => setTooltipVisible(false)}
        />
      )}
    </>
  );
}

export default Login;
