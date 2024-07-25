const Factura = require('../models/Factura'); 

const getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find({ cliente: req.user.userId });
    res.json(facturas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }}

module.exports = {getFacturas}