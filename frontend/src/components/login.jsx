import praetor from "../images/juezp.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function Login() {

const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();

    if (name === "" || password === "") {
      alert("Por favor completa todos los campos.");
      return;
    }
    const loginExitoso = true;
    if (loginExitoso) {

      navigate("/dashboard");
    } else {
      alert("Login fallido. Verifica tus datos.");
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login_content ">
        <p className="login_slogan" >
          “Praetor: donde la justicia toma forma y la ley encuentra su voz”
        </p>
        <img className="login_img" src={praetor} alt="imegn de juez romano" />
      </div>

      <div className="login-container">
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

          <button  type="submit" className="login_button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
