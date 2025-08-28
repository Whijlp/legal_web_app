const yup2 = require("yup");
const createTutelaSchema = yup2.object().shape({
  radicado: yup2.string().required("Radicado requerido"),
  termino: yup2.string().required("Término requerido"),
  accionante: yup2.string().required("Accionante requerido"),
  despacho: yup2.string().required("Despacho requerido"),
  convocatoria: yup2.string().required("Convocatoria requerida"),
  temaEspecifico: yup2.string().required("Tema específico requerido"),
  abogado: yup2.string().required("Abogado requerido"),
});
module.exports = { createTutelaSchema };
