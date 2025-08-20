const mongoose = require('mongoose');
const abogadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Abogado', abogadoSchema);