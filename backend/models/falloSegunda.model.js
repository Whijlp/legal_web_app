const falloSegundaSchema = new mongoose.Schema({
  fallo: String,
  fecha_notificacion: Date,
  fecha_cumplimiento: Date,
}, { timestamps: true });
module.exports = require('mongoose').model('FalloSegunda', falloSegundaSchema);