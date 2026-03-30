const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Conecta ao MongoDB local. Se o banco 'temperos_emporio' não existir, ele cria na hora.
        await mongoose.connect('mongodb://localhost:27017/temperos_emporio');
        console.log('✅ MongoDB Conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Para o servidor se não conseguir conectar
    }
};

module.exports = connectDB;