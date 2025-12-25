const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const { createEventValidator, updateEventValidator, addParticipantValidator, validate } = require('../validators/events.validator');

// Routes pour les événements
router.post('/', createEventValidator, validate, eventsController.createEvent);
router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEventById);
router.put('/:id', updateEventValidator, validate, eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);

// Routes pour les organisateurs
router.post('/:id/organizers', addParticipantValidator, validate, eventsController.addOrganizer);
router.delete('/:id/organizers/:userId', eventsController.removeOrganizer);
router.get('/:id/organizers', eventsController.getEventOrganizers);

// Routes pour les participants
router.post('/:id/participants', addParticipantValidator, validate, eventsController.addParticipant);
router.delete('/:id/participants/:userId', eventsController.removeParticipant);
router.get('/:id/participants', eventsController.getEventParticipants);

module.exports = router;