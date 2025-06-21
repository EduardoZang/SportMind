const pool = require('../config/db');

async function findAll(instituicaoId) {
  const { rows } = await pool.query(
    `SELECT b.*
       FROM boletim b
  JOIN usuario u     ON b.atleta_id     = u.id
  JOIN modalidade m  ON b.modalidade_id = m.id
      WHERE u.instituicao_id = $1
        AND m.instituicao_id = $1
      ORDER BY b.data_competicao DESC`,
    [instituicaoId]
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM boletim WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function create(data) {
  const {
    atleta_id,
    modalidade_id,
    data_competicao,
    evento,
    classificacao = null,
    medalha       = null
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO boletim
      (atleta_id, modalidade_id, data_competicao,
       evento, classificacao, medalha)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [atleta_id, modalidade_id, data_competicao,
     evento, classificacao, medalha]
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
    UPDATE boletim
       SET ${setClauses.join(', ')}
     WHERE id = $${idx}
     RETURNING *`;
  values.push(id);

  const { rows } = await pool.query(sql, values);
  return rows[0];
}

async function remove(id) {
  await pool.query(
    `DELETE FROM boletim WHERE id = $1`,
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