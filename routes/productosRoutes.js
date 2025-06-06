const express = require('express');
const router = express.Router();
const { crearProducto,
        vistaFormularioProductos,
        eliminarProducto,
        actualizarProducto,
        obtenerProductoPorId
    } = require('../controllers/productoController');
const upload = require('../middlewares/upload');

router.get('/', vistaFormularioProductos);

router.get('/:id', obtenerProductoPorId);

router.post('/', upload.single('imagen'), crearProducto);

router.delete('/:id', eliminarProducto);

router.put('/:id', upload.single('imagen'), actualizarProducto);

module.exports = router;
