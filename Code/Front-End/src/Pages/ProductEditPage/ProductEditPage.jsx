import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductEditPage.css";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Estados para a busca e exibição (Produto original/salvo)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Estados para o formulário e submissão (Dados que o usuário está digitando)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    peso: "",
    categoria: "",
    prazo_validade: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Estado para o botão Salvar

  // --- LÓGICA DE BUSCA DO PRODUTO (GET) ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/produtos/${id}`
        );

        if (response.data.success && response.data.produto) {
          const data = response.data.produto;

          // Preenche o estado do produto (para exibição)
          setProduct(data);

          // Preenche o estado do formulário (para edição)
          setFormData({
            nome: data.nome || "",
            descricao: data.descricao || "",
            // Garante que o preço seja tratado como string para o input
            preco: String(data.preco) || "",
            peso: data.peso || "",
            categoria: data.categoria || "",
            prazo_validade: data.prazo_validade || "",
          });
        } else {
          setError("Produto não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Erro de conexão ou servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Manipula a mudança em qualquer campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- LÓGICA DE SUBMISSÃO DA EDIÇÃO (PUT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsSaving(true); // Inicia o loading

    const payload = {
      ...formData,
      // Garante que o preço seja enviado como número (float)
      preco: parseFloat(formData.preco) || 0,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/produtos/${id}`,
        payload
      );

      if (response.status === 200) {
        setMessage("✅ Produto atualizado com sucesso!");
        setIsError(false);

        // 🚨 CORREÇÃO CRÍTICA: Atualiza o estado 'product' com os NOVOS dados do formulário
        setProduct(payload);

        // Opcional: Redirecionar para a lista após a edição
        setTimeout(() => {
          navigate("/admin/produtos");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro na edição:", error);
      const msg =
        error.response?.data?.message ||
        "Erro ao conectar com o servidor. Verifique os dados.";
      setMessage(`❌ ${msg}`);
      setIsError(true);
    } finally {
      setIsSaving(false); // Desativa o loading
    }
  };

  // --- RENDERIZAÇÃO DE ESTADOS ---
  if (loading) {
    return <div className="loading-message">Carregando produto...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return (
      <div className="error-message">Produto não existe ou foi removido.</div>
    );
  }

  // --- RENDERIZAÇÃO DA PÁGINA ---
  return (
    <div className="edit-page-view">
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Edição de Produto</h1>
          <p className="admin-subtitle">Edite o produto escolhido</p>
        </div>
      </header>

      <main className="edit-main">
        {/* 🚨 ÚNICA MENSAGEM: A notificação fixa (que estilizamos no CSS) */}
        {message && (
          <div
            className={`notification-container ${
              isError ? "error" : "success"
            }`}
          >
            <p>{message}</p>
          </div>
        )}

        <div className="product-details-and-form">
          {/* 🚨 REMOÇÃO DE BLOCO DUPLICADO: O bloco de <p className="feedback-message"> não existe mais aqui */}

          {/* Coluna de Detalhes Visuais (Lê do estado 'product' - Exibição Salva) */}
          <div className="visual-details">
            <div className="image-placeholder">
              <span className="icon">🖼️</span>
            </div>
            <div className="detail-info">
              <h2 className="product-name-display">{product.nome}</h2>
              <p className="product-price-display">R$ {product.preco}</p>
              <span className="product-peso-display">{product.peso}</span>
              <h3 className="description-title">Descrição</h3>
              <p className="product-description-display">{product.descricao}</p>
            </div>
          </div>

          {/* Coluna do Formulário de Edição */}
          <div className="edit-form-wrapper">
            <form onSubmit={handleSubmit} className="edit-form">
              {/* 1. Campo NOME */}
              {/* ... (todos os campos aqui) ... */}
              <div className="form-group full-width">
                <label htmlFor="nome">Nome do Produto</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  disabled={isSaving}
                />
              </div>

              {/* 2. Campo PREÇO */}
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
                  disabled={isSaving}
                />
              </div>

              {/* 3. Campo PESO/VOLUME */}
              <div className="form-group">
                <label htmlFor="peso">Peso/Volume (Ex: 250g)</label>
                <input
                  type="text"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* 4. Campo CATEGORIA */}
              <div className="form-group">
                <label htmlFor="categoria">Categoria</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  disabled={isSaving}
                >
                  <option value="">Selecione a Categoria</option>
                  <option value="Geleia">Geleia</option>
                  <option value="Queijo">Queijo</option>
                  <option value="Pao">Pão</option>
                  <option value="Conservas">Conservas</option>
                </select>
              </div>

              {/* 5. Campo PRAZO DE VALIDADE */}
              <div className="form-group">
                <label htmlFor="prazo_validade">
                  Prazo de Validade (Ex: 3 meses)
                </label>
                <input
                  type="text"
                  id="prazo_validade"
                  name="prazo_validade"
                  value={formData.prazo_validade}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* 6. Campo DESCRIÇÃO */}
              <div className="form-group full-width">
                <label htmlFor="descricao">Descrição Detalhada</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  rows="3"
                  value={formData.descricao}
                  onChange={handleChange}
                  disabled={isSaving}
                ></textarea>
              </div>

              {/* Botões de Ação */}
              <div className="form-actions full-width">
                <button
                  type="submit"
                  className="save-button"
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/produtos")}
                  className="back-button"
                  disabled={isSaving}
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductEditPage;
