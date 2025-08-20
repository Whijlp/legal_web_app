const Tutela = require('../models/tutela.model');
const Usuario = require('../models/usuario.model');
const Despacho = require('../models/despacho.model');
const Abogado = require('../models/abogado.model');

const getIdFromName = async (Model, value) => {
  if (!value) return null;
  if (value.match(/^[0-9a-fA-F]{24}$/)) return value;
  const doc = await Model.findOne({ nombre: value.trim() });
  return doc ? doc._id : null;
};

exports.createTutela = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    let data = { ...req.body };

    data.accionante = await getIdFromName(Usuario, data.accionante);
    data.despacho = await getIdFromName(Despacho, data.despacho);
    data.abogado = await getIdFromName(Abogado, data.abogado);

    data.createdBy = req.user._id;

    const nueva = new Tutela(data);
    await nueva.save();

    const populated = await Tutela.findById(nueva._id)
      .populate('accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato');

    res.status(201).json(populated);
  } catch (err) {
    console.error("Error en createTutela:", err);
    res.status(500).json({
      message: 'Error creando tutela',
      error: err.message
    });
  }
};

exports.getTutelas = async (req, res) => {
  try {
    let query = { ...req.query };

    if (query.accionante) {
      query.accionante = await getIdFromName(Usuario, query.accionante);
    }
    if (query.despacho) {
      query.despacho = await getIdFromName(Despacho, query.despacho);
    }
    if (query.abogado) {
      query.abogado = await getIdFromName(Abogado, query.abogado);
    }

    const tutelas = await Tutela.find(query)
      .populate('accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato');

    res.json(tutelas);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tutelas', error: err.message });
  }
};

exports.getTutelaById = async (req, res) => {
  try {
    const tutela = await Tutela.findById(req.params.id)
      .populate('accionante despacho abogado');
    if (!tutela) return res.status(404).json({ message: 'No encontrado' });
    res.json(tutela);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tutela', error: err.message });
  }
};

exports.updateTutela = async (req, res) => {
  try {
    let data = { ...req.body };

    if (data.accionante) data.accionante = await getIdFromName(Usuario, data.accionante);
    if (data.despacho) data.despacho = await getIdFromName(Despacho, data.despacho);
    if (data.abogado) data.abogado = await getIdFromName(Abogado, data.abogado);

    const updated = await Tutela.findByIdAndUpdate(req.params.id, data, { new: true })
      .populate('accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato');

    if (!updated) return res.status(404).json({ message: 'No encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando tutela', error: err.message });
  }
};

exports.deleteTutela = async (req, res) => {
  try {
    const deleted = await Tutela.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Borrado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando tutela', error: err.message });
  }
};
