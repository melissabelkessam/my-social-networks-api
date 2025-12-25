const { body, validationResult } = require('express-validator');

exports.createThreadValidator = [
    body('group_id')
        .optional()
        .isInt().withMessage('group_id doit être un nombre entier'),
    body('event_id')
        .optional()
        .isInt().withMessage('event_id doit être un nombre entier')
        .custom((value, { req }) => {
            if ((req.body.group_id && value) || (!req.body.group_id && !value)) {
                throw new Error('Vous devez fournir soit group_id soit event_id, mais pas les deux');
            }
            return true;
        })
];

exports.addMessageValidator = [
    body('user_id')
        .notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire')
        .isInt().withMessage('user_id doit être un nombre entier'),
    body('content')
        .notEmpty().withMessage('Le contenu est obligatoire'),
    body('parent_message_id')
        .optional()
        .isInt().withMessage('parent_message_id doit être un nombre entier')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};