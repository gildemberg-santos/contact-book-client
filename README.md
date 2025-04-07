# Contact Book Client

Frontend React para o projeto [Contact Book](https://github.com/gildemberg-santos/contact-book).

---

## 📁 Repositório Backend

Acesse o repositório da API (Ruby on Rails):  
👉 [https://github.com/gildemberg-santos/contact-book](https://github.com/gildemberg-santos/contact-book)

---

## 💻 Requisitos do Ambiente

Certifique-se de estar utilizando as seguintes versões:

```bash
$ npm -v
6.14.15

$ node -v
14.17.6
```

---

## ⚙️ Instalação

### 1. Instalar dependências do projeto

```bash
npm install
```

### 2. (Opcional) Instalar o Create React App globalmente

Se quiser criar novos projetos ou modificar a estrutura via CLI:

```bash
npm install -g create-react-app
```

---

## 🔐 Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com o endereço da API Ruby on Rails:

```env
REACT_APP_LINK_API=http://localhost:3001
```

> 🔁 Ajuste a URL conforme o ambiente de execução da API (desenvolvimento, staging ou produção).

---

## ▶️ Executar o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

O frontend será iniciado em:  
📍 [http://localhost:3000](http://localhost:3000)

---

## 📌 Observações

- O projeto utiliza o **React** como framework de interface.
- Certifique-se de que a **API Rails** está em execução antes de utilizar o client.

---

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](https://opensource.org/licenses/MIT).
