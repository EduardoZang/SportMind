const express = require('express');
const ctrl    = require('../controllers/modalidadeController');
const router  = express.Router();

router.get('/',    ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/',   ctrl.createOne);
router.put('/:id', ctrl.updateOne);
router.delete('/:id',ctrl.deleteOne);

module.exports = router;