const dbPool      = require('../config/db');
const model       = require('../models/treinoModel');
const { sendEmail } = require('../services/notificationService');

async function notifyTraining(treino) {
  const { rows: athletes } = await dbPool.query(
    `SELECT DISTINCT u.email
       FROM usuario u
  INNER JOIN modalidade_atleta ma
          ON ma.atleta_id = u.id
      WHERE ma.modalidade_id = $1`,
    [treino.modalidade_id]
  );
  const emails = athletes
    .map(r => r.email)
    .filter(Boolean);
  if (!emails.length) return;

  const subject = `Novo treino em ${treino.data_treino}`;
  const text    = `${treino.descricao}\nHorário: ${treino.horario_inicio}–${treino.horario_fim}`;
  await sendEmail({
    to: emails.join(','),
    subject,
    text
  });
}

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
    const treino = await model.findById(req.params.id);
    if (!treino) return res.status(404).json({ error: 'Treino não encontrado' });
    res.json(treino);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const data = {
      modalidade_id:  req.body.modalidade_id,
      data_treino:    req.body.data_treino,
      descricao:      req.body.descricao,
      horario_inicio: req.body.horario_inicio,
      horario_fim:    req.body.horario_fim,
      local:          req.body.local
    };
    const novo = await model.create(data);

    await notifyTraining(novo);

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