import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductEditPage.css";

// URL base para carregar imagens estáticas do backend
const BASE_URL = "http://localhost:3000/uploads/";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Estados para a busca e exibição (Produto original/salvo)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Estados para o formulário e submissão
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    peso: "",
    categoria: "",
    prazo_validade: "",
    imagem_url: "", // Guarda o nome do arquivo existente
  });
  const [selectedFile, setSelectedFile] = useState(null); // 🚨 NOVO: Para o novo arquivo
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- LÓGICA DE BUSCA DO PRODUTO (GET) ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 🚨 Tenta buscar o produto no backend
        const response = await axios.get(
          `http://localhost:3000/produtos/${id}`
        );

        if (response.data.success && response.data.produto) {
          const data = response.data.produto; // Preenche o estado do produto (para exibição)

          setProduct(data); // Preenche o estado do formulário (para edição)

          setFormData({
            nome: data.nome || "",
            descricao: data.descricao || "",
            preco: String(data.preco) || "",
            peso: data.peso || "",
            categoria: data.categoria || "",
            prazo_validade: data.prazo_validade || "",
            imagem_url: data.imagem_url || "",
          });
          setError(null);
        } else {
          setError("Produto não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Erro de conexão ou servidor.");
      } finally {
        setLoading(false); // 🚨 DESATIVA O LOADING (PONTO CRÍTICO)
      }
    };

    fetchProduct(); // O [id] como dependência garante que o fetch seja refeito se o ID na URL mudar
  }, [id]);

  // Manipula a mudança em campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚨 NOVO HANDLER: Captura o arquivo selecionado
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // Limpa a mensagem caso o usuário tente selecionar outro arquivo após um erro
    setMessage("");
  };

  // --- LÓGICA DE SUBMISSÃO DA EDIÇÃO (PUT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsSaving(true);

    let submitPayload;

    // Se um novo arquivo foi selecionado, usamos FormData
    if (selectedFile) {
      submitPayload = new FormData();

      // 1. Anexa o novo arquivo
      submitPayload.append("imagem", selectedFile);

      // 2. Anexa todos os campos de texto
      submitPayload.append("nome", formData.nome);
      submitPayload.append("descricao", formData.descricao);
      submitPayload.append("preco", parseFloat(formData.preco) || 0);
      submitPayload.append("peso", formData.peso);
      submitPayload.append("categoria", formData.categoria);
      submitPayload.append("prazo_validade", formData.prazo_validade);

      // O backend precisa estar configurado para lidar com PUT e multipart/form-data,
      // o que exige mudanças na rota PUT que ainda não fizemos. Por ora, simulamos.
    } else {
      // Se NENHUM arquivo novo foi selecionado, enviamos JSON normal
      submitPayload = {
        ...formData,
        preco: parseFloat(formData.preco) || 0,
      };
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/produtos/${id}`,
        submitPayload,
        // Configura o cabeçalho apenas se for FormData
        selectedFile
          ? { headers: { "Content-Type": "multipart/form-data" } }
          : {}
      );

      if (response.status === 200) {
        setMessage("✅ Produto atualizado com sucesso!");
        setIsError(false);

        // 🚨 Atualiza a exibição: usa o payload local (se for JSON) ou o novo filename
        const newImageUrl = selectedFile
          ? response.data.imagemUrl
          : formData.imagem_url;

        // Atualiza o estado 'product' com os NOVOS dados
        setProduct({ ...payload, imagem_url: newImageUrl });
        setFormData((prev) => ({ ...prev, imagem_url: newImageUrl })); // Mantém a URL no formulário

        // Limpa o input de arquivo
        setSelectedFile(null);

        // Opcional: Redirecionar para a lista após a edição
        setTimeout(() => {
          navigate("/admin/produtos");
        }, 2000);
      }
    } catch (error) {
      // ... (restante do catch) ...
      const msg =
        error.response?.data?.message ||
        "Erro ao conectar com o servidor. Verifique os dados.";
      setMessage(`❌ ${msg}`);
      setIsError(true);
    } finally {
      setIsSaving(false);
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

  return (
    <div className="edit-page-view">
      <header className="admin-header">
        <div className="header-content">
          <h1 className="admin-title">Edição de Produto</h1>
          <p className="admin-subtitle">Edite o produto escolhido</p>
        </div>
      </header>

      <main className="edit-main">
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
          {/* Coluna de Detalhes Visuais (Lê do estado 'product' - Exibição Salva) */}
          <div className="visual-details">
            <div className="image-placeholder">
              {product.imagem_url ? (
                <img
                  src={`${BASE_URL}${product.imagem_url}`}
                  alt={product.nome}
                  className="product-image-display"
                />
              ) : (
                <span className="icon">🖼️</span>
              )}
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
              {/* 7. CAMPO DE UPLOAD PARA SUBSTITUIÇÃO (NOVO) */}
              <div className="form-group full-width">
                <label htmlFor="nova_imagem">
                  Substituir Imagem (Opcional)
                </label>
                <input
                  type="file"
                  id="nova_imagem"
                  name="nova_imagem"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={isSaving}
                />
                {selectedFile && (
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginTop: "5px",
                    }}
                  >
                    Novo arquivo: {selectedFile.name}
                  </p>
                )}
              </div>

              {/* 1. Campo NOME */}
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
              {/* ... (2-6. Outros Campos: Preço, Peso, Categoria, Validade, Descrição - MANTIDOS) ... */}

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
