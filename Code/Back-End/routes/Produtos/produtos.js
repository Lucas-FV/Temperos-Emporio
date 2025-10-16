const express = require("express");
const router = express.Router();
const { getConnection } = require("../../db/db");
// Certifique-se de que o upload está sendo importado corretamente
const upload = require("../../middleware/upload");
const fs = require("fs"); // Módulo nativo para deletar arquivos (usado no POST)

// Rota DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await getConnection();

    const query = `DELETE FROM produtos WHERE id = ?`;

    const [result] = await connection.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Produto não encontrado para exclusão.",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Produto deletado com sucesso!",
        produtoId: id,
      });
  } catch (error) {
    console.error(`Erro ao deletar produto ${id}:`, error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro interno do servidor ao deletar produto.",
      });
  } finally {
    if (connection) await connection.end();
  }
});

// Rota PUT (Atualizar)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // Recebe todos os campos
  const { nome, descricao, preco, peso, categoria, prazo_validade } = req.body;

  if (!nome || !preco) {
    return res
      .status(400)
      .json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  let connection;
  try {
    connection = await getConnection();

    // Query SQL de Atualização - Limpa
    const query = `
            UPDATE produtos 
            SET nome = ?, descricao = ?, preco = ?, peso = ?, categoria = ?, prazo_validade = ?
            WHERE id = ?
        `;

    const values = [
      nome,
      descricao,
      preco,
      peso,
      categoria,
      prazo_validade,
      id,
    ];
    const [result] = await connection.execute(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Produto não encontrado para atualização.",
        });
    }

    res
      .status(200)
      .json({ success: true, message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro interno do servidor ao atualizar produto.",
      });
  } finally {
    if (connection) await connection.end();
  }
});

// 🚨 ROTA GET /:id (CORRIGIDA)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await getConnection();

    // Query SQL para buscar o produto pelo ID - LIMPA EM UMA LINHA
    const query =
      "SELECT id, nome, descricao, preco, peso, categoria, prazo_validade, imagem_url FROM produtos WHERE id = ?";

    const [rows] = await connection.execute(query, [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    res.status(200).json({ success: true, produto: rows[0] });
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor." });
  } finally {
    if (connection) await connection.end();
  }
});

// Rota GET / (Listar todos)
router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    // Query SQL para listar produtos - Limpa
    const query =
      "SELECT id, nome, preco, peso, categoria FROM produtos ORDER BY nome ASC";

    const [rows] = await connection.execute(query);

    res.status(200).json({ success: true, produtos: rows });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro interno do servidor ao listar produtos.",
      });
  } finally {
    if (connection) await connection.end();
  }
});

// Rota POST (Cadastrar)
router.post("/", upload.single("imagem"), async (req, res) => {
  const { nome, descricao, preco, peso, categoria, prazo_validade } = req.body;
  const imagemPath = req.file ? req.file.filename : null;

  if (!nome || !preco) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res
      .status(400)
      .json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  let connection;
  try {
    connection = await getConnection();

    // Query SQL de Inserção - Limpa
    const query = `
            INSERT INTO produtos (nome, descricao, preco, peso, categoria, prazo_validade, imagem_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    const values = [
      nome,
      descricao,
      preco,
      peso,
      categoria,
      prazo_validade,
      imagemPath,
    ];

    const [result] = await connection.execute(query, values);

    res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso!",
      produtoId: result.insertId,
      imagemUrl: imagemPath,
    });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor." });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
