var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estacionSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
}, { collection: 'estaciones' });

module.exports = mongoose.model('Estacion', estacionSchema);