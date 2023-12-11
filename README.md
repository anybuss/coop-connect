# Coop Connect

## Sobre o Projeto

Coop Connect é uma aplicação Vue.js destinada ao CRUD de usuários cooperados (front-end). Permite cadastrar, editar, visualizar e remover usuários, com validações específicas para pessoas físicas e jurídicas.

### Funcionalidades

- **Cadastro e Edição de Usuários**: Suporte para pessoa física e jurídica com campos obrigatórios e opcionais.
- **Validações de Formulário**: Campos reativos com validações conforme a obrigatoriedade.
- **Persistência de Dados**: Utilização do Pinia para controle e persistência.
- **Identificação Única**: Criação de usuário cooperado com UUID.

### Restrições

- Não permite cadastro de CPF/CNPJ duplicados.
- Não permite a edição de CPF/CNPJ.

## Tecnologias Utilizadas

- Vue.js
- Pinia
- Vue Router
- Vuetify
- TypeScript

## Instalação e Execução

### Pré-Requisitos

Antes de iniciar, é necessário ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/) (Projeto desenvolvido na versão 20.6.0)
- [Git](https://git-scm.com)

### Passo a Passo

1. Clone o repositório

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Entre na pasta do projeto

   ```bash
   cd coop-connect
   ```

3. Na raiz do projeto instale as dependências

   ```bash
   npm install
   ```

4. Você pode rodar aplicação no ambiente de desenvolvimento ou no ambiente de build.

   ```bash
   npm run dev
   ```

   ou

   ```bash
   npm run build && preview
   ```

5. Abra a aplicação na porta `http://localhost:3000/`

---

Desenvolvido por Any Buss 🖤

[Voltar ao topo ⬆](#coop-connect)
