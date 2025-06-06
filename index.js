require('dotenv').config();
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch((error) => console.error('🔴 Error al conectar a MongoDB:', error));

app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const mainRoutes = require('./routes/mainRoutes');
const productosRoutes = require('./routes/productosRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

app.use('/', mainRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

app.get('/productos', (req, res) => {
  res.redirect('/api/productos');
});

app.use((req, res, next) => {
  res.status(404).render('404', { layout: 'main' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { layout: 'main' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log('Servidor cargado correctamente');
});
