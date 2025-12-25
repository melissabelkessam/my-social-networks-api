const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');

// Routes pour les événements
router.post('/', eventsController.createEvent);
router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEventById);
router.put('/:id', eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);

// Routes pour les organisateurs
router.post('/:id/organizers', eventsController.addOrganizer);
router.delete('/:id/organizers/:userId', eventsController.removeOrganizer);
router.get('/:id/organizers', eventsController.getEventOrganizers);

// Routes pour les participants
router.post('/:id/participants', eventsController.addParticipant);
router.delete('/:id/participants/:userId', eventsController.removeParticipant);
router.get('/:id/participants', eventsController.getEventParticipants);

module.exports = router;