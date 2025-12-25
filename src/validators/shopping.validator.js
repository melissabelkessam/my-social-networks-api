const { body, validationResult } = require('express-validator');

exports.addItemValidator = [
    body('event_id')
        .notEmpty().withMessage('L\'ID de l\'événement est obligatoire')
        .isInt().withMessage('event_id doit être un nombre entier'),
    body('user_id')
        .notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire')
        .isInt().withMessage('user_id doit être un nombre entier'),
    body('item_name')
        .notEmpty().withMessage('Le nom de l\'item est obligatoire')
        .isLength({ max: 191 }).withMessage('Le nom ne peut pas dépasser 191 caractères'),
    body('quantity')
        .notEmpty().withMessage('La quantité est obligatoire')
        .isInt({ min: 1 }).withMessage('La quantité doit être un nombre entier positif'),
    body('arrival_time')
        .notEmpty().withMessage('L\'heure d\'arrivée est obligatoire')
];

exports.updateItemValidator = [
    body('quantity')
        .optional()
        .isInt({ min: 1 }).withMessage('La quantité doit être un nombre entier positif'),
    body('arrival_time')
        .optional()
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};