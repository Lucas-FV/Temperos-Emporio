const express = require("express");
const { getConnection } = require("../../db/db");
const router = express.Router();
const bcrypt = require("bcrypt"); // 👈 Importa o bcrypt

// Rota POST para login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email e senha são obrigatórios." });
  }

  let connection;
  try {
    connection = await getConnection();

    // Consulta SQL (continua a mesma)
    const [rows] = await connection.execute(
      "SELECT username, password_hash, email, cargo FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      // Usamos a mesma mensagem de erro para que o atacante não saiba se o erro foi no email ou na senha
      return res
        .status(401)
        .json({ success: false, message: "Email ou senha inválidos." });
    }

    const user = rows[0];

    // 🚨 MUDANÇA CRÍTICA: Compara a senha com o hash no banco
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (isPasswordValid) {
      return res.json({
        success: true,
        message: "Login realizado com sucesso!!",
        user: { username: user.username, email: user.email, cargo: user.cargo },
      });
    } else {
      // Senha inválida
      return res
        .status(401)
        .json({ success: false, message: "Email ou senha inválidos." });
    }
  } catch (error) {
    console.error("Erro de Servidor/DB: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

module.exports = router;
