// backend/db/init_db.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario"); // Importa o modelo que acabamos de criar

const saltRounds = 15;

const usuarios = [
  {
    username: "Lucas Vilela",
    email: "lucasvilelapessoal@gmail.com",
    rawPassword: "vicolucas",
    cargo: "Admin",
  },
];

async function initDatabase() {
  try {
    // 1. Conecta diretamente ao MongoDB
    await mongoose.connect('mongodb://localhost:27017/temperos_emporio');
    console.log('✔ Conectado ao MongoDB para inicialização.');

    // 2. Inserção do Usuário Padrão (com Hash)
    for (const user of usuarios) {
      // O Mongoose usa findOne para buscar se o usuário já existe
      const userExists = await Usuario.findOne({ username: user.username });

      if (!userExists) {
        // Gera o Hash da senha
        const password_hash = await bcrypt.hash(user.rawPassword, saltRounds);

        // Cria o usuário no banco
        await Usuario.create({
          username: user.username,
          email: user.email,
          password_hash: password_hash,
          cargo: user.cargo
        });

        console.log(`✔ Usuário padrão (${user.username}) inserido com sucesso.`);
      } else {
        console.log(`ℹ Usuário padrão (${user.username}) já existe.`);
      }
    }
  } catch (error) {
    console.error("❌ Erro FATAL na inicialização do banco de dados:", error.message);
    process.exit(1);
  } finally {
    // Encerra a conexão para o script terminar de rodar no terminal
    await mongoose.disconnect();
    console.log('✔ Desconectado. Inicialização concluída.');
  }
}

initDatabase();