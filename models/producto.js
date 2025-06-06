const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  categoria: {
    type: String,
    enum: ['cafeteria', 'heladeria'],
    required: true,
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  imagen: { 
    type: String,
    required: true
  }
}, { timestamps: true });

const producto = mongoose.model('Producto', productoSchema);

module.exports = producto;
