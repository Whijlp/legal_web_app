const yup = require('yup');
const registerSchema = yup.object().shape({
  nombre: yup.string().required('Nombre es requerido').min(2),
  correo: yup.string().email('Email inválido').required('Correo es requerido'),
  password: yup.string().required('Password es requerido').min(6),
  rol: yup.string().oneOf(['admin','notificador','consultor']).optional(),
});
const loginSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  password: yup.string().required(),
});

module.exports = { registerSchema, loginSchema };
