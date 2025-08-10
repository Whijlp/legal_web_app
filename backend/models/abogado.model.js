const abogadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
}, { timestamps: true });
module.exports = require('mongoose').model('Abogado', abogadoSchema);