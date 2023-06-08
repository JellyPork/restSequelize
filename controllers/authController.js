// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey, expiresIn } = require('../config/auth');
const models = require('../models');

const signup = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await models.Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await models.Usuario.create({
      nombre,
      email,
      password: hashedPassword
    });
      newUser.save();

    // Generar el token JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, { expiresIn });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await models.Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
    signup,
    login,
};
