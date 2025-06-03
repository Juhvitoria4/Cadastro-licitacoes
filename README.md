# Cadastro de Licitações - API e Frontend

## Resumo do desafio
Este projeto consiste em desenvolver uma aplicação para cadastro de licitações, contendo uma API backend em .NET 8 com Entity Framework Core e MySQL, e um frontend em React para consumir a API. O objetivo é permitir operações CRUD (Criar, Ler, Atualizar e Deletar) para licitações, com validações e persistência no banco de dados.

## Detalhes técnicos

### Backend
- Plataforma: .NET 8 (Web API)  
- ORM: Entity Framework Core  
- Banco de dados: MySQL  
- Ferramentas:  
  - Swagger para documentação  
  - CORS configurado para integração com frontend  
- Configurações:  
  - Suporte a operações CRUD para a entidade Licitação  
  - Validações de unicidade e campos obrigatórios  

### Frontend
- Biblioteca: React (via Create React App)  
- Requisições HTTP: Axios  
- Funcionalidades:  
  - Listagem de licitações  
  - Formulário para criação  
  - Exclusão de registros  
- Comunicação: Consome API RESTful via HTTP

### Configurações importantes
- Backend configurado para permitir requisições do frontend (`http://localhost:3000`) via CORS  
- Comunicação entre frontend e backend via HTTP 
## Passos para execução

### Pré-requisitos
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)  
- [Node.js e npm](https://nodejs.org/)  
- MySQL instalado e em execução localmente  

### Backend
1. Clone o repositório e entre na pasta do backend:  
    ```bash
    cd Cadastro-de-Licitacoes/licitacaoApi
    ```
2. Configure a string de conexão no arquivo `appsettings.json` para seu banco MySQL:  
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "server=localhost;port=3306;database=licitacoesdb;user=root;password=SuaSenha"
      }
    }

    ```
3. Restaure os pacotes e crie o banco de dados:  
    ```bash
    dotnet restore
    dotnet ef database update
    ```
4. Rode a API:  
    ```bash
    dotnet run --launch-profile http
    ```
5. A API estará disponível em [http://localhost:5220](http://localhost:5220)  
6. Opcional: acesse a documentação Swagger em [http://localhost:5220/swagger](http://localhost:5220/swagger)  

### Frontend
1. Abra outro terminal e entre na pasta do frontend:  
    ```bash
    cd Cadastro-de-Licitacoes/licitacao-frontend
    ```
2. Instale as dependências:  
    ```bash
    npm install
    ```
3. Inicie o frontend:  
    ```bash
    npm start
    ```
4. A aplicação abrirá em [http://localhost:3000](http://localhost:3000) e estará integrada com o backend  