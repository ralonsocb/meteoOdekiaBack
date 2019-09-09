var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estacionSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El usuario es necesario'] },
}, { collection: 'estaciones' });

module.exports = mongoose.model('Estacion', estacionSchema);