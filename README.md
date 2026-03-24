# 🏎️ Sistema de Aluguel de Carros 👨‍💻

> [!NOTE]
> Sistema web para apoio à gestão de aluguéis de automóveis que permite efetuar, cancelar e modificar pedidos através da Internet.
> **Logo sugerida:** Um ícone de um cronômetro sobreposto a uma silhueta de veículo, simbolizando agilidade no aluguel.

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        Este projeto foi desenvolvido para a disciplina de <b>Laboratório de Desenvolvimento de Software</b> do curso de Engenharia de Software na <b>PUC Minas</b>. O sistema foca na automação do fluxo de locação, permitindo que usuários individuais (clientes) e agentes (empresas e bancos) interajam em uma plataforma centralizada para a gestão de contratos e análise financeira. A implementação segue o padrão <b>MVC</b> utilizando <b>Java</b> e <b>Spring Boot</b>, conforme os requisitos da Sprint.
      </div>
    </td>
    <td>
      <div>
        <img src="https://github.com/henriquegdc/Sistema-Aluguel-de-Carros/blob/main/IMG/logo_ES_vertical.png" alt="Logo do Projeto" width="120px"/>
      </div>
    </td>
  </tr> 
</table>

---

## 🚧 Status do Projeto

![Versão](https://img.shields.io/badge/Versão-v1.0.0-blue?style=for-the-badge) ![Java](https://img.shields.io/badge/Java-17-007ec6?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.5-007ec6?style=for-the-badge&logo=springboot&logoColor=white) ![MVC](https://img.shields.io/badge/Arquitetura-MVC-orange?style=for-the-badge)

---

## 📚 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Autores](#-autores)
- [Agradecimentos](#-agradecimentos)

---

## 📝 Sobre o Projeto
O sistema visa apoiar a gestão completa de aluguéis de automóveis em um ambiente web.

- **Por que ele existe:** Como parte da avaliação prática (Lab 02) para o 4º período de Engenharia de Software.
- **Qual problema ele resolve:** Automatiza a introdução, modificação e cancelamento de pedidos de aluguel, além de integrar a análise financeira feita por bancos e empresas.
- **Contexto:** Acadêmico, focado na aplicação de modelos UML (Casos de Uso, Classes, Componentes) em um ambiente de desenvolvimento Java.

---

## ✨ Funcionalidades Principais
- 🔐 **Cadastro Obrigatório:** O sistema exige cadastro prévio para acesso às funcionalidades.
- 🚗 **Gestão de Aluguel:** Clientes podem introduzir, modificar, consultar e cancelar seus pedidos.
- 🏦 **Intermediação de Agentes:** Empresas e bancos podem modificar e avaliar os pedidos financeiramente.
- 💰 **Análise de Crédito:** Pedidos são analisados por agentes e, em caso positivo, avançam para execução de contrato.
- 📋 **Dados do Contratante:** Registro de RG, CPF, Nome, Endereço, profissão e até 3 rendimentos auferidos.
- 🏎️ **Cadastro de Automóveis:** Registro detalhado de matrícula, ano, marca, modelo e placa.

---

## 🛠 Tecnologias Utilizadas

### 🖥️ Back-end
* **Linguagem:** Java (JDK 17+)
* **Framework:** Spring Boot / Spring MVC
* **Arquitetura:** MVC (Model-View-Controller)

### 💻 Front-end
* **Interface:** Construção dinâmica de páginas web ligadas ao servidor central

---

## 🏗 Arquitetura

O sistema é dividido em dois subsistemas fundamentais:
1. **Gestão de Pedidos e Contratos:** Core da aplicação para regras de negócio.
2. **Construção Dinâmica de Páginas:** Camada de apresentação web.

### Modelagem Técnica (Sprints)
* **Sprint 01:** Diagramas de Casos de Uso, Classes, Pacotes e Histórias de Usuário.
* **Sprint 02:** Diagrama de Componentes e implementação do CRUD de cliente.
* **Sprint 03:** Diagrama de Implantação e protótipo para criação de pedidos.

---

## 🔧 Instalação e Execução

### Pré-requisitos
* Java JDK 17+ instalado.
* Maven para gestão de dependências.

### Processo de Desenvolvimento

O projeto é dividido em três entregas (Sprints) principais:

* **Lab02S01:** Modelagem UML (Casos de Uso, Histórias do Usuário, Classes e Pacotes).
* **Lab02S02:** Diagrama de Componentes e implementação do CRUD de cliente.
* **Lab02S03:** Diagrama de Implantação e protótipo funcional para pedidos de aluguel.


---

## 👥 Autores
Este projeto foi desenvolvido individualmente como parte das atividades práticas do curso de Engenharia de Software.

| 👤 Nome | 🖼️ Foto | :octocat: GitHub | 💼 LinkedIn | 📤 Gmail |
|---------|----------|-----------------|-------------|-----------|
| **João Pedro Moura** | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/joaopedromoura"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/joaopedromoura"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:joaopedromoura@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |
| **Miguel** | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/joaopedromoura"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/joaopedromoura"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:joaopedromoura@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |
| **Henrique** | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/joaopedromoura"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/joaopedromoura"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:joaopedromoura@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |


---

## 🙏 Agradecimentos
Gostaria de expressar gratidão às instituições e profissionais que viabilizaram a execução deste projeto acadêmico:

* [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/) - Pelo suporte institucional e pela sólida estrutura acadêmica fornecida durante o 4º período.
* [**Prof.João Paulo Carneiro Aramuni**](https://github.com/joaopauloaramuni) - Pelas orientações técnicas, fornecimento do material base e condução da disciplina de Laboratório de Desenvolvimento de Software.


---


