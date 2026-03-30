// backend/routes/login.js (ou o caminho correto da sua rota de login)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usuario = require("../../models/Usuario"); // 👈 Importa o modelo do Mongoose

// Rota POST para login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email e senha são obrigatórios." });
  }

  try {
    // 1. Busca o usuário no MongoDB pelo email
    // O findOne retorna exatamente 1 documento (ou null se não achar)
    const user = await Usuario.findOne({ email: email });

    // 2. Se o usuário não existir
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email ou senha inválidos." });
    }

    // 3. Compara a senha digitada com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (isPasswordValid) {
      // 4. Sucesso! Retorna os dados do usuário
      return res.json({
        success: true,
        message: "Login realizado com sucesso!!",
        user: { 
            username: user.username, 
            email: user.email, 
            cargo: user.cargo 
        },
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
  }
  // Removemos o bloco 'finally' pois o Mongoose gerencia a conexão globalmente!
});

module.exports = router;