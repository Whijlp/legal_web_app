function TareaCard({ tarea, onEliminar }) {
  return (
    <div className="tarea-card">
      <h4 className="tarea_nueva">{tarea.titulo}</h4>
      <button onClick={onEliminar} className="tare_btn-eliminar">🗑️</button>
    </div>
  );
}

export default TareaCard;
