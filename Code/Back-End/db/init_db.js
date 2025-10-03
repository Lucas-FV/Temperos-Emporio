const mysql = require('mysql2/promise');
const {getConnection} = require ('./db');

//Array com os funcionarios
const usuarios = [
   {
      username: 'Lucas Vilela',
      email: 'lucasvilelapessoal@gmail.com',
      password_hash: 'vicolucas',
      cargo: 'Admin'
   }
];

const TEMP_DB_CONFIG = {
   host: 'localhost',
   user: 'root',
   password: '1234'
};

async function initDatabase() {
   let connection;
   try{
      //Conexao temporaria
      connection = await mysql.createConnection(TEMP_DB_CONFIG);

      await connection.execute('CREATE DATABASE IF NOT EXISTS temperos_emporio');
      console.log('✔ Banco de dados "temperos_emporio" garantido.');
      await connection.end();

      connection = await getConnection();

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
      console.log('✔ Tabela "usuarios" garantida.');

      for(const user of usuarios){
         const [rows] = await connection.execute(
            'SELECT COUNT (*) AS count FROM usuarios WHERE username = ?', [user.username]
         );

         if (rows[0].count === 0){
            await connection.execute(
               'INSERT INTO usuarios (username, email, password_hash, cargo) VALUES (?, ?, ?, ?)',
               [
                  user.username,
                  user.email,
                  user.password_hash,
                  user.cargo
               ]
            );
            console.log(`✔ Usuário padrão (${user.username}) inserido com sucesso.`);
         } else {
            console.log(`ℹ Usuário padrão (${user.username}) já existe.`);
         }
      }
   } catch (error) {
      console.error('❌ Erro FATAL na inicialização do banco de dados:', error.message);
      process.exit(1);
   } finally {
      if (connection) {
         await connection.end();
      }
   }
}

initDatabase();