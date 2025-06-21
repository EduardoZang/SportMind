const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query(
    'SELECT * FROM instituicao ORDER BY nome'
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM instituicao WHERE id = $1',
    [id]
  );
  return rows[0];
}

async function create(data) {
  const {
    nome,
    endereco,
    telefone = null,
    email = null,
    logotipo = null,
    cnpj = null
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO instituicao
      (nome, cnpj, endereco, telefone, email, logotipo)
     VALUES
      ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [nome, cnpj, endereco, telefone, email, logotipo]
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

  const sql = `
    UPDATE instituicao
       SET ${setClauses.join(', ')},
           updated_at = now()
     WHERE id = $${idx}
     RETURNING *
  `;
  values.push(id);

  const { rows } = await pool.query(sql, values);
  return rows[0];
}

async function remove(id) {
  await pool.query(
    'DELETE FROM instituicao WHERE id = $1',
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