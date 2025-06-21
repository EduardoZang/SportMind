const pool = require('../config/db');

async function findAll(instituicaoId) {
  const { rows } = await pool.query(
    `SELECT 
       id,
       instituicao_id,
       nome,
       descricao,
       created_at,
       updated_at
     FROM modalidade
    WHERE instituicao_id = $1
    ORDER BY nome`,
    [instituicaoId]
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT 
       id,
       instituicao_id,
       nome,
       descricao,
       created_at,
       updated_at
     FROM modalidade
    WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function create(data) {
  const { instituicao_id, nome, descricao = null } = data;
  const { rows } = await pool.query(
    `INSERT INTO modalidade
       (instituicao_id, nome, descricao)
     VALUES ($1, $2, $3)
     RETURNING id, instituicao_id, nome, descricao, created_at, updated_at`,
    [instituicao_id, nome, descricao]
  );
  return rows[0];
}

async function update(id, fields) {
  const setClauses = [];
  const values = [];
  let idx = 1;

  for (const [key, val] of Object.entries(fields)) {
    setClauses.push(`${key} = $${idx}`);
    values.push(val);
    idx++;
  }
  setClauses.push(`updated_at = now()`);

  const sql = `
    UPDATE modalidade
       SET ${setClauses.join(', ')}
     WHERE id = $${idx}
     RETURNING id, instituicao_id, nome, descricao, created_at, updated_at
  `;
  values.push(id);

  const { rows } = await pool.query(sql, values);
  return rows[0];
}

async function remove(id) {
  await pool.query(
    `DELETE FROM modalidade WHERE id = $1`,
    [id]
  );
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};