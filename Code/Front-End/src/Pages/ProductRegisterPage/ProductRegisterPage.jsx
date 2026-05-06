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
    destaque: false, // 🚨 NOVO: Estado para o destaque
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Manipula a mudança em campos de texto e select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manipula o arquivo de imagem
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Manipula o clique no botão Switch (Toggle)
  const handleToggleDestaque = () => {
    setFormData((prev) => ({ ...prev, destaque: !prev.destaque }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setLoading(true);

    const formPayload = new FormData();

    // Anexa os campos de texto e o booleano de destaque
    formPayload.append("nome", formData.nome);
    formPayload.append("descricao", formData.descricao);
    formPayload.append("preco", parseFloat(formData.preco) || 0);
    formPayload.append("peso", formData.peso);
    formPayload.append("categoria", formData.categoria);
    formPayload.append("prazo_validade", formData.prazo_validade);
    formPayload.append("destaque", formData.destaque); // 🚨 ENVIA O DESTAQUE

    if (selectedFile) {
      formPayload.append("imagem", selectedFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/produtos",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("✅ Produto cadastrado com sucesso!");
        setIsError(false);

        // Limpa o formulário
        setFormData({
          nome: "",
          descricao: "",
          preco: "",
          peso: "",
          categoria: "",
          prazo_validade: "",
          destaque: false,
        });
        setSelectedFile(null);

        setTimeout(() => {
          navigate("/admin/produtos");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      // Aqui o erro de "Limite de 5 produtos" vindo do backend será exibido
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
          {message && (
            <div className={`notification-container ${isError ? "error" : "success"}`}>
               <p>{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="product-form">
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

            <div className="form-group">
              <label htmlFor="prazo_validade">Prazo de Validade</label>
              <input
                type="text"
                id="prazo_validade"
                name="prazo_validade"
                value={formData.prazo_validade}
                onChange={handleChange}
              />
            </div>

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

            <div className="form-group full-width">
              <label htmlFor="descricao">Descrição Detalhada</label>
              <textarea
                id="descricao"
                name="descricao"
                rows="3"
                value={formData.descricao}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* 🚨 NOVO: CAMPO DE DESTAQUE (SWITCH/TOGGLE) */}
            <div className="form-group full-width">
              <label>Produto em Destaque (Aparece na página inicial - Máx 5)</label>
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.destaque}
                    onChange={handleToggleDestaque}
                  />
                  <span className="slider"></span>
                </label>
                <span className="toggle-label-text">
                  {formData.destaque ? "Sim (Ativado)" : "Não (Desativado)"}
                </span>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="imagem">Imagem do Produto</label>
              <input
                type="file"
                id="imagem"
                name="imagem"
                onChange={handleFileChange}
                accept="image/*"
              />
              {selectedFile && (
                <p className="file-selected-text">
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