const mongoose = require('mongoose');

const incidenteSchema = new mongoose.Schema({
  requerimiento_previo: { type: Boolean, default: false },
  fecha_notificacion: Date,
  fecha_cumplimiento: Date,
  apertura: { type: Boolean, default: false },
  incidente_sanciona: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('IncidenteDesacato', incidenteSchema);