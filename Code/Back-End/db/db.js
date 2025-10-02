const mysql = require('mysql2/promise');

const dbConfig = {
   host: 'localhost',
   user: 'root',
   password: 'SQL.2917',
   database: 'temperos_emporio'
};

async function getConnection() {
   return await mysql.createConnection(dbConfig);
}

module.exports = {
   getConnection
};