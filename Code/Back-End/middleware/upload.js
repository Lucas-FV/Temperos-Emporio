// backend/middleware/upload.js

const multer = require("multer");
const path = require("path");

// 1. Configuração de Armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Onde os arquivos serão salvos (a pasta 'uploads' na raiz do backend)
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    // Cria um nome de arquivo único para evitar colisões
    // Formato: timestamp_nomeoriginal.extensao
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// 2. Filtro de Arquivos (Opcional: Garante que apenas imagens sejam aceitas)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new Error("Tipo de arquivo inválido. Apenas imagens são permitidas."),
      false
    );
  }
};

// 3. Inicializa o Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limita o tamanho do arquivo a 5MB
  },
});

// Exporta o middleware configurado para uso na rota
module.exports = upload;
