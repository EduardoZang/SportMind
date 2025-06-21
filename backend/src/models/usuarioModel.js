const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query(
    `SELECT 
       id,
       instituicao_id,
       nome,
       nome_social,
       data_nascimento,
       cpf,
       rg,
       orgao_expedidor,
       matricula,
       telefone,
       email,
       foto,
       usuario,
       observacoes,
       created_at,
       updated_at
     FROM usuario
     ORDER BY nome`
  );
  return rows;
}

async function findByUsername(usuario) {
  const { rows } = await pool.query(
    'SELECT * FROM usuario WHERE usuario = $1',
    [usuario]
  );
  return rows[0];
}

async function findByEmail(email) {
  const { rows } = await pool.query(
    'SELECT * FROM usuario WHERE email = $1',
    [email]
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT 
       id,
       instituicao_id,
       nome,
       nome_social,
       data_nascimento,
       cpf,
       rg,
       orgao_expedidor,
       matricula,
       telefone,
       email,
       foto,
       usuario,
       observacoes,
       created_at,
       updated_at
     FROM usuario
     WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function findRoles(usuarioId) {
  const { rows } = await pool.query(
    'SELECT role FROM usuario_role WHERE usuario_id = $1',
    [usuarioId]
  );
  return rows.map(r => r.role);
}

async function create(data) {
  const {
    instituicao_id,
    nome,
    nome_social = null,
    data_nascimento = null,
    cpf = null,
    rg = null,
    orgao_expedidor = null,
    matricula = null,
    telefone = null,
    email,
    foto = null,
    usuario,
    senhaHash,
    observacoes = null
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO usuario
       (instituicao_id, nome, nome_social, data_nascimento,
        cpf, rg, orgao_expedidor, matricula,
        telefone, email, foto, usuario, senha, observacoes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING
       id,
       instituicao_id,
       nome,
       nome_social,
       data_nascimento,
       cpf,
       rg,
       orgao_expedidor,
       matricula,
       telefone,
       email,
       foto,
       usuario,
       observacoes,
       created_at,
       updated_at`,
    [
      instituicao_id, nome, nome_social, data_nascimento,
      cpf, rg, orgao_expedidor, matricula,
      telefone, email, foto, usuario, senhaHash, observacoes
    ]
  );
  return rows[0];
}

module.exports = {
  findAll,
  findByUsername,
  findByEmail,
  findById,
  findRoles,
  create
};