CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- tabela de instituicao

CREATE TABLE IF NOT EXISTS instituicao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  cnpj CHAR(14) UNIQUE,
  endereco TEXT NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(255),
  logotipo TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de usuários

CREATE TABLE IF NOT EXISTS usuario (
  id               UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  instituicao_id   UUID      NOT NULL REFERENCES instituicao(id) ON DELETE CASCADE,
  nome             VARCHAR(255) NOT NULL,
  nome_social      VARCHAR(255),
  data_nascimento  DATE,
  cpf              CHAR(11)  UNIQUE,
  rg               VARCHAR(20),
  orgao_expedidor  VARCHAR(50),
  matricula        VARCHAR(50),
  telefone         VARCHAR(20),
  email            VARCHAR(255) UNIQUE NOT NULL,
  foto             TEXT,
  usuario          VARCHAR(50) UNIQUE NOT NULL,
  senha            VARCHAR(255) NOT NULL,
  observacoes      TEXT,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Modalidades
CREATE TABLE IF NOT EXISTS modalidade (
  id             UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  instituicao_id UUID      NOT NULL REFERENCES instituicao(id) ON DELETE CASCADE,
  nome           VARCHAR(100) NOT NULL,
  descricao      TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Associação Modalidade ↔ Atleta (usuario)
CREATE TABLE IF NOT EXISTS modalidade_atleta (
  modalidade_id UUID NOT NULL REFERENCES modalidade(id) ON DELETE CASCADE,
  atleta_id     UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  PRIMARY KEY (modalidade_id, atleta_id)
);

-- Tabela de Treinos
CREATE TABLE IF NOT EXISTS treino (
  id             UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  modalidade_id  UUID      NOT NULL REFERENCES modalidade(id) ON DELETE CASCADE,
  data_treino    DATE      NOT NULL,
  descricao      TEXT      NOT NULL,
  horario_inicio TIME      NOT NULL,
  horario_fim    TIME      NOT NULL,
  local          TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Notícias
CREATE TABLE IF NOT EXISTS noticia (
  id           UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo       VARCHAR(255) NOT NULL,
  conteudo     TEXT         NOT NULL,
  anexos       JSONB,                    
  data         TIMESTAMPTZ DEFAULT now(), 
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- Associação N:N entre notícia e modalidade
CREATE TABLE IF NOT EXISTS noticia_modalidade (
  noticia_id   UUID NOT NULL REFERENCES noticia(id) ON DELETE CASCADE,
  modalidade_id UUID NOT NULL REFERENCES modalidade(id) ON DELETE CASCADE,
  PRIMARY KEY (noticia_id, modalidade_id)
);

-- Tabela de Calendários
CREATE TABLE IF NOT EXISTS calendario (
  id             UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  instituicao_id UUID      NOT NULL REFERENCES instituicao(id) ON DELETE CASCADE,
  ano            INTEGER   NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now(),
  UNIQUE (instituicao_id, ano)
);

-- Tabela de Frequência
CREATE TYPE frequencia_status AS ENUM ('Presente','Falta','Falta Justificada');

CREATE TABLE IF NOT EXISTS frequencia (
  id          UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  treino_id   UUID                NOT NULL REFERENCES treino(id) ON DELETE CASCADE,
  atleta_id   UUID                NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  status      frequencia_status   NOT NULL DEFAULT 'Presente',
  created_at  TIMESTAMPTZ         DEFAULT now(),
  updated_at  TIMESTAMPTZ         DEFAULT now(),
  UNIQUE (treino_id, atleta_id)
);

-- Tabela de Boletim de Resultados
CREATE TABLE IF NOT EXISTS boletim (
  id               UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  atleta_id        UUID      NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  modalidade_id    UUID      NOT NULL REFERENCES modalidade(id) ON DELETE CASCADE,
  data_competicao  DATE      NOT NULL,
  evento           VARCHAR(255) NOT NULL,   
  classificacao    VARCHAR(50),             
  medalha          VARCHAR(20),             
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- no backend/src/models/init.sql, após a tabela usuario:
CREATE TYPE user_role_enum AS ENUM ('Atleta','Professor','Diretor');

CREATE TABLE IF NOT EXISTS usuario_role (
  usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  role       user_role_enum NOT NULL,
  PRIMARY KEY (usuario_id, role)
);