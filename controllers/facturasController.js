const mongoose = require('mongoose');
const Factura = require('../models/Factura'); // Ajusta la ruta según tu estructura de proyecto

const getFacturas = async (req, res) => {
  try {

    const facturas = await Factura.find({ cliente: req.user.userId });

    res.json(facturas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }}

module.exports = {getFacturas}