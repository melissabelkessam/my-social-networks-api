const express = require('express');
const router = express.Router();
const pollsController = require('../controllers/polls.controller');

// Routes pour les sondages
router.post('/', pollsController.createPoll);
router.get('/event/:eventId', pollsController.getPollsByEvent);
router.delete('/:id', pollsController.deletePoll);

// Routes pour les questions
router.post('/:pollId/questions', pollsController.addQuestion);
router.get('/:pollId/questions', pollsController.getQuestions);

// Routes pour les options
router.post('/questions/:questionId/options', pollsController.addOption);

// Routes pour les réponses
router.post('/questions/:questionId/responses', pollsController.submitResponse);
router.get('/:pollId/results', pollsController.getPollResults);

module.exports = router;