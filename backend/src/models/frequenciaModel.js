const pool = require('../config/db');

async function findAll(instituicaoId) {
  const { rows } = await pool.query(
    `SELECT f.*
       FROM frequencia f
  JOIN treino t     ON f.treino_id = t.id
  JOIN modalidade m ON t.modalidade_id = m.id
      WHERE m.instituicao_id = $1
      ORDER BY t.data_treino, f.atleta_id`,
    [instituicaoId]
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM frequencia WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function create(data) {
  const { treino_id, atleta_id, status = 'Presente' } = data;
  const { rows } = await pool.query(
    `INSERT INTO frequencia
       (treino_id, atleta_id, status)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [treino_id, atleta_id, status]
  );
  return rows[0];
}

async function update(id, status) {
  const { rows } = await pool.query(
    `UPDATE frequencia
        SET status = $1,
            updated_at = now()
      WHERE id = $2
      RETURNING *`,
    [status, id]
  );
  return rows[0];
}

async function remove(id) {
  await pool.query(
    `DELETE FROM frequencia WHERE id = $1`,
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