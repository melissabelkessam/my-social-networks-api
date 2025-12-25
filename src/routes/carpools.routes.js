const express = require('express');
const router = express.Router();
const carpoolsController = require('../controllers/carpools.controller');

router.post('/', carpoolsController.createCarpool);
router.get('/event/:eventId', carpoolsController.getCarpoolsByEvent);
router.put('/:id', carpoolsController.updateCarpool);
router.delete('/:id', carpoolsController.deleteCarpool);

module.exports = router;