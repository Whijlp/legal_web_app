import { useState } from "react";
import TareaCard from "./TareasCard";

function TareasDashboard() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const agregarTarea = () => {
    if (titulo.trim()) {
      setTareas([
        ...tareas,
        {
          id: Date.now(),
          titulo,
          completada: false,
        },
      ]);
      setTitulo("");
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="dashboard_tareas">
      <h2 className="tareas_titulo">Tareas Importantes</h2>

      <div className="tareas_contenido">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="tabs_inputs"
        />
        <button onClick={agregarTarea} className="btnotros">Tarea nueva</button>
      </div>

      <div className="tarea-lista">
        {tareas.map((tarea) => (
          <TareaCard
            key={tarea.id}
            tarea={tarea}
            onEliminar={() => eliminarTarea(tarea.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TareasDashboard;
