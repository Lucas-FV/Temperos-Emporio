const express = require("express");
const router = express.Router();
const { getConnection } = require("../../db/db");

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await getConnection();

    // Query SQL de Deleção
    const query = `DELETE FROM produtos WHERE id = ?`;

    const [result] = await connection.execute(query, [id]);

    // Verifica se algum registro foi afetado
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado para exclusão.",
      });
    }

    // Sucesso
    res.status(200).json({
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // Recebe todos os campos possíveis para atualização
  const { nome, descricao, preco, peso, categoria, prazo_validade } = req.body;

  // Validação básica
  if (!nome || !preco) {
    return res
      .status(400)
      .json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  let connection;
  try {
    connection = await getConnection();

    // Query SQL de Atualização
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
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado para atualização.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produto atualizado com sucesso!",
    });
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao atualizar produto.",
    });
  } finally {
    if (connection) await connection.end();
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; // Captura o ID da URL

  let connection;
  try {
    connection = await getConnection();

    // 1. Query SQL para buscar o produto pelo ID
    const query = `
            SELECT id, nome, descricao, preco, peso, categoria, prazo_validade 
            FROM produtos 
            WHERE id = ?
        `;

    const [rows] = await connection.execute(query, [id]);

    // 2. Verifica se o produto foi encontrado
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Produto não encontrado." });
    }

    // 3. Retorna os dados do produto
    res.status(200).json({
      success: true,
      produto: rows[0], // Retorna o primeiro (e único) resultado
    });
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor." });
  } finally {
    if (connection) await connection.end();
  }
});

router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    // Query SQL para selecionar todos os campos de todos os produtos
    const query =
      "SELECT id, nome, preco, peso, categoria FROM produtos ORDER BY nome ASC";

    const [rows] = await connection.execute(query);

    // Retorna a lista de produtos
    res.status(200).json({
      success: true,
      produtos: rows,
    });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao listar produtos.",
    });
  } finally {
    if (connection) await connection.end();
  }
});

router.post("/", async (req, res) => {
  const { nome, descricao, preco, peso, categoria, prazo_validade } = req.body;

  if (!nome || !preco) {
    return res
      .status(400)
      .json({ success: false, message: "Nome e preço são obrigatórios." });
  }

  let connection;

  try {
    connection = await getConnection();

    const query = ` 
         INSERT INTO produtos (nome, descricao, preco, peso, categoria, prazo_validade)
            VALUES (?, ?, ?, ?, ?, ?)
      `;

    const values = [nome, descricao, preco, peso, categoria, prazo_validade];

    const [result] = await connection.execute(query, values);

    res.status(201).json({
      success: true,
      message: "Produto cadastrado com sucesso!",
      produtoID: result.insertId,
    });
  } catch (error) {
    console.log("ERRO ao cadastrar produto:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao cadastrar produto.",
    });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
