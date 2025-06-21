const pool = require('../config/db');

async function findAll(instituicaoId) {
  const { rows } = await pool.query(
    `SELECT t.*
       FROM treino t
       JOIN modalidade m
         ON t.modalidade_id = m.id
      WHERE m.instituicao_id = $1
      ORDER BY t.data_treino, t.horario_inicio`,
    [instituicaoId]
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM treino WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function create(data) {
  const {
    modalidade_id,
    data_treino,
    descricao,
    horario_inicio,
    horario_fim,
    local = null
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO treino
      (modalidade_id, data_treino, descricao,
       horario_inicio, horario_fim, local)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [modalidade_id, data_treino, descricao, horario_inicio, horario_fim, local]
  );
  return rows[0];
}

async function update(id, fields) {
  const setClauses = [];
  const values     = [];
  let idx = 1;

  for (const [key, val] of Object.entries(fields)) {
    setClauses.push(`${key} = $${idx}`);
    values.push(val);
    idx++;
  }
  setClauses.push(`updated_at = now()`);
  const sql = `
    UPDATE treino
       SET ${setClauses.join(', ')}
     WHERE id = $${idx}
     RETURNING *`;
  values.push(id);

  const { rows } = await pool.query(sql, values);
  return rows[0];
}

async function remove(id) {
  await pool.query(
    `DELETE FROM treino WHERE id = $1`,
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