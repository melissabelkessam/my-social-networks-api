const { body, validationResult } = require('express-validator');

exports.createEventValidator = [
    body('name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 255 }).withMessage('Le nom ne peut pas dépasser 255 caractères'),
    body('description')
        .optional(),
    body('start_date')
        .notEmpty().withMessage('La date de début est obligatoire')
        .isISO8601().withMessage('La date de début doit être au format ISO8601'),
    body('end_date')
        .notEmpty().withMessage('La date de fin est obligatoire')
        .isISO8601().withMessage('La date de fin doit être au format ISO8601')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.start_date)) {
                throw new Error('La date de fin doit être après la date de début');
            }
            return true;
        }),
    body('location')
        .optional()
        .isLength({ max: 255 }).withMessage('Le lieu ne peut pas dépasser 255 caractères'),
    body('is_private')
        .optional()
        .isBoolean().withMessage('is_private doit être un booléen'),
    body('group_id')
        .optional()
        .isInt().withMessage('group_id doit être un nombre entier')
];

exports.updateEventValidator = [
    body('name')
        .optional()
        .isLength({ max: 255 }).withMessage('Le nom ne peut pas dépasser 255 caractères'),
    body('start_date')
        .optional()
        .isISO8601().withMessage('La date de début doit être au format ISO8601'),
    body('end_date')
        .optional()
        .isISO8601().withMessage('La date de fin doit être au format ISO8601'),
    body('is_private')
        .optional()
        .isBoolean().withMessage('is_private doit être un booléen')
];

exports.addParticipantValidator = [
    body('user_id')
        .notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire')
        .isInt().withMessage('L\'ID doit être un nombre entier')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};