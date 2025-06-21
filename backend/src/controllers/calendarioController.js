const model = require('../models/calendarioModel');

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
    const cal = await model.findById(req.params.id);
    if (!cal) return res.status(404).json({ error: 'Calendário não encontrado' });
    res.json(cal);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const data = {
      instituicao_id: req.instituicaoId,
      ano:            req.body.ano
    };
    const nova = await model.create(data);
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const anoAtualizado = req.body.ano;
    const updated = await model.update(req.params.id, anoAtualizado);
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