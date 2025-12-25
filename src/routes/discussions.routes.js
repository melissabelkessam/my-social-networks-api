const express = require('express');
const router = express.Router();
const discussionsController = require('../controllers/discussions.controller');

// Routes pour les fils de discussion
router.post('/', discussionsController.createThread);
router.get('/group/:groupId', discussionsController.getThreadByGroup);
router.get('/event/:eventId', discussionsController.getThreadByEvent);
router.delete('/:id', discussionsController.deleteThread);

// Routes pour les messages
router.post('/:threadId/messages', discussionsController.addMessage);
router.get('/:threadId/messages', discussionsController.getMessages);
router.delete('/messages/:messageId', discussionsController.deleteMessage);

module.exports = router;