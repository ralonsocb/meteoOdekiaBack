// Requires
var express = require('express');
var mongoose = require('mongoose');


//Inicialización
var app = express();

//Conexion BD
mongoose.connection.openUri('mongodb://localhost:27017/weatherDB', (err, res) => {

    if (err) throw err;

    console.log('BD corriendo en el puerto 27017: \x1b[32m%s\x1b[0m', 'Online');



});


//Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});


// Escucha de peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'Online');
});