const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');

// Routes pour les types de billets
router.post('/types', ticketsController.createTicketType);
router.get('/event/:eventId/types', ticketsController.getTicketTypesByEvent);
router.put('/types/:id', ticketsController.updateTicketType);
router.delete('/types/:id', ticketsController.deleteTicketType);

// Routes pour l'achat de billets
router.post('/purchase', ticketsController.purchaseTicket);
router.get('/event/:eventId/purchases', ticketsController.getPurchasesByEvent);

module.exports = router;