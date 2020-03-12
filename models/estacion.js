var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estacionSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    temperatura: { type: Number},
    precipitaciones: { type: Number},
    humedad: { type: Number},
    velViento: { type: Number},
    dirViento: { type: Number},
    brillo: { type: Number},
    uv: {type: Number},
    presion: {type: Number},
    posSol: {type: Number},
    radiacion: {type: Number},
}, { collection: 'estaciones' });

module.exports = mongoose.model('Estacion', estacionSchema);