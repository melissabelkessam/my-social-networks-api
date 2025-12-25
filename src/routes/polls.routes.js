const express = require('express');
const router = express.Router();
const pollsController = require('../controllers/polls.controller');
const { createPollValidator, addQuestionValidator, addOptionValidator, submitResponseValidator, validate } = require('../validators/polls.validator');

// Routes pour les sondages
router.post('/', createPollValidator, validate, pollsController.createPoll);
router.get('/event/:eventId', pollsController.getPollsByEvent);
router.delete('/:id', pollsController.deletePoll);

// Routes pour les questions
router.post('/:pollId/questions', addQuestionValidator, validate, pollsController.addQuestion);
router.get('/:pollId/questions', pollsController.getQuestions);

// Routes pour les options
router.post('/questions/:questionId/options', addOptionValidator, validate, pollsController.addOption);

// Routes pour les réponses
router.post('/questions/:questionId/responses', submitResponseValidator, validate, pollsController.submitResponse);
router.get('/:pollId/results', pollsController.getPollResults);

module.exports = router;