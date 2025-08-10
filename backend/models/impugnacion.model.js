const impugnacionSchema = new mongoose.Schema({
  nombre: String,
}, { timestamps: true });
module.exports = require('mongoose').model('Impugnacion', impugnacionSchema);
