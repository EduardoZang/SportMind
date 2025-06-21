const pool = require('../config/db');

async function findAll(instituicaoId) {
  const { rows } = await pool.query(
    `SELECT * FROM calendario
     WHERE instituicao_id = $1
     ORDER BY ano`,
    [instituicaoId]
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM calendario WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function create(data) {
  const { instituicao_id, ano } = data;
  const { rows } = await pool.query(
    `INSERT INTO calendario (instituicao_id, ano)
     VALUES ($1,$2)
     RETURNING *`,
    [instituicao_id, ano]
  );
  return rows[0];
}

async function update(id, ano) {
  const { rows } = await pool.query(
    `UPDATE calendario
        SET ano = $1,
            updated_at = now()
      WHERE id = $2
      RETURNING *`,
    [ano, id]
  );
  return rows[0];
}

async function remove(id) {
  await pool.query(
    `DELETE FROM calendario WHERE id = $1`,
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