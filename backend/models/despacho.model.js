const mongoose = require('mongoose');

const despachoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Despacho', despachoSchema);