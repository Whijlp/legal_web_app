function TareaCard({ tarea, onEliminar }) {
  return (
    <div className="tarea-card">
      <h4>{tarea.titulo}</h4>
      <button onClick={onEliminar}>🗑️</button>
    </div>
  );
}

export default TareaCard;
