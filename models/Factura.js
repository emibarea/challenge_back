const mongoose = require('mongoose');

const FacturaSchemas = new mongoose.Schema({
  idFactura: {
    type: String,
    required: true,
    unique: true,
  },
  cliente: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Factura', FacturaSchemas);