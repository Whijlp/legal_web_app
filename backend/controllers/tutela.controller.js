const Tutela = require("../models/tutela.model");
const Usuario = require("../models/usuario.model");
const Despacho = require("../models/despacho.model");
const Abogado = require("../models/abogado.model");
const Accionante = require("../models/accionante.model");
const Termino = require("../models/termino.model");
const TemaEspecifico = require("../models/temaEspecifico.model");
const Convocatoria = require("../models/convocatoria.model");
const cleanRef = require("../utils/cleanRef");

const getIdFromName = async (Model, value) => {
  if (!value) return null;
  if (value.match(/^[0-9a-fA-F]{24}$/)) return value;

  let doc = await Model.findOne({ nombre: value.trim() });
  if (!doc) {
    doc = await Model.create({ nombre: value.trim() });
  }
  return doc._id;
};

exports.createTutela = async (req, res) => {
  console.log("👉 Entró al controlador CREATE TUTELA con body:", req.body);

  try {

    console.log('Datos recibidos en req.body:', JSON.stringify(req.body, null, 2));
    console.log('Headers de la solicitud:', req.headers);
    if (!req.user) {

      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const {     fechaIngreso, fechaVencimiento, termino, radicado, accionante, despacho, convocatoria, temaEspecifico, abogado } = req.body;

    if (!fechaIngreso || !fechaVencimiento || !termino) {
      console.log('Campos faltantes para Termino:', { fechaIngreso, fechaVencimiento, termino });
      return res.status(400).json({
        message: "Los campos fechaIngreso, fechaVencimiento y termino son obligatorios para Termino",
      });
    }


    const fechaIngresoDate = new Date(fechaIngreso);
    const fechaVencimientoDate = new Date(fechaVencimiento);
    if (isNaN(fechaIngresoDate) || isNaN(fechaVencimientoDate)) {
      console.log('Fechas inválidas:', { fechaIngreso, fechaVencimiento });
      return res.status(400).json({
        message: "Las fechas proporcionadas (fechaIngreso o fechaVencimiento) no son válidas",
      });
    }


    if (!radicado || !accionante || !despacho || !convocatoria || !temaEspecifico || !abogado) {
      console.log('Campos faltantes para Tutela:', { radicado, accionante, despacho, convocatoria, temaEspecifico, abogado });
      return res.status(400).json({
        message: "Los campos radicado, accionante, despacho, convocatoria, temaEspecifico y abogado son obligatorios para Tutela",
      });
    }


    const terminoDoc = new Termino({
      fechaIngreso: fechaIngresoDate,
      fechaVencimiento: fechaVencimientoDate,
      termino,
    });
    await terminoDoc.save();


    const data = {
      ...req.body,
      accionante: await getIdFromName(Accionante, accionante),
      temaEspecifico: await getIdFromName(TemaEspecifico, temaEspecifico),
      convocatoria: await getIdFromName(Convocatoria, convocatoria),
      despacho: await getIdFromName(Despacho, despacho),
      abogado: await getIdFromName(Abogado, abogado),
      fallo_1_instancia: cleanRef(req.body.fallo_1_instancia),
      fallo_2_instancia: cleanRef(req.body.fallo_2_instancia),
      incidentesDesacato: cleanRef(req.body.incidentesDesacato),
      termino: terminoDoc._id,
      createdBy: req.user._id,
    };

    const nueva = new Tutela(data);
    await nueva.save();


    const populated = await Tutela.findById(nueva._id).populate(
      "accionante temaEspecifico convocatoria termino despacho abogado fallo_1_instancia fallo_2_instancia incidentesDesacato"
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
      query.radicado = new RegExp(req.query.radicado, "i");
    }

    if (req.query.accionante) {
      const id = await getIdFromName(Usuario, req.query.accionante);
      if (id) query.accionante = id;
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
      "accionante temaEspecifico convocatoria termino despacho abogado fallo_1_instancia fallo_2_instancia incidentesDesacato"
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
      "accionante temaEspecifico convocatoria termino despacho abogado fallo_1_instancia fallo_2_instancia incidentesDesacato"
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
