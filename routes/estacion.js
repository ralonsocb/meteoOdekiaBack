var express = require('express');


var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Estacion = require('../models/estacion');

//===========================================================
//Devolvemos un listado de estaciones, sin el campo password
//===========================================================
app.get('/', (req, res, next) => {

    Estacion.find({})
        .populate('usuario', 'nombre email')
        .exec(
            (err, estaciones) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando estaciones',
                        errors: err
                    });
                }

                Estacion.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        estaciones: estaciones,
                        total: conteo
                    });


                });
            });
});


//===========================================================
//Obtener una Estacion
//===========================================================
app.get('/:id', (req, res) => {

    var id = req.params.id;
    Estacion.findById(id)
        .exec((err, estacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar al Estacion',
                    errors: err
                });
            }

            if (!estacion) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe la estacion',
                    errors: { message: 'No existe estacion' }
                });
            }

            res.status(200).json({
                ok: true,
                estacion: estacion
            });

        });
});

//===========================================================
//Actualizar un Estacion
//===========================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Estacion.findById(id, (err, estacion) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar al Estacion',
                errors: err
            });
        }

        if (!estacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe la estacion',
                errors: { message: 'No existe estacion' }
            });
        }

        estacion.nombre = body.nombre;
        estacion.usuario = req.usuario._id;

        estacion.save((err, estacionGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la Estacion',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                estacion: estacionGuardado
            });
        })
    });
})

//===========================================================
//Crear una estacion
//===========================================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var estacion = new Estacion({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    estacion.save((err, estacionGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Estacion',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            estacion: estacionGuardado,
            estacionToken: req.estacion
        });

    });

});

//===========================================================
//Eliminar una estacion
//===========================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Estacion.findByIdAndRemove(id, (err, estacionBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Estacion',
                errors: err
            });
        }

        if (!estacionBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No existe una Estacion con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            estacion: estacionBorrado
        });

    });
});



module.exports = app;