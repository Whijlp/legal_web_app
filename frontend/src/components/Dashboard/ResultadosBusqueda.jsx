function ResultadosBusqueda({ resultados, onSeleccionar }) {
  return (
    <div>
      <h2>Resultados</h2>
      <ul>
        {resultados.map((registro) => (
          <li key={registro._id} className="resultado-item">
            <p><strong>Radicado:</strong> {registro.radicado || "—"}</p>

            <p>
              <strong>Accionante:</strong>{" "}
              {registro.accionante && typeof registro.accionante === "object"
                ? registro.accionante.nombre
                : registro.accionante || "—"}
            </p>

            <p>
              <strong>Despacho:</strong>{" "}
              {registro.despacho && typeof registro.despacho === "object"
                ? registro.despacho.nombre
                : registro.despacho || "—"}
            </p>

            <p><strong>Tema general:</strong> {registro.tema_general || "—"}</p>
            <p><strong>Tema específico:</strong> {registro.tema_especifico || "—"}</p>

            <p>
              <strong>Abogado:</strong>{" "}
              {registro.abogado && typeof registro.abogado === "object"
                ? registro.abogado.nombre
                : registro.abogado || "—"}
            </p>

            <p><strong>Fallo 1ª instancia:</strong> {registro.fallo_1_instancia || "—"}</p>
            <p><strong>Fallo 2ª instancia:</strong> {registro.fallo_2_instancia || "—"}</p>
            <p><strong>Impugnación:</strong> {registro.impugnacion || "—"}</p>
            <p><strong>Observaciones:</strong> {registro.observaciones || "—"}</p>

            <button onClick={() => onSeleccionar(registro)}>Ver</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultadosBusqueda;
