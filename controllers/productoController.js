    require("dotenv").config();
    const Producto = require("../models/producto");
    const cloudinary = require('../config/cloudinary');
    const fs = require('fs');
    const { Readable } = require('stream');

    const crearProducto = async (req, res) => {
    try {
        const { categoria, titulo, descripcion, precio, imagen } = req.body;

        if (!categoria || !titulo || !descripcion || !precio) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const esPostman =
        req.headers["user-agent"] &&
        req.headers["user-agent"].includes("Postman");

        let urlImagen = imagen;

        if (req.file) {
            console.log("Archivo recibido:", req.file);

        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        const resultado = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: 'cafelino' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
            );
            bufferStream.pipe(stream);
        });

        urlImagen = resultado.secure_url;
        }

        if (!urlImagen) {
        return res
            .status(400)
            .json({ error: "Debe subir o proporcionar una imagen del producto" });
        }

        const nuevoProducto = new Producto({
        categoria,
        titulo,
        descripcion,
        precio,
        imagen: urlImagen,
        });

        await nuevoProducto.save();

        if (esPostman) {
        return res
            .status(201)
            .json({ mensaje: "Producto creado", producto: nuevoProducto });
        } else {
        return res.redirect("/api/productos?success=1");
        }
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
    };

    const mostrarProductos = async (req, res) => {
    try {
        const productos = await Producto.find().lean();
        res.render("index", { productos });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).render("500");
    }
    };

    const vistaFormularioProductos = async (req, res) => {
    try {
        const productos = await Producto.find().lean();
        console.log("Productos encontrados:", productos);

        const esPostman =
        req.headers["user-agent"] &&
        req.headers["user-agent"].includes("Postman");

        if (esPostman) {
        return res.status(200).json(productos);
        }

        res.render("productos", { productos });
    } catch (error) {
        console.error("Error al mostrar formulario de productos:", error);
        res.status(500).render("500");
    }
    };

    const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await Producto.findByIdAndDelete(id);
        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error interno al eliminar el producto" });
    }
    };

    const actualizarProducto = async (req, res) => {
    try {
        const { categoria, titulo, descripcion, precio } = req.body;
        const productoId = req.params.id;

        if (!categoria || !titulo || !descripcion || !precio) {
        return res.status(400).json({ mensaje: "Faltan datos" });
        }

        const datosActualizados = { categoria, titulo, descripcion, precio };

        if (req.file) {
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        const resultado = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: 'cafelino' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
            );
            bufferStream.pipe(stream);
        });

        datosActualizados.imagen = resultado.secure_url;
        }

        await Producto.findByIdAndUpdate(productoId, datosActualizados);
        res.status(200).json({ mensaje: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ mensaje: "Error del servidor" });
    }
    };

    const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).lean();

        if (!producto) {
        const esPostman =
            req.headers["user-agent"] &&
            req.headers["user-agent"].includes("Postman");

        if (esPostman) {
            return res.status(404).json({ error: "Producto no encontrado" });
        } else {
            return res
            .status(404)
            .render("404", { mensaje: "Producto no encontrado" });
        }
        }

        const esPostman =
        req.headers["user-agent"] &&
        req.headers["user-agent"].includes("Postman");

        if (esPostman) {
        return res.status(200).json(producto);
        } else {
        return res.render("productoDetalle", { producto });
        }
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);

        const esPostman =
        req.headers["user-agent"] &&
        req.headers["user-agent"].includes("Postman");

        if (esPostman) {
        res.status(500).json({ error: "Error interno del servidor" });
        } else {
        res.status(500).render("500");
        }
    }
    };

    module.exports = {
    crearProducto,
    mostrarProductos,
    vistaFormularioProductos,
    eliminarProducto,
    actualizarProducto,
    obtenerProductoPorId,
    };
