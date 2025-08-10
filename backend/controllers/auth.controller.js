const Usuario = require('../models/usuario.model');
const { signToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ message: 'Correo ya registrado' });
    const user = new Usuario({ nombre, correo, password, rol });
    await user.save();
    const token = signToken({ id: user._id, rol: user.rol });
    res.status(201).json({ token, user: { id: user._id, nombre: user.nombre, correo: user.correo, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ message: 'Error registrando usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    const user = await Usuario.findOne({ nombre });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });
    const token = signToken({ id: user._id, rol: user.rol });
    res.json({ token, user: { id: user._id, nombre: user.nombre, correo: user.correo, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ message: 'Error en login' });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};