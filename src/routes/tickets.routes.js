const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');
const { createTicketTypeValidator, purchaseTicketValidator, validate } = require('../validators/tickets.validator');

// Routes pour les types de billets
router.post('/types', createTicketTypeValidator, validate, ticketsController.createTicketType);
router.get('/event/:eventId/types', ticketsController.getTicketTypesByEvent);
router.put('/types/:id', createTicketTypeValidator, validate, ticketsController.updateTicketType);
router.delete('/types/:id', ticketsController.deleteTicketType);

// Routes pour l'achat de billets
router.post('/purchase', purchaseTicketValidator, validate, ticketsController.purchaseTicket);
router.get('/event/:eventId/purchases', ticketsController.getPurchasesByEvent);

module.exports = router;