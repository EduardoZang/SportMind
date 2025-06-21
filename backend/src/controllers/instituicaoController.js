const model = require('../models/instituicaoModel');

async function getAll(req, res, next) {
  try {
    const lista = await model.findAll();
    res.json(lista);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const inst = await model.findById(req.params.id);
    if (!inst) {
      return res.status(404).json({ error: 'Instituição não encontrada' });
    }
    res.json(inst);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const nova = await model.create(req.body);
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const atualizada = await model.update(req.params.id, req.body);
    res.json(atualizada);
  } catch (err) {
    next(err);
  }
}

async function deleteOne(req, res, next) {
  try {
    await model.remove(req.params.id);
    res.status(204).send();
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