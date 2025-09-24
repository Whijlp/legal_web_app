const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Usuario.findById(decoded.id).select("-password");

    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
module.exports = auth;
