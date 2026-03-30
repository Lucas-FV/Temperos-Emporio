const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload"); // Nosso middleware agora com Cloudinary
const Produto = require("../../models/Produto"); // Model do MongoDB

// ==========================================
// Rota DELETE (Remover Produto)
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);

    if (!produto) {
      return res.status(404).json({ success: false, message: "Produto não encontrado para exclusão." });
    }

    res.status(200).json({ success: true, message: "Produto deletado com sucesso!", produtoId: req.params.id });
  } catch (error) {
    console.error(`Erro ao deletar produto ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "ID inválido ou erro interno do servidor." });
  }
});

// ==========================================
// Rota PUT (Atualizar Produto)
// ==========================================
router.put("/:id", async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!produtoAtualizado) {
      return res.status(404).json({ success: false, message: "Produto não encontrado para atualização." });
    }

    res.status(200).json({ success: true, message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error(`Erro ao atualizar produto ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "ID inválido ou erro interno do servidor." });
  }
});

// ==========================================
// ROTA GET /:id (Buscar um produto específico)
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }

    // Convertendo para objeto puro e criando a propriedade 'id' para o Front-End não quebrar
    const produtoFormatado = produto.toObject();
    produtoFormatado.id = produtoFormatado._id;

    res.status(200).json({ success: true, produto: produtoFormatado });
  } catch (error) {
    console.error(`Erro ao buscar produto ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "ID inválido ou erro interno do servidor." });
  }
});

// ==========================================
// Rota GET / (Listar todos os produtos)
// ==========================================
router.get("/", async (req, res) => {
  try {
    // Adicionamos o 'imagem_url' no select para que a imagem apareça na listagem do Front-End!
    const produtos = await Produto.find()
      .select('nome preco peso categoria imagem_url') 
      .sort({ nome: 1 });

    const produtosFormatados = produtos.map(p => ({
      id: p._id,
      nome: p.nome,
      preco: p.preco,
      peso: p.peso,
      categoria: p.categoria,
      imagem_url: p.imagem_url // Repassando a URL da imagem para o frontend
    }));

    res.status(200).json({ success: true, produtos: produtosFormatados });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor ao listar produtos." });
  }
});

// ==========================================
// Rota POST (Cadastrar Novo Produto)
// ==========================================
router.post("/", upload.single("imagem"), async (req, res) => {
  const { nome, descricao, preco, peso, categoria, prazo_validade } = req.body;
  
  // 🚨 AQUI ESTÁ A MÁGICA DO CLOUDINARY:
  // req.file.path agora contém a URL completa da imagem hospedada na nuvem!
  const imagemPath = req.file ? req.file.path : null;

  if (!nome || !preco) {
    return res.status(400).json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  try {
    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      peso,
      categoria,
      prazo_validade,
      imagem_url: imagemPath // Salvando o link direto no MongoDB
    });

    res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso!",
      produtoId: novoProduto._id, 
      imagemUrl: imagemPath,
    });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

module.exports = router;