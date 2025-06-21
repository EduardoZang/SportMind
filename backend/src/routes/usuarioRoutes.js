const express = require('express');
const ctrl    = require('../controllers/usuarioController');
const router  = express.Router();
const validateCpf = require('../middleware/validateCpfMiddleware');

router.post('/', validateCpf, ctrl.createOne);

router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getOne);
router.put('/:id',  ctrl.updateOne);
router.delete('/:id', ctrl.deleteOne);

module.exports = router;