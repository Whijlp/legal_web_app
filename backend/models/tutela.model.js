const mongoose2 = require('mongoose');
require("./termino.model")
require("./temaEspecifico.model");
require("./convocatoria.model");
require("./abogado.model");
require("./accionante.model");
require("./despacho.model");
require("./impugnacion.model");
require("./falloPrimera.model");
require("./falloSegunda.model");
require("./incidentesDesacato.models");
require("./otrosRequerimiento.model");


const tutelaSchema = new mongoose2.Schema({
  termino: { type: mongoose2.Schema.Types.ObjectId, ref: 'Termino', required: true },
  radicado: { type: String, required: true},
  accionante: { type: mongoose2.Schema.Types.ObjectId, ref: 'Accionante',required: true },
  radicado_accionante: { type: String },
  despacho: { type: mongoose2.Schema.Types.ObjectId, ref: 'Despacho',required: true },
  convocatoria: { type: mongoose2.Schema.Types.ObjectId, ref: 'Convocatoria', required: true },
  temaEspecifico: {type: mongoose2.Schema.Types.ObjectId, ref: 'TemaEspecifico', required: true },
  abogado: { type: mongoose2.Schema.Types.ObjectId, ref: 'Abogado',required: true },
  fallo_1_instancia: { type: mongoose2.Schema.Types.ObjectId, ref: 'FalloPrimera' },
  impugnacion: { type: mongoose2.Schema.Types.ObjectId, ref: 'Impugnacion' },
  fallo_2_instancia: { type: mongoose2.Schema.Types.ObjectId, ref: 'FalloSegunda' },
  incidentesDesacato: { type: mongoose2.Schema.Types.ObjectId, ref: 'IncidenteDesacato' },
  revisionCorte: { type: mongoose2.Schema.Types.ObjectId, ref: 'RevisionCorte' },
  otrasNotificaciones: [{ type: mongoose2.Schema.Types.ObjectId, ref: 'OtrasNotificaciones' }],
  createdBy: { type: mongoose2.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: true });
module.exports = mongoose2.model('Tutela', tutelaSchema);