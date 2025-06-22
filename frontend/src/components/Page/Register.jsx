import { Link } from "react-router";


function Register() {
  return (
    <>
      <h1>Registro de usuario</h1>
      <form className="login-form">
        <input
          className="login_input-name"
          type="text"
          id="username"
          name="username"
          placeholder="Nombre de usuario"
        />
        <input
          className="login_input-name"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="login_input-password"
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
        />

        <button type="submit" className="login_button">
          Registrar
        </button>
      </form>
      <p className="login_text">
        Ya tienes una cuenta? {" "}
        <Link to="/login" className="register-login-link">
          Inicia sesión
        </Link>
      </p>
    </>
  );
}

export default Register;
