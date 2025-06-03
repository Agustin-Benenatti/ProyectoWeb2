const express = require('express');
const pug = require('pug');
const app = express();
const pacienteRoutes = require('./route/pacienteRoutes');
const admisionRoutes = require('./route/admisionRoutes');
const habitacionRoutes = require('./route/habitacionRoutes');
const internacionRoutes = require('./route/internacionRoutes');
const methodOverride = require('method-override');

require('./config/asociaciones');

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Middleware para soportar PUT y DELETE en formularios
app.use(methodOverride('_method'));

app.use('/pacientes', pacienteRoutes);

app.get('/',(req,res) => {
    
    res.render('index',{mainClass: 'fondo-hospital'});
});

app.use('/admision', admisionRoutes);


app.get('/personal-medico',(req, res) => {

    res.render('personal-medico', {mainClass: ''})
});

app.get('/personal-enfermeria', (req, res) => {

    res.render('personal-enfermeria', {mainClass: ''})
});

app.use('/internacion',internacionRoutes);

app.use('/habitacion',habitacionRoutes)

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
    
});