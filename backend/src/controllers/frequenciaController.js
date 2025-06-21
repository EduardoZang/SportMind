const model = require('../models/frequenciaModel');
const pool  = require('../config/db');

async function getAll(req, res, next) {
  try {
    const lista = await model.findAll(req.instituicaoId);
    res.json(lista);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const freq = await model.findById(req.params.id);
    if (!freq) return res.status(404).json({ error: 'Frequência não encontrada' });
    res.json(freq);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const { treino_id, atleta_id } = req.body;

    const treino = await pool.query(
      `SELECT 1 FROM treino WHERE id = $1`,
      [treino_id]
    );
    if (treino.rowCount === 0) {
      return res.status(400).json({ error: 'Treino não encontrado' });
    }

    const nova = await model.create({ treino_id, atleta_id });
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const { status } = req.body;
    const updated = await model.update(req.params.id, status);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteOne(req, res, next) {
  try {
    await model.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
};