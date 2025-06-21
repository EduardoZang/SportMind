const bcrypt = require('bcrypt');
const model  = require('../models/usuarioModel');
const SALT_ROUNDS = 10;

async function getAll(req, res, next) {
  try {
    const list = await model.findAll();
    res.json(list);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const user = await model.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const { senha, ...rest } = req.body;
    if (!senha) return res.status(400).json({ error: 'Senha é obrigatória' });
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    const novo = await model.create({ ...rest, senhaHash });
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  try {
    const fields = { ...req.body };

    if (fields.senha) {
      fields.senha = await bcrypt.hash(fields.senha, SALT_ROUNDS);
    }
    const updated = await model.update(req.params.id, fields);
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