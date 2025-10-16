import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductRegisterPage.css";

const ProductRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    peso: "",
    categoria: "",
    prazo_validade: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Manipula a mudança em qualquer campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    // 🚨 1. Cria o objeto FormData para enviar texto e arquivo
    const formPayload = new FormData();

    // Anexa os campos de texto:
    formPayload.append("nome", formData.nome);
    formPayload.append("descricao", formData.descricao);
    // Garante que o preço seja enviado como string ou número (FormData trata)
    formPayload.append("preco", parseFloat(formData.preco) || 0);
    formPayload.append("peso", formData.peso);
    formPayload.append("categoria", formData.categoria);
    formPayload.append("prazo_validade", formData.prazo_validade);

    // 2. Anexa o arquivo (Campo 'imagem' deve bater com o Multer)
    if (selectedFile) {
      formPayload.append("imagem", selectedFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/produtos",
        formPayload, // 🚨 ENVIA O FORM DATA
        {
          // 🚨 Cabeçalho para informar o servidor sobre o tipo de dado
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("✅ Produto cadastrado com sucesso!");
        setIsError(false);

        // 3. Limpa o formulário e o estado do arquivo após o sucesso
        setFormData({
          nome: "",
          descricao: "",
          preco: "",
          peso: "",
          categoria: "",
          prazo_validade: "",
        });
        setSelectedFile(null); // Limpa o estado do arquivo

        // Opcional: Redirecionar após um breve sucesso
        setTimeout(() => {
          navigate("/admin/produtos");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      // Trata erros de validação do backend ou de servidor
      const msg =
        error.response?.data?.message ||
        "Erro ao conectar com o servidor. Verifique os dados.";
      setMessage(`❌ ${msg}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-view">
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Cadastrar Novo Produto</h1>
          <p className="admin-subtitle">
            Insira as informações do novo item para o estoque.
          </p>
        </div>
      </header>

      <main className="register-main">
        <div className="register-card">
          {/* Mensagem de Feedback */}
          {message && (
            <p className={`feedback-message ${isError ? "error" : "success"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="product-form">
            {/* Campo Nome */}
            <div className="form-group">
              <label htmlFor="nome">Nome do Produto</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Preço */}
            <div className="form-group">
              <label htmlFor="preco">Preço (R$)</label>
              <input
                type="number"
                id="preco"
                name="preco"
                step="0.01"
                value={formData.preco}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Peso/Volume */}
            <div className="form-group">
              <label htmlFor="peso">Peso/Volume (Ex: 250g)</label>
              <input
                type="text"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
              />
            </div>

            {/* Campo Prazo de Validade */}
            <div className="form-group">
              <label htmlFor="prazo_validade">
                Prazo de Validade (Ex: 3 meses)
              </label>
              <input
                type="text" // Tipo text para inserir a string "3 meses"
                id="prazo_validade"
                name="prazo_validade"
                value={formData.prazo_validade}
                onChange={handleChange}
              />
            </div>

            {/* Campo Categoria */}
            <div className="form-group">
              <label htmlFor="categoria">Categoria</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione a Categoria</option>
                <option value="Geleia">Geleia</option>
                <option value="Queijo">Queijo</option>
                <option value="Pao">Pão</option>
                <option value="Conservas">Conservas</option>
              </select>
            </div>

            {/* Campo Descrição */}
            <div className="form-group full-width">
              <label htmlFor="descricao">Descrição Detalhada</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label htmlFor="imagem">Imagem do Produto</label>
              <input
                type="file"
                id="imagem"
                name="imagem" // Deve ser 'imagem' para Multer
                onChange={handleFileChange}
                accept="image/*" // Permite apenas arquivos de imagem
              />
              {selectedFile && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#666",
                    marginTop: "5px",
                  }}
                >
                  Arquivo selecionado: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Salvar Produto"}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/admin/produtos")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductRegisterPage;
