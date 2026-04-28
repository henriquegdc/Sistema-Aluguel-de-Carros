# Sistema de Aluguel de Carros

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Este projeto foi desenvolvido para a disciplina de <b>Laboratorio de Desenvolvimento de Software</b> do curso de Engenharia de Software na <b>PUC Minas</b>. O sistema foca na automacao do fluxo de locacao, permitindo que usuarios individuais (clientes) e agentes (empresas e bancos) interajam em uma plataforma centralizada para a gestao de contratos e analise financeira. A implementacao segue o padrao <b>MVC</b> com foco em <b>API REST</b> utilizando <b>Java + Micronaut</b>, conforme os requisitos da disciplina.
      </div>
    </td>
    <td>
      <div>
        <img src="https://github.com/henriquegdc/Sistema-Aluguel-de-Carros/blob/main/IMG/logo_ES_vertical.png" alt="Logo do Projeto" width="350px"/>
      </div>
    </td>
  </tr>
</table>

---

## Status do Projeto

![Versao](https://img.shields.io/badge/Versao-v1.0.0-blue?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-21-007ec6?style=for-the-badge&logo=openjdk&logoColor=white)
![Micronaut](https://img.shields.io/badge/Micronaut-4.10.11-1f6feb?style=for-the-badge)
![API](https://img.shields.io/badge/Arquitetura-API_REST-orange?style=for-the-badge)

---

## Indice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Instalacao e Execucao](#instalacao-e-execucao)
- [Configuracao](#configuracao)
- [Principais Endpoints](#principais-endpoints)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Testes](#testes)
- [Autores](#autores)
- [Agradecimentos](#agradecimentos)
- [Licenca](#licenca)

---

## Sobre o Projeto

O sistema visa apoiar a gestao completa de alugueis de automoveis.

- **Por que ele existe:** como parte da avaliacao pratica (Lab 02) do curso de Engenharia de Software.
- **Qual problema ele resolve:** automatiza cadastro de clientes, criacao/avaliacao de pedidos, gerenciamento de veiculos e geracao de contratos.
- **Contexto:** academico, com aplicacao de UML e implementacao backend orientada a API HTTP/JSON.

---

## Funcionalidades Principais

- Cadastro, consulta, atualizacao e remocao de clientes.
- Cadastro e autenticacao de cliente (CPF + senha).
- Login de agente por codigo.
- Cadastro e consulta de veiculos, incluindo listagem de disponiveis.
- Criacao, alteracao, consulta e cancelamento de pedidos.
- Avaliacao de pedidos por agentes com resultado APROVADO ou REJEITADO.
- Geracao e consulta de contratos para pedidos aprovados.
- Migracao automatica de banco com Flyway no startup.

---

## Tecnologias Utilizadas

### Back-end

- Java 21
- Micronaut Framework 4.10.11
- Micronaut Data JPA
- Hibernate ORM
- HikariCP

### Front-end

- React + Vite
- Axios
- Context API
- CSS Global Customizado

### Banco de dados

- PostgreSQL (ambiente local)
- Flyway (migracoes)
- H2 (ambiente de teste)

### Build e testes

- Maven Wrapper
- JUnit 5
- Micronaut Test

---

## Arquitetura

O sistema esta organizado em camadas:

1. **Controller:** exposicao dos endpoints HTTP.
2. **Service:** regras de negocio.
3. **Repository:** acesso a dados com Micronaut Data.
4. **Model/DTO:** entidades persistentes e objetos de transporte.

### Fluxo funcional

1. Cliente ou agente autentica no sistema.
2. Cliente cria pedido para um veiculo disponivel.
3. Agente avalia o pedido.
4. Pedido aprovado pode gerar contrato.

### Observacao sobre interface

As pastas `src/main/resources/views` e `src/main/resources/static` foram preservadas na estrutura do projeto, mas a aplicacao atual esta operando como API REST (sem frontend ativo).

---

## Instalacao e Execucao

### Pre-requisitos

- Java JDK 21 instalado.
- Node.js instalado (para o front-end).
- PostgreSQL em execucao local.
- Bash (Git Bash/WSL) para executar os comandos abaixo.

### Clonar o repositorio

```bash
git clone https://github.com/henriquegdc/Sistema-Aluguel-de-Carros.git
cd "Sistema-Aluguel-de-Carros"
```

### Back-end

#### Build e execucao

Opcao 1 (recomendada): subir banco e API com Docker Compose

```bash
docker compose up --build -d
```

Teste rapido de saude:

```bash
curl -s http://localhost:8080/
```

Resposta esperada:

```json
{"service":"aluguelcarros-api","status":"UP"}
```

Opcao 2: rodar API localmente com banco no Docker

```bash
docker compose up -d db
./mvnw clean compile
./mvnw mn:run
```

Opcao 3: IntelliJ (botao Run)

- Classe principal: `com.aluguelcarros.Application`
- JDK: 21
- Se `backend` do Docker estiver ativo, pare-o antes para evitar conflito de porta (`8080`):

```bash
docker compose stop backend
```

- Deixe o banco rodando (`docker compose up -d db`) e execute pelo IntelliJ.

### 🚗 Front-end

> **Importante:** Certifique-se de que o back-end esteja rodando na porta `8080` antes de iniciar o front-end.

1. Navegue ate a pasta do frontend:

```bash
cd src/Frontend
```

2. Instale as dependencias:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador.

---

## Configuracao

As configuracoes de runtime estao no arquivo `src/main/resources/application.yml`.

Variaveis de ambiente utilizadas:

- `JDBC_URL` (padrao: `jdbc:postgresql://localhost:5432/aluguel_carros`)
- `DB_USER` (padrao: `postgres`)
- `DB_PASSWORD` (padrao: `postgres`)
- `JWT_SECRET` (padrao: `minha-chave-secreta-muito-longa-para-ser-segura-em-dev`)
- `JWT_EXPIRATION_MS` (padrao: `86400000`)

Exemplo:

```bash
export JDBC_URL='jdbc:postgresql://localhost:5432/aluguel_carros'
export DB_USER='postgres'
export DB_PASSWORD='postgres'
export JWT_SECRET='minha-chave'
export JWT_EXPIRATION_MS='86400000'
```

Criacao do banco:

```bash
psql -U postgres -h localhost -c "CREATE DATABASE aluguel_carros;"
```

Observacoes:

- O Flyway aplica automaticamente `src/main/resources/db/migration/V1__init_schema.sql` ao iniciar.
- O seed inicial inclui agentes com codigos `BNC-001` e `EMP-001`.

### Docker (PostgreSQL + Back-end)

Subir banco e API com Docker Compose:

```bash
docker compose up --build
```

Parar os containers:

```bash
docker compose down
```

Parar e remover volume do banco:

```bash
docker compose down -v
```

Validar containers:

```bash
docker compose ps
```

---

## Principais Endpoints

Base URL local: `http://localhost:8080`

Regras de autenticacao JWT:

- Rotas publicas: `POST /api/auth/login/cliente`, `POST /api/auth/login/agente`, `POST /api/auth/cadastro/cliente`, `GET /api/veiculos`, `GET /api/veiculos/disponiveis`, `GET /`
- Demais rotas exigem header `Authorization: Bearer <token>`

### Autenticacao

- `POST /api/auth/login/agente`
- `POST /api/auth/login/cliente`
- `POST /api/auth/cadastro/cliente`

```bash
curl -s -X POST http://localhost:8080/api/auth/login/agente \
  -H 'Content-Type: application/json' \
  -d '{"codigo":"BNC-001"}'
```

### Clientes

- `GET /api/clientes`
- `GET /api/clientes/{id}`
- `POST /api/clientes`
- `PUT /api/clientes/{id}`
- `DELETE /api/clientes/{id}`

### Agentes

- `GET /api/agentes`
- `GET /api/agentes?codigo={codigo}`
- `GET /api/agentes/{id}`

### Veiculos

- `GET /api/veiculos`
- `GET /api/veiculos/disponiveis`
- `GET /api/veiculos/{id}`
- `POST /api/veiculos`
- `PUT /api/veiculos/{id}`
- `DELETE /api/veiculos/{id}`

### Pedidos

- `GET /api/pedidos/cliente/{clienteId}`
- `GET /api/pedidos/pendentes`
- `POST /api/pedidos`
- `PUT /api/pedidos/{pedidoId}`
- `POST /api/pedidos/{pedidoId}/cancelar/{clienteId}`
- `POST /api/pedidos/{pedidoId}/avaliar/{agenteId}/{resultado}?comentario=...`

Valores para `resultado`: `APROVADO`, `REJEITADO`.

### Contratos

- `POST /api/contratos/pedido/{pedidoId}/{tipoContrato}`
- `GET /api/contratos/{id}`
- `GET /api/contratos/pedido/{pedidoId}`
- `GET /api/contratos/cliente/{clienteId}`

Valores para `tipoContrato`: `LOCACAO`, `LEASING`, `FINANCIAMENTO`.

---

## 🔄 Fluxo de Utilizacao (User Journey)

Para testar o sistema completo, siga estes passos:

1. **Acesso Administrativo:** Faca login como Agente (`BNC-001`) e cadastre um veiculo novo.
2. **Interesse do Cliente:** Faca logout, crie uma conta de cliente e solicite o aluguel do veiculo cadastrado na Vitrine.
3. **Aprovacao:** Volte como Agente e altere o status do pedido para `APROVADO`.
4. **Contrato:** Como Cliente, va em *Meus Pedidos* e clique em *Gerar Contrato*.
5. **Validacao:** Verifique se o veiculo sumiu da Vitrine inicial.

---

## Estrutura de Pastas

```text
src/
  main/
    java/com/aluguelcarros/
      controller/
      service/
      repository/
      model/
      dto/
      facade/
      config/
      exception/
      enums/
    resources/
      application.yml
      application-test.yml
      db/migration/V1__init_schema.sql
      static/.gitkeep
      views/.gitkeep
  frontend/
    src/
      components/       # Componentes reutilizaveis (NavBar, ProtectedRoute)
      pages/            # Telas principais do sistema
      services/
        api.js          # Configuracao da instancia do Axios
      contexts/
        AuthContext.js  # Logica de login e persistencia de sessao
      global.css        # Todos os estilos e temas do projeto
  test/
    java/com/aluguelcarros/AluguelcarrosTest.java
```

---

## Testes

Executar testes automatizados:

```bash
./mvnw test
```

Detalhes:

- O perfil de testes utiliza H2 em memoria.
- O teste atual valida a inicializacao do contexto Micronaut.

---

## Autores

Este projeto foi desenvolvido no contexto das atividades praticas do curso de Engenharia de Software.

| Nome | GitHub |
|------|--------|
| Joao Pedro Moura | [@joaopedromoura](https://github.com/joaopedromourinhasantos) |
| Miguel |  adicionar perfil oficial |
| Henrique Carvalho | [@henrquegdc](https://github.com/henriquegdc) |

---

## Agradecimentos

Gostaria de registrar agradecimento a quem contribuiu para a realizacao deste trabalho academico:

- [Engenharia de Software PUC Minas](https://www.instagram.com/engsoftwarepucminas/) pelo suporte institucional.
- [Prof. Joao Paulo Carneiro Aramuni](https://github.com/joaopauloaramuni) pelas orientacoes tecnicas e condução da disciplina.

---

## Licenca

Distribuido sob licenca MIT. Consulte o arquivo `LICENSE` para mais detalhes.
