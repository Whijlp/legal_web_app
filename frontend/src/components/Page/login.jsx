
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import InfoToolTip from "../popup/InfoToolTip.jsx";
import Popup from "../popup/Popup.jsx";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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

    if (!name || !password) {
      mostrarTooltip("Por favor completa todos los campos.", false);
      return;
    }

    const loginExitoso = true; 

    if (loginExitoso) {
      setUser({ name });
      localStorage.setItem("user", JSON.stringify({ name }));
      mostrarTooltip(`¡Bienvenido, ${name}!`, true, true);
    } else {
      mostrarTooltip("Login fallido. Verifica tus datos.", false);
    }
  };
  return (
    <>
      
        <h1>Datos de usuario</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="login_input-name"
            type="text"
            id="username"
            name="username"
            placeholder="nombre de usuario "
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="login_input-password"
            type="password"
            id="password"
            name="password"
            placeholder="contraseña "
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login_button">
            Login
          </button>
          <p className="login_text">
            ¿No tienes una cuenta?{" "}
            <Link to="/auth/register" className="login_register-link">
              Regístrate
            </Link>
          </p>
        </form>
   
      {tooltipVisible && (
        <Popup
          message={
            <InfoToolTip isSucess={isSuccess} errorMessage={errorMessage} />
          }
          onClose={() => setTooltipVisible(false)}
        />
      )}
  </>
  );
}
export default Login;
