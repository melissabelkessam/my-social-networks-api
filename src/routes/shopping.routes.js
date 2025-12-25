const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping.controller');

router.post('/', shoppingController.addItem);
router.get('/event/:eventId', shoppingController.getItemsByEvent);
router.put('/:id', shoppingController.updateItem);
router.delete('/:id', shoppingController.deleteItem);

module.exports = router;