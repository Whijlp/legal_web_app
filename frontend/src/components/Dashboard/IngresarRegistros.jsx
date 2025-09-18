import { useState } from "react";
import TabContainer from "./TabContainer/TabContainer";
import ResultadosBusqueda from "./ResultadosBusqueda";

function IngresarRegistros() {
  const [showTab, setShowTab] = useState(false);
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [busquedaRadicado, setBusquedaRadicado] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  const buscar = async (campo, valor) => {
    if (!valor.trim()) {
      setMensaje("⚠️ Ingresa un valor para buscar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMensaje("⚠️ Debes iniciar sesión para hacer la búsqueda.");
        return;
      }

      const encodedValor = encodeURIComponent(valor.trim());
      console.log('Buscando:', { campo, valor: encodedValor }); // Depuración

      const res = await fetch(
        `http://localhost:5000/api/tutelas?${campo}=${encodedValor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        setMensaje("❌ Sesión expirada, vuelve a iniciar sesión.");
        return;
      }

      const data = await res.json();
      console.log('Resultados de la búsqueda:', data); // Depuración

      if (data.length > 0) {
        setResultados(data);
        setMensaje("");
      } else {
        setResultados([]);
        setMensaje(`No se encontraron registros relacionados con el ${campo}.`);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setMensaje("❌ Ocurrió un error en la búsqueda.");
    }
  };

  const handleSeleccionar = (registro) => {
    console.log("Registro seleccionado:", registro);
    setRegistroSeleccionado(registro);
    setShowTab(true);
  };

  const handleCrearNuevo = () => {
    setRegistroSeleccionado(null);
    setShowTab(true);
  };

  return (
    <div className="registros">
      {!showTab ? (
        <>
          <h1 className="registros_title">Ingresar y modificar Registros</h1>
          <form className="registros_form">
            <div className="registros_form-group">
              <input
                className="registros_form-item"
                type="text"
                id="accionante"
                name="accionante"
                placeholder="Buscar accionante"
                value={busquedaNombre}
                onChange={(e) => setBusquedaNombre(e.target.value)}
              />
              <button
                className="registros_form-button"
                type="button"
                onClick={() => buscar("accionante", busquedaNombre)}
              >
                Buscar
              </button>
            </div>

            <div>
              <input
                className="registros_form-item"
                type="text"
                id="radicado"
                name="radicado"
                placeholder="Buscar por número radicado"
                value={busquedaRadicado}
                onChange={(e) => setBusquedaRadicado(e.target.value)}
              />
              <button
                className="registros_form-button"
                type="button"
                onClick={() => buscar("radicado", busquedaRadicado)}
              >
                Buscar
              </button>
            </div>

            <button
              type="button"
              className="registros_form-button crear_registro"
              onClick={handleCrearNuevo}
            >
              Crear registro
            </button>
          </form>

          {mensaje && <p className="mensaje">{mensaje}</p>}
          {resultados.length > 0 && (
            <ResultadosBusqueda
              resultados={resultados}
              onSeleccionar={handleSeleccionar}
            />
          )}
        </>
      ) : (
        <>
          <TabContainer registro={registroSeleccionado} />
          <button
            type="button"
            className="registros_form-button cerrar_registro"
            onClick={() => setShowTab(false)}
          >
            Cerrar
          </button>
        </>
      )}
    </div>
  );
}

export default IngresarRegistros;