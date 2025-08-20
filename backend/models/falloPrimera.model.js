const mongoose = require('mongoose');
const falloPrimeraSchema = new mongoose.Schema({
  fallo: String,
  fecha_entrada: Date,
  fecha_cumplimiento: Date,
  fallo_despues_nulidad: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('FalloPrimera', falloPrimeraSchema);