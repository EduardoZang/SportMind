const dbPool      = require('../config/db');
const model       = require('../models/noticiaModel');
const { sendEmail } = require('../services/notificationService');

async function notifyNews(noticia, modalidadeIds) {
  const { rows: athletes } = await dbPool.query(
    `SELECT DISTINCT u.email
       FROM usuario u
  INNER JOIN modalidade_atleta ma
          ON ma.atleta_id = u.id
      WHERE ma.modalidade_id = ANY($1)`,
    [modalidadeIds]
  );
  const emails = athletes
    .map(r => r.email)
    .filter(Boolean);
  if (!emails.length) return;

  const subject = `Nova notícia: ${noticia.titulo}`;
  const text    = `${noticia.conteudo}\n\nConfira no SportMind.`;
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
    const noticia = await model.findById(req.params.id);
    if (!noticia) return res.status(404).json({ error: 'Notícia não encontrada' });
    res.json(noticia);
  } catch (err) {
    next(err);
  }
}

async function createOne(req, res, next) {
  try {
    const data = {
      titulo:      req.body.titulo,
      conteudo:    req.body.conteudo,
      anexos:      req.body.anexos || [],
      modalidades: req.body.modalidades || []
    };
    const nova = await model.create(data);

    await notifyNews(nova, data.modalidades);

    res.status(201).json(nova);
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