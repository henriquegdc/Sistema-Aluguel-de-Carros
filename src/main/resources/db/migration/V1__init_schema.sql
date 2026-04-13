CREATE TABLE clientes (
    id BIGSERIAL PRIMARY KEY,
    rg VARCHAR(20) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    profissao VARCHAR(120) NOT NULL,
    senha VARCHAR(120) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rendas (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    fonte VARCHAR(120) NOT NULL,
    valor NUMERIC(12,2) NOT NULL CHECK (valor > 0)
);

CREATE TABLE agentes (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    tipo VARCHAR(30) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE bancos (
    id BIGINT PRIMARY KEY REFERENCES agentes(id) ON DELETE CASCADE,
    cnpj VARCHAR(18) UNIQUE
);

CREATE TABLE empresas (
    id BIGINT PRIMARY KEY REFERENCES agentes(id) ON DELETE CASCADE,
    razao_social VARCHAR(160)
);

CREATE TABLE creditos (
    id BIGSERIAL PRIMARY KEY,
    banco_id BIGINT NOT NULL REFERENCES bancos(id),
    limite NUMERIC(12,2) NOT NULL CHECK (limite >= 0),
    concedido BOOLEAN NOT NULL DEFAULT FALSE,
    data_analise TIMESTAMP
);

CREATE TABLE veiculos (
    id BIGSERIAL PRIMARY KEY,
    matricula VARCHAR(30) NOT NULL UNIQUE,
    ano INTEGER NOT NULL,
    marca VARCHAR(80) NOT NULL,
    modelo VARCHAR(120) NOT NULL,
    placa VARCHAR(12) NOT NULL UNIQUE,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE pedidos (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL REFERENCES clientes(id),
    veiculo_id BIGINT NOT NULL REFERENCES veiculos(id),
    status VARCHAR(30) NOT NULL,
    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacao VARCHAR(255)
);

CREATE TABLE avaliacoes (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL UNIQUE REFERENCES pedidos(id) ON DELETE CASCADE,
    agente_id BIGINT REFERENCES agentes(id),
    resultado VARCHAR(30) NOT NULL,
    comentario VARCHAR(255),
    data_avaliacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contratos (
    id BIGSERIAL PRIMARY KEY,
    pedido_id BIGINT NOT NULL UNIQUE REFERENCES pedidos(id),
    cliente_id BIGINT NOT NULL REFERENCES clientes(id),
    veiculo_id BIGINT NOT NULL REFERENCES veiculos(id),
    credito_id BIGINT REFERENCES creditos(id),
    tipo_contrato VARCHAR(40) NOT NULL,
    data_geracao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO agentes (nome, cpf, codigo, tipo, ativo)
VALUES ('Agente Banco', '00000000000', 'BNC-001', 'BANCO', true);

INSERT INTO bancos (id, cnpj)
VALUES (1, '00000000000191');

INSERT INTO agentes (nome, cpf, codigo, tipo, ativo)
VALUES ('Agente Empresa', '11111111111', 'EMP-001', 'EMPRESA', true);

INSERT INTO empresas (id, razao_social)
VALUES (2, 'Empresa Aluguel de Carros');
