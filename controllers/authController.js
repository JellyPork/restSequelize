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

const jwtDecode = async (req, res) => {
  try {
    const { id, accessToken, email } = req.body;

    // Verificar si el usuario existe en tu base de datos
    const user = await User.findOne({ id: id });

    if (user) {
      // Usuario existente, generar el token JWT
      jwt.verify(accessToken, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid access token" });
        }
        const jwtToken = jwt.sign({ id: id, email: email }, secretKey, { expiresIn });
        res.json({ jwtToken });
      });
    } else {
      // Nuevo usuario, registrar en la base de datos y generar el token JWT
      const newUser = new User({ id: id, email: email });
      await newUser.save();

      const jwtToken = jwt.sign({ id: id, email: email }, secretKey, { expiresIn });
      res.json({ jwtToken });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
    signup,
    login,
    jwtDecode,
};
