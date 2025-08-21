const mongoose2 = require('mongoose');
require("./abogado.model");
require("./accionante.model");
require("./despacho.model");
require("./impugnacion.model");
require("./falloPrimera.model");
require("./falloSegunda.model");
require("./incidentesDesacato.models");
require("./otrosRequerimiento.model");


const tutelaSchema = new mongoose2.Schema({
  radicado: { type: String, required: true},
  accionante: { type: mongoose2.Schema.Types.ObjectId, ref: 'Accionante',required: true },
  radicado_accionante: { type: String },
  despacho: { type: mongoose2.Schema.Types.ObjectId, ref: 'Despacho',required: true },
  tema_general: { type: String },
  tema_especifico: { type: String },
  abogado: { type: mongoose2.Schema.Types.ObjectId, ref: 'Abogado',required: true },
  fallo_1_instancia: { type: mongoose2.Schema.Types.ObjectId, ref: 'FalloPrimera' },
  impugnacion: { type: mongoose2.Schema.Types.ObjectId, ref: 'Impugnacion' },
  fallo_2_instancia: { type: mongoose2.Schema.Types.ObjectId, ref: 'FalloSegunda' },
  incidente_desacato: { type: mongoose2.Schema.Types.ObjectId, ref: 'IncidenteDesacato' },
  fallo_incidente: { type: mongoose2.Schema.Types.ObjectId, ref: 'FalloPrimera' },
  revision_corte: { type: mongoose2.Schema.Types.ObjectId, ref: 'RevisionCorte' },
  otras_notificaciones: [{ type: mongoose2.Schema.Types.ObjectId, ref: 'OtrasNotificaciones' }],
  createdBy: { type: mongoose2.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: true });
module.exports = mongoose2.model('Tutela', tutelaSchema);