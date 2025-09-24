const Tutela = require("../models/tutela.model");
const Usuario = require("../models/usuario.model");
const Despacho = require("../models/despacho.model");
const Abogado = require("../models/abogado.model");
const Accionante = require("../models/accionante.model");
const Termino = require("../models/termino.model");
const FalloPrimera = require("../models/falloPrimera.model");
const FalloSegunda = require("../models/falloSegunda.model");
const IncidenteDesacato = require("../models/incidentesDesacato.models");
const OtrasNotificaciones = require("../models/otrosRequerimiento.model");
const Impugnacion = require("../models/impugnacion.model");
const TemaEspecifico = require("../models/temaEspecifico.model");
const Convocatoria = require("../models/convocatoria.model");
const isValidObject = require("../utils/validObject").isValidObject;
const cleanRef = require("../utils/cleanRef");

const getIdFromName = async (Model, value) => {
  if (!value) return null;
  if (value.match(/^[0-9a-fA-F]{24}$/)) return value;

  let doc = await Model.findOne({ nombre: new RegExp(value.trim(), "i") });
  if (!doc) {
    doc = await Model.create({ nombre: value.trim() });
  }
  return doc._id;
};

exports.createTutela = async (req, res) => {

  try {
    console.log(
      "Datos recibidos en req.body:",
      JSON.stringify(req.body, null, 2)
    );

    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const {
      fechaIngreso,
      fechaVencimiento,
      termino,
      radicado,
      accionante,
      despacho,
      convocatoria,
      temaEspecifico,
      abogado,
    } = req.body;

    if (!fechaIngreso || !fechaVencimiento || !termino) {
      console.log("Campos faltantes para Termino:", {
        fechaIngreso,
        fechaVencimiento,
        termino,
      });
      return res.status(400).json({
        message:
          "Los campos fechaIngreso, fechaVencimiento y termino son obligatorios para Termino",
      });
    }

    const fechaIngresoDate = new Date(fechaIngreso);
    const fechaVencimientoDate = new Date(fechaVencimiento);
    if (isNaN(fechaIngresoDate) || isNaN(fechaVencimientoDate)) {
      console.log("Fechas inválidas:", { fechaIngreso, fechaVencimiento });
      return res.status(400).json({
        message:
          "Las fechas proporcionadas (fechaIngreso o fechaVencimiento) no son válidas",
      });
    }

    if (
      !radicado ||
      !accionante ||
      !despacho ||
      !convocatoria ||
      !temaEspecifico ||
      !abogado
    ) {

      return res.status(400).json({
        message:
          "Los campos radicado, accionante, despacho, convocatoria, temaEspecifico y abogado son obligatorios para Tutela",
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
      termino: terminoDoc._id,
      createdBy: req.user._id,
    };

    const nueva = new Tutela(data);
    await nueva.save();

    const populated = await Tutela.findById(nueva._id).populate(
      "accionante temaEspecifico convocatoria termino despacho abogado"
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
    console.log("Entrando en getTutelas");
    console.log("Query params:", req.query);

    const query = {};

    if (req.query.radicado) {
      query.radicado = new RegExp(req.query.radicado.trim(), "i");
    }

    if (req.query.accionante) {
      const id = await getIdFromName(Accionante, req.query.accionante);
      if (id) {
        query.accionante = id;
      } else {
        console.log("No se encontró accionante:", req.query.accionante);
        return res.status(200).json([]);
      }
    }

    if (req.query.despacho) {
      const id = await getIdFromName(Despacho, req.query.despacho);
      if (id) {
        query.despacho = id;
      } else {
        console.log("No se encontró despacho:", req.query.despacho);
        return res.status(200).json([]);
      }
    }

    if (req.query.abogado) {
      const id = await getIdFromName(Abogado, req.query.abogado);
      if (id) {
        query.abogado = id;
      } else {
        console.log("No se encontró abogado:", req.query.abogado);
        return res.status(200).json([]);
      }
    }

    if (req.query.temaEspecifico) {
      const id = await getIdFromName(TemaEspecifico, req.query.temaEspecifico);
      if (id) {
        query.temaEspecifico = id;
      } else {
        console.log("No se encontró temaEspecifico:", req.query.temaEspecifico);
        return res.status(200).json([]);
      }
    }

    if (req.query.convocatoria) {
      const id = await getIdFromName(Convocatoria, req.query.convocatoria);
      if (id) {
        query.convocatoria = id;
      } else {
        console.log("No se encontró convocatoria:", req.query.convocatoria);
        return res.status(200).json([]);
      }
    }

    console.log("Consulta a MongoDB:", query);

    const tutelas = await Tutela.find(query).populate(
      "accionante temaEspecifico convocatoria termino despacho abogado falloPrimera falloSegunda incidentesDesacato"
    );

    console.log("Tutelas encontradas:", tutelas);

    res.status(200).json(tutelas);
  } catch (err) {
    console.error("Error en getTutelas:", err);
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
  console.log("👉 Entró al controlador UPDATE TUTELA con body:", req.body);

  try {
    const tutelaId = req.params.id;
    if (!tutelaId) {
      return res.status(400).json({ message: "ID de tutela requerido" });
    }

    let data = { ...req.body };

    if (isValidObject(data.falloPrimera)) {
  const falloPrimeraData = {
    fallo: data.falloPrimera.fallo,
    fecha_entrada: data.falloPrimera.fecha_notificado ? new Date(data.falloPrimera.fecha_notificado) : null,
    fecha_cumplimiento: data.falloPrimera.fecha_vencimiento ? new Date(data.falloPrimera.fecha_vencimiento) : null,
    fallo_despues_nulidad: data.falloPrimera.fallo_despues_nulidad || false,
  };
  let falloPrimeraDoc = await FalloPrimera.findOneAndUpdate(
    { _id: data.falloPrimera._id },
    falloPrimeraData,
    { new: true, upsert: true }
  );
  data.falloPrimera = falloPrimeraDoc._id;
} else if (data.falloPrimera === null || data.falloPrimera === undefined) {
  data.falloPrimera = null;
}


    if (isValidObject(data.falloSegunda)) {
      const falloSegundaData = {
        fallo: data.falloSegunda.fallo,
        fecha_entrada: data.falloSegunda.fecha_entrada ? new Date(data.falloSegunda.fecha_entrada) : null,
        fecha_cumplimiento: data.falloSegunda.fecha_cumplimiento ? new Date(data.falloSegunda.fecha_cumplimiento) : null,
        fallo_despues_nulidad: data.falloSegunda.fallo_despues_nulidad || false,
      };
      let falloSegundaDoc = await FalloSegunda.findOneAndUpdate(
        { _id: data.falloSegunda._id },
        falloSegundaData,
        { new: true, upsert: true }
      );
      data.falloSegunda = falloSegundaDoc._id;
    } else if (data.falloSegunda === null || data.falloSegunda === undefined) {
      data.falloSegunda = null;
    }


    if (isValidObject(data.incidentesDesacato)) {
      let incidenteDesacatoDoc = await IncidenteDesacato.findOneAndUpdate(
        { _id: data.incidentesDesacato._id },
        {
          requerimiento_previo: data.incidentesDesacato.requerimiento_previo || false,
          fecha_notificacion: data.incidentesDesacato.fecha_notificacion ? new Date(data.incidentesDesacato.fecha_notificacion) : null,
          fecha_cumplimiento: data.incidentesDesacato.fecha_cumplimiento ? new Date(data.incidentesDesacato.fecha_cumplimiento) : null,
          apertura: data.incidentesDesacato.apertura || false,
          incidente_sanciona: data.incidentesDesacato.incidente_sanciona || false,
        },
        { new: true, upsert: true }
      );
      data.incidentesDesacato = incidenteDesacatoDoc._id;
    } else if (data.incidentesDesacato === null || data.incidentesDesacato === undefined) {
      data.incidentesDesacato = null;
    }

    if (isValidObject(data.impugnacion)) {
      let impugnacionDoc = await Impugnacion.findOneAndUpdate(
        { _id: data.impugnacion._id },
        { nombre: data.impugnacion.nombre },
        { new: true, upsert: true }
      );
      data.impugnacion = impugnacionDoc._id;
    } else if (data.impugnacion === null || data.impugnacion === undefined) {
      data.impugnacion = null;
    }

    if (isValidObject(data.otrasNotificaciones)) {
      let otrasNotificacionesDoc = await OtrasNotificaciones.findOneAndUpdate(
        { _id: data.otrasNotificaciones._id },
        {
          otras_notificaciones: data.otrasNotificaciones.otras_notificaciones,
          fecha_notificacion: data.otrasNotificaciones.fecha_notificacion ? new Date(data.otrasNotificaciones.fecha_notificacion) : null,
        },
        { new: true, upsert: true }
      );
      data.otrasNotificaciones = otrasNotificacionesDoc._id;
    } else if (data.otrasNotificaciones === null || data.otrasNotificaciones === undefined) {
      data.otrasNotificaciones = null;
    }

    const updatedTutela = await Tutela.findByIdAndUpdate(tutelaId, data, {
      new: true,
    }).populate(
      "accionante despacho convocatoria temaEspecifico abogado falloPrimera falloSegunda incidentesDesacato impugnacion otrasNotificaciones termino createdBy"
    );

    if (!updatedTutela) {
      return res.status(404).json({ message: "Tutela no encontrada" });
    }

    res.json(updatedTutela);
  } catch (err) {
    console.error("Error en updateTutela:", err);
    res.status(500).json({
      message: "Error actualizando tutela",
      error: err.message,
    });
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
