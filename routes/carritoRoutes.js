const express = require('express');
const router = express.Router();
const { crearCarrito } = require('../controllers/carritoController');

router.get('/', (req, res) => {
  res.render('carrito');
});

router.post('/', crearCarrito);

module.exports = router;
