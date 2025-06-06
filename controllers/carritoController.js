const Carrito = require('../models/carrito');

const crearCarrito = async (req, res) => {
  try {
    const { productos, total } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío o mal formado' });
    }

    console.log('📦 Productos recibidos en el carrito:', productos);
    console.log('💰 Total de la compra:', total);

    const nuevoCarrito = new Carrito({ productos, total });
    await nuevoCarrito.save();

    return res.status(201).json({ mensaje: 'Carrito guardado exitosamente' });
  } catch (error) {
    console.error('❌ Error al guardar el carrito:', error);
    res.status(500).json({ error: 'Error interno al guardar el carrito' });
  }
};

module.exports = {
  crearCarrito
};
