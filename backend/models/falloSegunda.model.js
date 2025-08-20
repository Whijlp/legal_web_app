const mongoose = require('mongoose');
const falloSegundaSchema = new mongoose.Schema({
  fallo: String,
  fecha_notificacion: Date,
  fecha_cumplimiento: Date,
}, { timestamps: true });
module.exports = mongoose.model('FalloSegunda', falloSegundaSchema);