require('dotenv').config();
const express           = require('express');
const cors              = require('cors');

const authRoutes        = require('./routes/authRoutes');
const instRoutes        = require('./routes/instituicaoRoutes');
const userRoutes        = require('./routes/usuarioRoutes');
const modRoutes         = require('./routes/modalidadeRoutes');
const calRoutes         = require('./routes/calendarioRoutes');
const treinoRoutes      = require('./routes/treinoRoutes');
const noticiaRoutes     = require('./routes/noticiaRoutes');
const freqRoutes        = require('./routes/frequenciaRoutes');
const boletimRoutes     = require('./routes/boletimRoutes');

const authMW            = require('./middleware/authMiddleware');
const { requireRole }   = require('./middleware/roleMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'OK' }));

app.use('/auth', authRoutes);

app.use(
  '/instituicoes',
  authMW,
  requireRole(['Diretor']),
  instRoutes
);
app.use(
  '/usuarios',
  authMW,
  requireRole(['Diretor']),
  userRoutes
);
app.use(
  '/modalidades',
  authMW,
  requireRole(['Professor', 'Diretor']),
  modRoutes
);
app.use(
  '/calendarios',
  authMW,
  requireRole(['Professor', 'Diretor']),
  calRoutes
);
app.use(
  '/treinos',
  authMW,
  requireRole(['Professor', 'Diretor']),
  treinoRoutes
);
app.use(
  '/noticias',
  authMW,
  requireRole(['Professor', 'Diretor']),
  noticiaRoutes
);
app.use(
  '/frequencias',
  authMW,
  requireRole(['Professor', 'Diretor']),
  freqRoutes
);
app.use(
  '/boletim',
  authMW,
  requireRole(['Professor', 'Diretor']),
  boletimRoutes
);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro inesperado',
    details: err.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`[backend] rodando na porta ${PORT}`)
);