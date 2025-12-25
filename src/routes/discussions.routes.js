const express = require('express');
const router = express.Router();
const discussionsController = require('../controllers/discussions.controller');
const { createThreadValidator, addMessageValidator, validate } = require('../validators/discussions.validator');

// Routes pour les fils de discussion
router.post('/', createThreadValidator, validate, discussionsController.createThread);
router.get('/group/:groupId', discussionsController.getThreadByGroup);
router.get('/event/:eventId', discussionsController.getThreadByEvent);
router.delete('/:id', discussionsController.deleteThread);

// Routes pour les messages
router.post('/:threadId/messages', addMessageValidator, validate, discussionsController.addMessage);
router.get('/:threadId/messages', discussionsController.getMessages);
router.delete('/messages/:messageId', discussionsController.deleteMessage);

module.exports = router;