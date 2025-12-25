const { body, validationResult } = require('express-validator');

exports.createPollValidator = [
    body('event_id')
        .notEmpty().withMessage('L\'ID de l\'événement est obligatoire')
        .isInt().withMessage('event_id doit être un nombre entier'),
    body('organizer_id')
        .notEmpty().withMessage('L\'ID de l\'organisateur est obligatoire')
        .isInt().withMessage('organizer_id doit être un nombre entier'),
    body('title')
        .notEmpty().withMessage('Le titre est obligatoire')
        .isLength({ max: 255 }).withMessage('Le titre ne peut pas dépasser 255 caractères')
];

exports.addQuestionValidator = [
    body('question_text')
        .notEmpty().withMessage('Le texte de la question est obligatoire')
];

exports.addOptionValidator = [
    body('option_text')
        .notEmpty().withMessage('Le texte de l\'option est obligatoire')
        .isLength({ max: 255 }).withMessage('L\'option ne peut pas dépasser 255 caractères')
];

exports.submitResponseValidator = [
    body('user_id')
        .notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire')
        .isInt().withMessage('user_id doit être un nombre entier'),
    body('option_id')
        .notEmpty().withMessage('L\'ID de l\'option est obligatoire')
        .isInt().withMessage('option_id doit être un nombre entier')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};