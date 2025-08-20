const express = require('express');
const router = express.Router();
const tutelaController = require('../controllers/tutela.controller');
const auth = require('../middlewares/auth.middleware');
const permit = require('../middlewares/roles.middleware');
const validate = require('../middlewares/validate.middleware');
const { createTutelaSchema } = require('../validations/tutela.validation');

router.get('/', auth, permit('admin','notificador','consultor'), tutelaController.getTutelas);
router.post('/', auth, permit('admin','notificador','consultor'), validate(createTutelaSchema), tutelaController.createTutela);
router.get('/:id', auth, permit('admin','notificador','consultor'), tutelaController.getTutelaById);
router.put('/:id', auth, permit('admin','notificador'), tutelaController.updateTutela);
router.delete('/:id', auth, permit('admin'), tutelaController.deleteTutela);

module.exports = router;