const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const model  = require('../models/usuarioModel');
const pool = require('../config/db');

const JWT_SECRET  = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

async function register(req, res, next) {
  try {
    const { instituicao_id, nome, usuario, email, senha } = req.body;

    if (await model.findByUsername(usuario)) {
      return res.status(409).json({ error: 'Nome de usuário já existe' });
    }
    if (await model.findByEmail(email)) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    const novo = await model.create({ instituicao_id, nome, usuario, email, senhaHash });

    await pool.query(
      'INSERT INTO usuario_role(usuario_id, role) VALUES($1, $2)',
      [novo.id, 'Atleta']
    );

    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { usuario, senha } = req.body;
    const user = await model.findByUsername(usuario);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const roles = await model.findRoles(user.id);

    const payload = {
      userId:        user.id,
      instituicaoId: user.instituicao_id,
      roles          
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };