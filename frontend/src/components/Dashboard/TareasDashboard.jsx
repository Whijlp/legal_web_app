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
      <h2>Tareas Importantes</h2>

      <div className="tarea-form">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button onClick={agregarTarea}>Agregar</button>
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
