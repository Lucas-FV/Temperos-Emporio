const express = require('express');
const cors = require('cors');

//Porta do Servidor
const PORT = 3000;

//Inicializa o Express
const app = express();

//Importacao dos arquivos de rotas
const loginRouts = require('./routes/Login/login')

//Middleware: Inicializa o CORS
app.use(express.json());

//ROTA PRINCIPAL DE TESTE
app.get('/', (req, res) => {
   res.send('Servidor Node.js iniciado com sucesso!!')
})

//MONTAGEM DAS ROTAS
//Rota de login
app.use('/login', loginRouts);

//INICIO DO SERVIDOR
app.listen(PORT, () =>{
   console.log(`Servidor rodando em, http://localhost:${PORT}`);
});