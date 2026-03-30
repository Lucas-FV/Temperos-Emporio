require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
// 🚨 NOVO: Importa a função de conexão com o MongoDB
const connectDB = require('./db/db'); 

//Porta do Servidor
const PORT = 3000;

//Inicializa o Express
const app = express();

// 🚨 NOVO: Conecta ao banco de dados ANTES de qualquer coisa!
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Importacao dos arquivos de rotas
const loginRoutes = require('./routes/Login/login');
const produtosRoutes = require('./routes/Produtos/produtos');

// Servir imagens estáticas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//ROTA PRINCIPAL DE TESTE
app.get('/', (req, res) => {
   res.send('Servidor Node.js iniciado com sucesso!!')
})

//MONTAGEM DAS ROTAS
//Rota de login
app.use('/login', loginRoutes);

//Rota de Produtos
app.use('/produtos', produtosRoutes);

//INICIO DO SERVIDOR
app.listen(PORT, () =>{
   console.log(`Servidor rodando em: http://localhost:${PORT}`);
});