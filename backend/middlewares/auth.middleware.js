const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
    console.log(" [AUTH] Header recibido:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(" [AUTH] No se envió token");

    return res.status(401).json({ message: 'Token requerido' });
  }
  const token = authHeader.split(' ')[1];
  console.log("🔑 [AUTH] Token extraído:", token);


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(" [AUTH] Token decodificado:", decoded);

    const user = await Usuario.findById(decoded.id).select('-password');
        console.log(" [AUTH] Usuario encontrado:", user?.email, "Rol:", user?.role);

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
module.exports = auth;
