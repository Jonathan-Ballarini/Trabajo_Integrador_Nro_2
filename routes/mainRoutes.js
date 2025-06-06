const express = require('express');
const router = express.Router();
const { mostrarProductos } = require('../controllers/productoController');

router.get('/', mostrarProductos);

router.get('/contacto', (req, res) => {
  res.render('contacto');
});

router.get('/nosotros', (req, res) => {
  res.render('nosotros');
});

router.get('/carrito', (req, res) => {
  res.redirect('/api/carrito');
});


module.exports = router;
