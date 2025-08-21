const Tutela = require("../models/tutela.model");
const Usuario = require("../models/usuario.model");
const Despacho = require("../models/despacho.model");
const Abogado = require("../models/abogado.model");
const Accionante = require("../models/accionante.model");
const cleanRef = require("../utils/cleanRef");

const getIdFromName = async (Model, value) => {
  if (!value) return null;
  if (value.match(/^[0-9a-fA-F]{24}$/)) return value;
  const doc = await Model.findOne({ nombre: value.trim() });
  if (!doc) {
    doc = await Model.create({ nombre: value.trim() });
  }

  return doc._id;
};

exports.createTutela = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const data = {
      ...req.body,
      accionante: await getIdFromName(Accionante, req.body.accionante),
      despacho: await getIdFromName(Despacho, req.body.despacho),
      abogado: await getIdFromName(Abogado, req.body.abogado),
      fallo_1_instancia: cleanRef(req.body.fallo_1_instancia),
      fallo_2_instancia: cleanRef(req.body.fallo_2_instancia),
      incidente_desacato: cleanRef(req.body.incidente_desacato),
      createdBy: req.user._id,
    };
    const nueva = new Tutela(data);
    await nueva.save();

    const populated = await Tutela.findById(nueva._id).populate(
      "accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato"
    );

    res.status(201).json(populated);
  } catch (err) {
    console.error("Error en createTutela:", err);
    res.status(500).json({
      message: "Error creando tutela",
      error: err.message,
    });
  }
};

exports.getTutelas = async (req, res) => {
  try {
    const query = {};

    if (req.query.radicado) {
      query.radicado = new RegExp(req.query.radicado, "i"); // búsqueda parcial
    }

    if (req.query.accionante) {
      const id = await getIdFromName(Usuario, req.query.accionante);
      if (id) query.accionante = id; // ✅ solo agrega si existe
    }

    if (req.query.despacho) {
      const id = await getIdFromName(Despacho, req.query.despacho);
      if (id) query.despacho = id;
    }

    if (req.query.abogado) {
      const id = await getIdFromName(Abogado, req.query.abogado);
      if (id) query.abogado = id;
    }

    const tutelas = await Tutela.find(query).populate(
      "accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato"
    );

    res.json(tutelas);
  } catch (err) {
    res.status(500).json({
      message: "Error obteniendo tutelas",
      error: err.message,
    });
  }
};

exports.getTutelaById = async (req, res) => {
  try {
    const tutela = await Tutela.findById(req.params.id).populate(
      "accionante despacho abogado"
    );
    if (!tutela) return res.status(404).json({ message: "No encontrado" });
    res.json(tutela);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obteniendo tutela", error: err.message });
  }
};

exports.updateTutela = async (req, res) => {
  try {
    let data = { ...req.body };

    if (data.accionante)
      data.accionante = await getIdFromName(Usuario, data.accionante);
    if (data.despacho)
      data.despacho = await getIdFromName(Despacho, data.despacho);
    if (data.abogado) data.abogado = await getIdFromName(Abogado, data.abogado);

    const updated = await Tutela.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).populate(
      "accionante despacho abogado fallo_1_instancia fallo_2_instancia incidente_desacato"
    );

    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error actualizando tutela", error: err.message });
  }
};

exports.deleteTutela = async (req, res) => {
  try {
    const deleted = await Tutela.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Borrado" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error eliminando tutela", error: err.message });
  }
};
