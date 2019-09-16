var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        //CREAR TOKEN
        usuarioDB.password = '*****';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 3600 });

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB.id,
            menu: obtenerMenu(usuarioDB.role)
        });
    });


});


function obtenerMenu(ROLE) {

    var menu = [{
            titulo: 'Estaciones',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Estacion1', url: '/graficas1' },
                { titulo: 'Promesas', url: '/promesas' },
                { titulo: 'Rxjs', url: '/rxjs' },
            ]
        },
        {
            titulo: 'Mapa',
            icono: 'mdi mdi-map',
            url: '/map'
        },
        // {
        //     titulo: 'Administración',
        //     icono: 'mdi mdi-folder-lock-open',
        //     submenu: [
        //         { titulo: 'Usuarios', url: '/usuarios' },
        //         //  { titulo: 'Estaciones', url: '/estaciones' }
        //     ]
        // },
    ];

    if (ROLE === 'ADMIN_ROLE') {
        menu.unshift({
            titulo: 'Administración',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Usuarios', url: '/usuarios' },
                { titulo: 'Estaciones', url: '/estaciones' }
            ]
        });
    }

    return menu;
}



module.exports = app;