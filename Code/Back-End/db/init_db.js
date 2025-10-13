const mysql = require("mysql2/promise");
const { getConnection } = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 15;

// 🚨 CORREÇÃO: Usando 'rawPassword' para a senha em texto puro
const usuarios = [
  {
    username: "Lucas Vilela",
    email: "lucasvilelapessoal@gmail.com",
    rawPassword: "vicolucas",
    cargo: "Admin",
  },
];

const TEMP_DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "1234",
};

async function initDatabase() {
  let connection;
  try {
    // --- 1. CONEXÃO TEMPORÁRIA E CRIAÇÃO DO DB ---
    connection = await mysql.createConnection(TEMP_DB_CONFIG); // 🚨 CORRIGIDO: Nome do banco para 'tempero_emporio' (sem S)

    await connection.execute("CREATE DATABASE IF NOT EXISTS temperos_emporio");
    console.log('✔ Banco de dados "temperos_emporio" garantido.');
    await connection.end(); // --- 2. CONEXÃO AO DB PRINCIPAL E CRIAÇÃO DA TABELA ---

    connection = await getConnection();

    await connection.execute(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10, 2) NOT NULL,
      peso VARCHAR(50),
      prazo_validade VARCHAR(50),
      categoria VARCHAR (50)
    )
`);
console.log('✔ Tabela "produtos" garantida.');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) NOT NULL UNIQUE,
         email VARCHAR(100) NOT NULL UNIQUE,
         password_hash VARCHAR(255) NOT NULL,
         cargo VARCHAR(50) DEFAULT 'funcionario',
         data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
   `);
    console.log('✔ Tabela "usuarios" garantida.'); // --- 3. INSERÇÃO DOS USUÁRIOS PADRÃO (COM HASH) ---

    for (const user of usuarios) {
      // 🚨 CORRIGIDO: Usa 'rawPassword' para gerar o hash
      const password_hash = await bcrypt.hash(user.rawPassword, saltRounds);

      const [rows] = await connection.execute(
        "SELECT COUNT(*) AS count FROM usuarios WHERE username = ?",
        [user.username]
      );

      if (rows[0].count === 0) {
        await connection.execute(
          "INSERT INTO usuarios (username, email, password_hash, cargo) VALUES (?, ?, ?, ?)",
          [
            user.username,
            user.email,
            password_hash, // 👈 Insere o HASH gerado
            user.cargo,
          ]
        );
        console.log(
          `✔ Usuário padrão (${user.username}) inserido com sucesso.`
        );
      } else {
        console.log(`ℹ Usuário padrão (${user.username}) já existe.`);
      }
    }
  } catch (error) {
    // Se o erro for na conexão, o processo é encerrado
    console.error(
      "❌ Erro FATAL na inicialização do banco de dados:",
      error.message
    );
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();
