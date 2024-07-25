const User = require('../models/User');

const getUser = async (req, res) => {
  try {
    const { username, name, email } = req.user;
    res.json({ username, name, email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, name } = req.body;

    // Verifico si el nuevo email o username ya existen en la base de datos
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByEmail && existingUserByEmail.id.toString() !== id) {
      return res.status(400).json({ error: 'El email ya está en uso por otro usuario' });
    }

    if (existingUserByUsername && existingUserByUsername.id.toString() !== id) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso por otro usuario' });
    }

    // Actualizo el usuario
    const updates = { username, email, name };
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ username: updatedUser.username, email: updatedUser.email, name: updatedUser.name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {updateUser, getUser}