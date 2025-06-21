const model = require('../models/modalidadeModel');

async function getAll(req, res, next) {
  try {
    const list = await model.findAll(req.instituicaoId);
    res.json(list);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const mod = await model.findById(req.params.id);
    if (!mod) {
      return res.status(404).json({ error: 'Modalidade não encontrada' });
    }
    res.json(mod);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const data = {
      instituicao_id: req.instituicaoId,
      nome:           req.body.nome,
      descricao:      req.body.descricao
    };
    const nova = await model.create(data);
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const payload = {
      nome:      req.body.nome,
      descricao: req.body.descricao
    };
    const updated = await model.update(req.params.id, payload);
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