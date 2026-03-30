// backend/middleware/upload.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 1. Configuração do Cloudinary usando as chaves do seu .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configuração do Armazenamento na Nuvem
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "temperos_emporio_produtos", // Nome da pasta que será criada lá no Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Aceita webp tranquilamente
    // transformation: [{ width: 800, height: 800, crop: "limit" }] // Opcional: já redimensiona a imagem pra você
  },
});

// 3. Inicializa o Multer com o novo storage
const upload = multer({ storage: storage });

module.exports = upload;