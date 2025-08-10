const otrasSchema = new mongoose.Schema({
  otras_notificaciones: String,
  fecha_notificacion: Date,
}, { timestamps: true });
module.exports = require('mongoose').model('OtrasNotificaciones', otrasSchema);
