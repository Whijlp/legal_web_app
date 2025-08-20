const mongoose = require('mongoose');

const otrasSchema = new mongoose.Schema({
  otras_notificaciones: String,
  fecha_notificacion: Date,
}, { timestamps: true });
module.exports = mongoose.model('OtrasNotificaciones', otrasSchema);
