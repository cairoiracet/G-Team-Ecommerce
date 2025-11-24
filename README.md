# 🛒 G-Team Ecommerce

Uma aplicação de e-commerce moderna construída com Next.js 15, React, TypeScript, e integrada com MercadoPago, Sanity CMS e Clerk para autenticação.

![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge\&logo=typescript)

## 🛠️ Tecnologias

**Frontend:**

* Next.js
* React

**Backend & APIs:**

* Clerk (Autenticação)
* Sanity CMS
* MercadoPago (Pagamentos)
* Zustand (Gerenciamento de estado)

## 🗺️ Rotas da Aplicação
Abaixo estão as principais rotas da aplicação e suas funcionalidades:

/	Página principal do app (home)

/shop	Loja de produtos

/cart	Página de pagamentos e resumo do carrinho

/studio	Painel administrativo do Sanity para gerenciamento de estoque

/sobre	Página com explicação sobre a loja

/wishlist	Lista de produtos favoritos

/orders	Lista de pedidos do usuário


## 🔧 Ambiente de Desenvolvimento

### 📋 **Pré-requisitos**

* **Node.js 25.x**
  Este projeto utiliza o Node 25.

* **NPM** (instalado automaticamente com o Node)

* **Recomendado:**
  **NVM (Node Version Manager)** para gerenciar diferentes versões do Node de forma simples.

## 🔧 **Usando NVM (Node Version Manager)**

Para instalar e usar a versão correta do Node:

```bash
nvm install 25
nvm use 25
```

## ▶️ **Rodando o Projeto em Ambiente de Desenvolvimento**

Após garantir que está utilizando **Node 25**, execute:

```bash
npm install
```

```bash
npm run dev
```

* `npm install` → instala todas as dependências
* `npm run dev` → inicia o ambiente de desenvolvimento (Next.js em modo dev)

---
