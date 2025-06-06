const mongoose = require('mongoose');

const productoCarritoSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  titulo: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
});

const carritoSchema = new mongoose.Schema({
  productos: [productoCarritoSchema],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;
