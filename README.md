Sistema desenvolvido com **Node.js**, **React (Vite)** e **Cypress**.

---

## 🚀 Tecnologias

- Node.js
- Express
- React
- Vite
- Cypress
- JavaScript
- Banco de dados (PostgreSQL)

---

## 📁 Estrutura do Projeto

/backend → API Node
/frontend → Aplicação React
/cypress → Testes end-to-end

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto:

- Node instalado
- npm 
- Banco de dados configurado

---

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` em cada pasta.

### Backend → `/backend/.env`

Exemplos dentro de → `/backend/.env.example`

### Frontend → `/frontend/.env`

Exemplos dentro de  → `/frontend/.env.example`

---

## ▶️ Rodando o Backend

```bash
cd backend
npm install
npm run dev
```
Servidor rodará em:

http://localhost:3000

## 💻 Rodando o Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:

http://localhost:5173

## 🧪 Rodando os Testes (Cypress)

```bash
cd frontend
npm install cypress --save-dev
npx cypress open
```

