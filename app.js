const express = require('express');
const pug = require('pug');
const app = express();
const sequelize = require('./config/db');
const pacienteRoutes = require('./route/pacienteRoutes');
const admisionRoutes = require('./route/admisionRoutes');
const habitacionRoutes = require('./route/habitacionRoutes');
const internacionRoutes = require('./route/internacionRoutes');
const enfermeriaRoutes = require('./route/enfermeriaRoutes');
const methodOverride = require('method-override');

require('./config/asociaciones');

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Middleware para soportar PUT y DELETE en formularios
app.use(methodOverride((req, res) => {
  const method = req.body && req.body._method;
  const allowed = ['PATCH', 'PUT'];
  if (method && allowed.includes(method.toUpperCase())) {
    return method;
  }})
)
//app.use(methodOverride('_method')); este no me funciona 

app.use('/pacientes', pacienteRoutes);

app.get('/',(req,res) => {
    
    res.render('index',{mainClass: 'fondo-hospital'});
});

app.use('/admision', admisionRoutes);


app.get('/personal-medico',(req, res) => {

    res.render('personal-medico', {mainClass: ''})
});

app.use('/personal-enfermeria', enfermeriaRoutes);

app.use('/internacion',internacionRoutes);

app.use('/habitacion',habitacionRoutes)
 
app.use('/enfermeria',enfermeriaRoutes);

app.use((req, res) => {
  res.status(404).render('error404');
});


app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});

/*sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada y actualizada correctamente.');
    app.listen(3000, () => {
        console.log('Servidor iniciado en el puerto 3000');
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });*/