const yup2 = require('yup');
const createTutelaSchema = yup2.object().shape({
  radicado: yup2.string().required('Radicado requerido'),
  accionante: yup2.string().required('Accionante requerido'),
  despacho: yup2.string().required('Despacho requerido'),
  tema_general: yup2.string().optional(),
  tema_especifico: yup2.string().optional(),
    abogado: yup2.string().required('Abogado requerido'),

});
module.exports = { createTutelaSchema };