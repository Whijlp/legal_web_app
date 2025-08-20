function ResultadosBusqueda({ resultados, onSeleccionar }) {
  return (
    <div className="resultados">
      <h2>Resultados encontrados:</h2>
      <ul>
        {resultados.map((registro) => (
          <li key={registro._id} className="resultado-item">
            <p><strong>Radicado:</strong> {registro.radicado}</p>
            <p><strong>Accionante:</strong> {registro.accionante}</p>
            <p><strong>Despacho:</strong> {registro.despacho}</p>
            <button onClick={() => onSeleccionar(registro)}>
              Seleccionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultadosBusqueda;
