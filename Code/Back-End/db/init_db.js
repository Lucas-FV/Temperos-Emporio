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

      await connection.execute('CREATE DATABASE IF NOT EXISTS tempero_emporio');
      console.log('✔ Banco de dados "tempero_emporio" garantido.');
      await connection.end();

      connection =  getConnection();
   }
}