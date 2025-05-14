<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

🚀 README Ajustado para o Projeto URL Shortener API 🔥  

📌 O que foi ajustado?**  
✅ Melhoria na organização e clareza das instruções. 
✅ Correção de formatação e padronização dos endpoints.  
✅ Adição de explicações mais detalhadas para cada etapa.  

---

# URL Shortener API  

API para encurtar URLs e gerenciar URLs de usuários.  

---

## 📌 Pré-requisitos  

Antes de rodar o projeto, certifique-se de ter instalado:  

- Node.js v18.19.0  
- npm (Node Package Manager)  
- Prisma CLI 
- Docker (para rodar o PostgreSQL via Docker)  

---

## 🔹 Como iniciar o projeto 

### 1️⃣ Clone o repositório  
```bash
git clone git@github.com:Cleber-Canto/ShortNest-.git
cd url-shortener
```

### 2️⃣ Instale as dependências  
```bash
npm install
```

### 3️⃣ Inicie os containers do Docker
✅ Para rodar os containers em segundo plano (modo "detached"):
```bash
docker compose up -d
```

### 4️⃣ Rodar as migrações do Prisma para sincronizar a base 
```bash
npx prisma migrate dev
```

### 5️⃣ Iniciar o servidor
```bash
npm run start
```

✅ Se tudo estiver correto, a API estará rodando na porta `3009`.

---

## 🔹 Testando a API 

### 1️⃣ Registrar um novo usuário
✅ Endpoint: `POST /register`  
✅ URL: `http://localhost:3009/register`  

```json
{
  "email": "manaus@meuemail.com",
  "password": "minhasenha"
}
```

---

### 2️⃣ Fazer login 
✅ Endpoint: `POST /login`  
✅ URL:`http://localhost:3009/login`  

```json
{
  "email": "manaus@meuemail.com",
  "password": "minhasenha"
}
```

✅ A resposta incluirá um token JWT para autenticação.

---

### 3️⃣ Encurtar uma URL 
✅ Endpoint:`POST /urls`  
✅ URL: `http://localhost:3009/urls`  
```json
{
  "originalUrl": "https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/"
}
```

✅ A resposta incluirá um código curto para acessar a URL encurtada.

---

### 4️⃣ Listar URLs do usuário  
✅ Endpoint:`GET /urls`  
✅ URL: `http://localhost:3009/urls`  

✅ A resposta incluirá todas as URLs encurtadas pelo usuário.  

---

### 5️⃣ Redirecionar para a URL original 
✅ Endpoint:`GET /:shortUrl`  
✅ URL:`http://localhost:3009/{shortUrl}`  

✅ Isso redirecionará automaticamente para a URL original.

---

### 6️⃣ Editar uma URL encurtada
✅ Endpoint:`PUT /url`  
✅ URL:`http://localhost:3009/url`  

```json
{
  "shortUrl": "abc123",
  "newDestination": "https://new-destination.com"
}
```

✅ Isso atualizará a URL encurtada para um novo destino.

---

### 7️⃣ Excluir uma URL encurtada
✅ Endpoint:`DELETE /url`  
✅ URL: `http://localhost:3009/url`  

```json
{
  "shortUrl": "abc123"
}
```

✅ Isso removerá a URL encurtada do sistema.

---

## 🔹 Acessar o banco de dados via Prisma
✅ Para visualizar os dados no banco:
```bash
npx prisma studio
```

✅ Isso abrirá uma interface gráfica para gerenciar os dados.

---

## 🔹 Documentação da API 
✅ Acesse a documentação Swagger no navegador:

🔗 [Swagger UI](http://localhost:3009/api-docs)

✅ **Certifique-se de que o servidor esteja rodando para acessar a documentação.

---

## 🔹 Endpoints disponíveis

| Método | Endpoint | Descrição |
|--------|---------|-----------|
| POST | `/register` | Registrar um novo usuário |
| POST| `/login` | Login com as credenciais existentes |
| POST | `/urls` | Encurtar uma URL |
| GET | `/urls` | Listar URLs encurtadas do usuário |
| PUT | `/url` | Editar o destino de uma URL encurtada |
| DELETE| `/url` | Excluir uma URL encurtada |
| GET | `/:shortUrl` | Redirecionar para a URL original |

---

## 🔹 Como parar o servidor 
✅ Se precisar parar o servidor:
```bash
CTRL + C
```

✅ Se precisar parar os containers do Docker:
```bash
docker-compose down
```

✅ Se precisar rodar novamente:
```bash
npm run start
```



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
