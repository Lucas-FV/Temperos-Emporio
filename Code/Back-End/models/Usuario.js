// back-end/models/Usuario.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    cargo: { type: String, default: 'funcionario' },
    data_cadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);