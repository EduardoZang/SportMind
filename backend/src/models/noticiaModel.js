const pool = require('../config/db');

async function findAll(instituicaoId) {
  const { rows } = await pool.query(
    `SELECT n.*, 
            json_agg(m.*) AS modalidades
       FROM noticia n
  LEFT JOIN noticia_modalidade nm ON nm.noticia_id = n.id
  LEFT JOIN modalidade m ON m.id = nm.modalidade_id
      WHERE n.id IN (
        SELECT n2.id
          FROM noticia n2
     LEFT JOIN noticia_modalidade nm2 ON nm2.noticia_id = n2.id
     LEFT JOIN modalidade m2 ON m2.id = nm2.modalidade_id
         WHERE m2.instituicao_id = $1
        )
   GROUP BY n.id
   ORDER BY n.data DESC`,
    [instituicaoId]
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT n.*,
            json_agg(m.*) AS modalidades
       FROM noticia n
  LEFT JOIN noticia_modalidade nm ON nm.noticia_id = n.id
  LEFT JOIN modalidade m ON m.id = nm.modalidade_id
      WHERE n.id = $1
   GROUP BY n.id`,
    [id]
  );
  return rows[0];
}

async function create(data) {
  const { titulo, conteudo, anexos = [], modalidades = [] } = data;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      `INSERT INTO noticia (titulo, conteudo, anexos)
       VALUES ($1,$2,$3) RETURNING *`,
      [titulo, conteudo, JSON.stringify(anexos)]
    );
    const noticia = rows[0];

    for (const modId of modalidades) {
      await client.query(
        `INSERT INTO noticia_modalidade (noticia_id, modalidade_id)
         VALUES ($1,$2)`,
        [noticia.id, modId]
      );
    }

    await client.query('COMMIT');
    return noticia;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function update(id, data) {
  const { titulo, conteudo, anexos, modalidades } = data;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const fields = [];
    const vals   = [];
    let idx = 1;
    if (titulo !== undefined)   { fields.push(`titulo = $${idx}`);    vals.push(titulo);    idx++; }
    if (conteudo !== undefined) { fields.push(`conteudo = $${idx}`);  vals.push(conteudo);  idx++; }
    if (anexos !== undefined)   { fields.push(`anexos = $${idx}`);    vals.push(JSON.stringify(anexos)); idx++; }
    if (fields.length) {
      const sql = `
        UPDATE noticia
           SET ${fields.join(', ')}, updated_at = now()
         WHERE id = $${idx}
         RETURNING *`;
      vals.push(id);
      const res = await client.query(sql, vals);
      var noticia = res.rows[0];
    }

    if (modalidades) {
      await client.query(
        `DELETE FROM noticia_modalidade WHERE noticia_id = $1`,
        [id]
      );

      for (const modId of modalidades) {
        await client.query(
          `INSERT INTO noticia_modalidade (noticia_id, modalidade_id)
           VALUES ($1,$2)`,
          [id, modId]
        );
      }
    }

    await client.query('COMMIT');
    return noticia;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function remove(id) {
  await pool.query(
    `DELETE FROM noticia WHERE id = $1`,
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