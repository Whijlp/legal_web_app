const accionanteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  radicado: { type: String },
}, { timestamps: true });
module.exports = require('mongoose').model('Accionante', accionanteSchema);
