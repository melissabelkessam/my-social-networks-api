const { body, validationResult } = require('express-validator');

exports.createGroupValidator = [
    body('name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 255 }).withMessage('Le nom ne peut pas dépasser 255 caractères'),
    body('description')
        .optional(),
    body('type')
        .notEmpty().withMessage('Le type est obligatoire')
        .isIn(['public', 'private', 'secret']).withMessage('Le type doit être public, private ou secret'),
    body('allow_members_post')
        .optional()
        .isBoolean().withMessage('allow_members_post doit être un booléen'),
    body('allow_members_create_events')
        .optional()
        .isBoolean().withMessage('allow_members_create_events doit être un booléen')
];

exports.updateGroupValidator = [
    body('name')
        .optional()
        .isLength({ max: 255 }).withMessage('Le nom ne peut pas dépasser 255 caractères'),
    body('type')
        .optional()
        .isIn(['public', 'private', 'secret']).withMessage('Le type doit être public, private ou secret'),
    body('allow_members_post')
        .optional()
        .isBoolean().withMessage('allow_members_post doit être un booléen'),
    body('allow_members_create_events')
        .optional()
        .isBoolean().withMessage('allow_members_create_events doit être un booléen')
];

exports.addMemberValidator = [
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