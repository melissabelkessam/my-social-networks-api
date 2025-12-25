const { body, validationResult } = require('express-validator');

exports.createCarpoolValidator = [
    body('event_id')
        .notEmpty().withMessage('L\'ID de l\'événement est obligatoire')
        .isInt().withMessage('event_id doit être un nombre entier'),
    body('driver_id')
        .notEmpty().withMessage('L\'ID du conducteur est obligatoire')
        .isInt().withMessage('driver_id doit être un nombre entier'),
    body('departure_location')
        .notEmpty().withMessage('Le lieu de départ est obligatoire')
        .isLength({ max: 255 }).withMessage('Le lieu ne peut pas dépasser 255 caractères'),
    body('departure_time')
        .notEmpty().withMessage('L\'heure de départ est obligatoire')
        .isISO8601().withMessage('departure_time doit être au format ISO8601'),
    body('price')
        .notEmpty().withMessage('Le prix est obligatoire')
        .isDecimal().withMessage('Le prix doit être un nombre décimal'),
    body('available_seats')
        .notEmpty().withMessage('Le nombre de places est obligatoire')
        .isInt({ min: 1 }).withMessage('Le nombre de places doit être un nombre entier positif'),
    body('max_time_difference')
        .notEmpty().withMessage('Le temps maximum d\'écart est obligatoire')
        .isInt({ min: 0 }).withMessage('Le temps doit être un nombre entier positif')
];

exports.updateCarpoolValidator = [
    body('departure_location')
        .optional()
        .isLength({ max: 255 }).withMessage('Le lieu ne peut pas dépasser 255 caractères'),
    body('departure_time')
        .optional()
        .isISO8601().withMessage('departure_time doit être au format ISO8601'),
    body('price')
        .optional()
        .isDecimal().withMessage('Le prix doit être un nombre décimal'),
    body('available_seats')
        .optional()
        .isInt({ min: 1 }).withMessage('Le nombre de places doit être un nombre entier positif'),
    body('max_time_difference')
        .optional()
        .isInt({ min: 0 }).withMessage('Le temps doit être un nombre entier positif')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};