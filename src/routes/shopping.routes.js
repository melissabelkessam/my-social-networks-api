const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping.controller');
const { addItemValidator, updateItemValidator, validate } = require('../validators/shopping.validator');

router.post('/', addItemValidator, validate, shoppingController.addItem);
router.get('/event/:eventId', shoppingController.getItemsByEvent);
router.put('/:id', updateItemValidator, validate, shoppingController.updateItem);
router.delete('/:id', shoppingController.deleteItem);

module.exports = router;