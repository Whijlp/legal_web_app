const permit = (...allowed) => {
  return (req, res, next) => {
    console.log(" [PERMIT] Roles permitidos:", allowed);
    console.log(" [PERMIT] Rol del usuario:", req.user?.allowed);
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });
    if (!allowed.includes(req.user.rol)) return res.status(403).json({ message: 'Acceso denegado' });
    next();
  };
};
module.exports = permit;