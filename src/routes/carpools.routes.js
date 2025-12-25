const express = require('express');
const router = express.Router();
const carpoolsController = require('../controllers/carpools.controller');
const { createCarpoolValidator, updateCarpoolValidator, validate } = require('../validators/carpools.validator');

router.post('/', createCarpoolValidator, validate, carpoolsController.createCarpool);
router.get('/event/:eventId', carpoolsController.getCarpoolsByEvent);
router.put('/:id', updateCarpoolValidator, validate, carpoolsController.updateCarpool);
router.delete('/:id', carpoolsController.deleteCarpool);

module.exports = router;