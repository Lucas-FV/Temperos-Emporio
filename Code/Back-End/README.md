# 🌿 Temperos Emporio Gourmet - Website Oficial
"Website oficial do Temperos Emporio Gourmet - Explore nossos produtos artesanais, orgânicos e especiais."

## 🌐 Back-End do Temperos Empório Gourmet

Este diretório contém o código-fonte da API (Application Programming Interface) do Temperos Empório Gourmet, desenvolvida utilizando **Node.js** com **Express.js**.

---

### 🚀 Tecnologias e Ferramentas

* **Node.js**: Ambiente de execução JavaScript no servidor.
* **Banco de Dados:** MySQL
* **Express.js**: Framework web para Node.js, utilizado para construir a API.

---

### 🛠️ Como Executar o Back-End Localmente

Siga estas instruções para configurar e rodar o Back-End em sua máquina de desenvolvimento:

1.  **Navegue até o diretório:**
    ```bash
    cd TEMPEROS-EMPORIO/Code/Back-End
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configuração do MySQL:**
    * Certifique-se de ter um servidor MySQL rodando localmente.
    * Crie um banco de dados para o seu empório (ex: `emporio_db`).
4.  **Crie e configure o arquivo de variáveis de ambiente (`.env`):**
    * Crie um arquivo chamado `.env` na raiz desta pasta (`./Back-End/`).
    * Adicione as variáveis de ambiente necessárias para a conexão com o banco de dados e a porta do servidor. Exemplo:
        ```env
        PORT=3001
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=sua_senha_do_mysql
        DB_NAME=emporio_db
        ```
    * **Importante:** Nunca commite seu arquivo `.env` para o Git. Adicione `/.env` ao seu `.gitignore` dentro desta pasta.
5.  **Inicie o servidor:**
    ```bash
    node server.js
    # ou, se usar nodemon para desenvolvimento (instale com npm install -g nodemon):
    # nodemon server.js
    ```
    API estará disponível em `http://localhost:[porta_do_servidor]` (geralmente 3001).
