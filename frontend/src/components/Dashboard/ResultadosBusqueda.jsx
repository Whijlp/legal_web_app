

function ResultadosBusqueda({ resultados, onSeleccionar }) {
  return (
    <div className="resultados_container">
      <h2 className="resultados_title">Resultados de la búsqueda</h2>
      <ul className="resultadosList">
        {resultados.map((registro) => (
          <li key={registro._id} className="resultadoItem">
            <div className="field">
              <strong>Radicado:</strong> {registro.radicado || '—'}
            </div>
            <div className="field">
              <strong>Accionante:</strong>{' '}
              {registro.accionante && typeof registro.accionante === 'object'
                ? registro.accionante.nombre
                : registro.accionante || '—'}
            </div>
            <div className="field">
              <strong>Despacho:</strong>{' '}
              {registro.despacho && typeof registro.despacho === 'object'
                ? registro.despacho.nombre
                : registro.despacho || '—'}
            </div>
            <div className="field">
              <strong>Convocatoria:</strong>{' '}
              {registro.convocatoria && typeof registro.convocatoria === 'object'
                ? registro.convocatoria.nombre
                : registro.convocatoria || '—'}
            </div>
            <div className="field">
              <strong>Tema Específico:</strong>{' '}
              {registro.temaEspecifico && typeof registro.temaEspecifico === 'object'
                ? registro.temaEspecifico.nombre
                : registro.temaEspecifico || '—'}
            </div>
            <div className="field">
              <strong>Abogado:</strong>{' '}
              {registro.abogado && typeof registro.abogado === 'object'
                ? registro.abogado.nombre
                : registro.abogado || '—'}
            </div>
            <div className="field">
              <strong>Fecha de Ingreso:</strong>{' '}
              {registro.termino && typeof registro.termino === 'object'
                ? new Date(registro.termino.fechaIngreso).toLocaleDateString('es-CO')
                : registro.termino?.fechaIngreso || '—'}
            </div>
            <div className="field">
              <strong>Fecha de Vencimiento:</strong>{' '}
              {registro.termino && typeof registro.termino === 'object'
                ? new Date(registro.termino.fechaVencimiento).toLocaleDateString('es-CO')
                : registro.termino?.fechaVencimiento || '—'}
            </div>
            <div className="field">
              <strong>Término:</strong>{' '}
              {registro.termino && typeof registro.termino === 'object'
                ? registro.termino.termino
                : registro.termino?.termino || '—'}
            </div>
            <div className="field">
              <strong>Fallo 1ª Instancia:</strong>{' '}
              {registro.fallo_1_instancia && typeof registro.fallo_1_instancia === 'object'
                ? registro.fallo_1_instancia.nombre
                : registro.fallo_1_instancia || '—'}
            </div>
            <div className="field">
              <strong>Fallo 2ª Instancia:</strong>{' '}
              {registro.fallo_2_instancia && typeof registro.fallo_2_instancia === 'object'
                ? registro.fallo_2_instancia.nombre
                : registro.fallo_2_instancia || '—'}
            </div>
            <div className="field">
              <strong>Incidentes de Desacato:</strong>{' '}
              {registro.incidentesDesacato && typeof registro.incidentesDesacato === 'object'
                ? registro.incidentesDesacato.nombre
                : registro.incidentesDesacato || '—'}
            </div>
            <button
              className="verButton"
              onClick={() => onSeleccionar(registro)}
            >
              Ver
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultadosBusqueda;