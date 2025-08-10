const Tutela = require('../models/tutela.model');

exports.createTutela = async (req, res) => {
  try {
    const data = req.body;
    data.createdBy = req.user._id;
    const nueva = new Tutela(data);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creando tutela' });
  }
};

exports.getTutelas = async (req, res) => {
  try {
    const tutelas = await Tutela.find().populate('accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato');
    res.json(tutelas);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tutelas' });
  }
};

exports.getTutelaById = async (req, res) => {
  try {
    const tutela = await Tutela.findById(req.params.id).populate('accionante despacho abogado');
    if (!tutela) return res.status(404).json({ message: 'No encontrado' });
    res.json(tutela);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
};

exports.updateTutela = async (req, res) => {
  try {
    const updated = await Tutela.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'No encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando' });
  }
};

exports.deleteTutela = async (req, res) => {
  try {
    const deleted = await Tutela.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Borrado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando' });
  }
};