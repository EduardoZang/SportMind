const model = require('../models/boletimModel');

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
    const item = await model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const data = {
      atleta_id: req.body.atleta_id,
      modalidade_id: req.body.modalidade_id,
      data_competicao: req.body.data_competicao,
      evento: req.body.evento,
      classificacao: req.body.classificacao,
      medalha: req.body.medalha
    };
    const novo = await model.create(data);
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const atualizado = await model.update(req.params.id, req.body);
    res.json(atualizado);
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