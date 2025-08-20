const mongoose = require('mongoose');
const impugnacionSchema = new mongoose.Schema({
  nombre: String,
}, { timestamps: true });
module.exports = mongoose.model('Impugnacion', impugnacionSchema);
