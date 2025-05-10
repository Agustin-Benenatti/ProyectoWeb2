const express = require('express');
const pug = require('pug');
const app = express();
const pacienteRoutes = require('./route/pacienteRoutes');

require('./config/asociaciones');

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('public'));

app.use('/pacientes', pacienteRoutes);

app.get('/',(req,res) => {
    
    res.render('index',{mainClass: 'fondo-hospital'});
});



app.get('/personal-medico',(req, res) => {

    res.render('personal-medico', {mainClass: ''})
});

app.get('/personal-enfermeria', (req, res) => {

    res.render('personal-enfermeria', {mainClass: ''})
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
    
});