const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const {  username, password, name, email} = req.body;

  // Valido campos vacíos
  if (!email || !password || !username || !name || !email.trim() || !password.trim() || !name.trim() || !email.trim()) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }

  try {
    // Verifico si el usuario ya existe
    const existingMail = await User.findOne({ email });
    if (existingMail) {
      return res.status(400).json({ message: 'El email ingresado esta en uso. Por favor, inténtelo de nuevo.' });
    }
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ message: 'El nombre de usuario ingresado esta en uso. Por favor, inténtelo de nuevo.' });
    }

    // Creo un nuevo usuario
    const newUser = new User({
      username, password, name, email
    });

    // Guardo el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro', error);
    res.status(500).json({ message: 'Error en el servidor. Por favor, inténtelo de nuevo.' });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Busco usuario por email o username
    const user = await User.findOne({ 
      $or: [
        { email: identifier }, 
        { username: identifier }
      ]
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Error en el login', err);
    res.status(500).json({ message: 'Error en el servidor. Por favor, inténtelo de nuevo.' });
  }
};

module.exports = { register, login }