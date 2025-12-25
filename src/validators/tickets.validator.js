const { body, validationResult } = require('express-validator');

exports.createTicketTypeValidator = [
    body('event_id')
        .notEmpty().withMessage('L\'ID de l\'événement est obligatoire')
        .isInt().withMessage('event_id doit être un nombre entier'),
    body('name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 255 }).withMessage('Le nom ne peut pas dépasser 255 caractères'),
    body('price')
        .notEmpty().withMessage('Le prix est obligatoire')
        .isDecimal().withMessage('Le prix doit être un nombre décimal'),
    body('quantity')
        .notEmpty().withMessage('La quantité est obligatoire')
        .isInt({ min: 1 }).withMessage('La quantité doit être un nombre entier positif')
];

exports.purchaseTicketValidator = [
    body('ticket_type_id')
        .notEmpty().withMessage('L\'ID du type de billet est obligatoire')
        .isInt().withMessage('ticket_type_id doit être un nombre entier'),
    body('first_name')
        .notEmpty().withMessage('Le prénom est obligatoire')
        .isLength({ max: 100 }).withMessage('Le prénom ne peut pas dépasser 100 caractères'),
    body('last_name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 100 }).withMessage('Le nom ne peut pas dépasser 100 caractères'),
    body('address')
        .notEmpty().withMessage('L\'adresse est obligatoire')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};