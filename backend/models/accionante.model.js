const mongoose = require('mongoose');

const accionanteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  radicado: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Accionante', accionanteSchema);
