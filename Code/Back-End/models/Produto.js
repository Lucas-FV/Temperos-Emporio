// Back-End/models/Produto.js
const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    preco: { type: Number, required: true },
    peso: { type: String },
    categoria: { type: String },
    prazo_validade: { type: String },
    imagem_url: { type: String }, // É aqui que vamos guardar o caminho da imagem!
    data_cadastro: { type: Date, default: Date.now }
});

// Exporta o modelo para podermos usar lá no produtos.js
module.exports = mongoose.model('Produto', ProdutoSchema);