const express = require('express');
const router = express.Router();
const { getConnection } = require('../../db/db');

router.post('/', async (req, res) => {
   const { nome, descricao, preco, peso, categoria, prazo_validade } = req.body;

   if(!nome || !preco){
      return res.status(400).json({success: false, message: 'Nome e preço são obrigatórios.'});
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
         message: 'Produto cadastrado com sucesso!',
         produtoID: result.insertId
      });
   } catch (error) {
      console.log('ERRO ao cadastrar produto:', error);
      res.status(500).json({ success: false, message: 'Erro interno do servidor ao cadastrar produto.' });
   } finally {
      if (connection) await connection.end();
   }
});

module.exports = router