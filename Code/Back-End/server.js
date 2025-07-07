// TEMPEROS-EMPORIO/Code/Back-End/server.js
const http = require('http'); // Módulo HTTP para criar o servidor
const url = require('url');   // Módulo URL para parsear URLs de requisições

const port = process.env.PORT || 3001; // A API vai rodar na porta 3001 por padrão

// --- Dados Simulados (substituirá o DB no futuro) ---
const products = [
  { id: 1, name: 'Páprica Defumada', price: 12.50, category: 'Temperos' },
  { id: 2, name: 'Mix de Ervas Finas', price: 9.90, category: 'Temperos' },
  { id: 3, name: 'Azeite Extra Virgem Orgânico', price: 45.00, category: 'Azeites' },
  { id: 4, name: 'Mel Silvestre Puro', price: 32.00, category: 'Doces' },
];

// --- Função para lidar com o CORS ---
// Node.js puro exige que você lide com os cabeçalhos CORS manualmente
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite requisições de qualquer origem (seu frontend)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
}

// --- Cria o Servidor HTTP ---
const server = http.createServer((req, res) => {
  setCorsHeaders(res); // Define os cabeçalhos CORS para cada resposta

  // Lida com requisições OPTIONS (pré-voo do CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // Status 204 No Content para OPTIONS bem-sucedido
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true); // Parseia a URL da requisição
  const pathname = parsedUrl.pathname;        // Obtém o caminho da URL (ex: /api/products)
  const method = req.method;                  // Obtém o método HTTP (GET, POST, etc.)

  res.setHeader('Content-Type', 'application/json'); // Define o tipo de conteúdo da resposta como JSON

  // --- Rotas ---
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200); // Status OK
    res.end(JSON.stringify({ message: 'API do Empório Temperos Gourmet está funcionando! 🎉' }));
  } else if (pathname === '/api/products' && method === 'GET') {
    res.writeHead(200); // Status OK
    res.end(JSON.stringify(products)); // Envia os produtos como JSON
  } else if (pathname.startsWith('/api/products/') && method === 'GET') {
    // Exemplo de rota para um produto específico (ainda sem DB)
    const id = parseInt(pathname.split('/')[3]); // Pega o ID da URL
    const product = products.find(p => p.id === id);
    if (product) {
      res.writeHead(200);
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404); // Not Found
      res.end(JSON.stringify({ message: 'Produto não encontrado.' }));
    }
  }
  else {
    res.writeHead(404); // Not Found para rotas não definidas
    res.end(JSON.stringify({ message: 'Rota não encontrada.' }));
  }
});

// --- Inicia o Servidor ---
server.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
  console.log('Pressione Ctrl+C para parar o servidor.');
});