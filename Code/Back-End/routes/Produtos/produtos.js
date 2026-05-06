const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const Produto = require("../../models/Produto");

// ==========================================
// Rota DELETE
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }
    res.status(200).json({ success: true, message: "Produto deletado com sucesso!", produtoId: req.params.id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

// ==========================================
// 🚨 Rota PUT (Atualizar Produto - Agora suporta Imagem e Destaque!)
// ==========================================
router.put("/:id", upload.single("imagem"), async (req, res) => {
  const { nome, preco, destaque } = req.body;
  const isDestaque = destaque === 'true' || destaque === true; // Converte para booleano

  if (!nome || !preco) {
    return res.status(400).json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  try {
    // TRAVA DO DESTAQUE: Verifica se já existem 5 destaques (excluindo o próprio produto que estamos editando)
    if (isDestaque) {
      const qtdDestaques = await Produto.countDocuments({ destaque: true, _id: { $ne: req.params.id } });
      if (qtdDestaques >= 5) {
        return res.status(400).json({ success: false, message: "Limite máximo de 5 produtos em destaque atingido." });
      }
    }

    // Prepara os dados novos
    const dadosAtualizacao = { ...req.body, destaque: isDestaque };

    // Se o usuário mandou uma imagem nova, atualiza o link
    if (req.file) {
      dadosAtualizacao.imagem_url = req.file.path;
    }

    const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, dadosAtualizacao, { new: true });

    if (!produtoAtualizado) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({ 
      success: true, 
      message: "Produto atualizado com sucesso!",
      imagemUrl: produtoAtualizado.imagem_url // Devolve a imagem atualizada pro frontend
    });
  } catch (error) {
    console.error(`Erro ao atualizar produto:`, error);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

// ==========================================
// ROTA GET /:id (Buscar um)
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }

    const produtoFormatado = produto.toObject();
    produtoFormatado.id = produtoFormatado._id;

    res.status(200).json({ success: true, produto: produtoFormatado });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

// ==========================================
// Rota GET / (Listar todos)
// ==========================================
router.get("/", async (req, res) => {
  try {
    // Trazemos o campo 'destaque' para o Front-End saber quem é quem
    const produtos = await Produto.find()
      .select('nome preco peso categoria imagem_url destaque') 
      .sort({ nome: 1 });

    const produtosFormatados = produtos.map(p => ({
      id: p._id,
      nome: p.nome,
      preco: p.preco,
      peso: p.peso,
      categoria: p.categoria,
      imagem_url: p.imagem_url,
      destaque: p.destaque 
    }));

    res.status(200).json({ success: true, produtos: produtosFormatados });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro interno." });
  }
});

// ==========================================
// 🚨 Rota POST (Cadastrar Novo Produto)
// ==========================================
router.post("/", upload.single("imagem"), async (req, res) => {
  const { nome, descricao, preco, peso, categoria, prazo_validade, destaque } = req.body;
  const imagemPath = req.file ? req.file.path : null;
  const isDestaque = destaque === 'true' || destaque === true;

  if (!nome || !preco) {
    return res.status(400).json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  try {
    if (isDestaque) {
      const qtdDestaques = await Produto.countDocuments({ destaque: true });
      if (qtdDestaques >= 5) {
        return res.status(400).json({ success: false, message: "Limite máximo de 5 produtos em destaque atingido." });
      }
    }

    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      peso,
      categoria,
      prazo_validade,
      imagem_url: imagemPath,
      destaque: isDestaque
    });

    res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso!",
      produtoId: novoProduto._id, 
      imagemUrl: imagemPath,
    });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
});

module.exports = router;